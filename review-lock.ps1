# 审阅台加密工具（Windows PowerShell 5.1，无需 Node / Python）
#   设置或更换查看密码：powershell -ExecutionPolicy Bypass -File review-lock.ps1 -SetPassword 新密码
#   手动加密任务书：    powershell -ExecutionPolicy Bypass -File review-lock.ps1
# 线上只发布 lane-brief.enc；明文 lane-brief.md 与本地密钥 review.key.json 都不进仓库（见 .gitignore）。
# 算法与 review.html 中的 WebCrypto 对应：PBKDF2-SHA256 派生 64 字节 → 前 32 字节 AES-256-CBC，后 32 字节 HMAC-SHA256（先加密后校验）。
# 密码不区分大小写：统一去掉首尾空格并转成大写后再派生。
param([string]$SetPassword, [string]$Root)

if (-not $Root) { $Root = Split-Path -Parent $MyInvocation.MyCommand.Path }
$script:RL_ITER = 310000

function RL-Derive([string]$pw, [byte[]]$salt, [int]$iter) {
  $norm = $pw.Trim().ToUpperInvariant()
  $kdf = New-Object System.Security.Cryptography.Rfc2898DeriveBytes($norm, $salt, $iter, [System.Security.Cryptography.HashAlgorithmName]::SHA256)
  try { return $kdf.GetBytes(64) } finally { $kdf.Dispose() }
}
function RL-Hmac([byte[]]$key, [byte[]]$data) {
  $h = New-Object System.Security.Cryptography.HMACSHA256 -ArgumentList (, $key)
  try { return $h.ComputeHash($data) } finally { $h.Dispose() }
}
function RL-Hex([byte[]]$b) { -join ($b | ForEach-Object { $_.ToString('x2') }) }
function RL-WriteUtf8([string]$path, [string]$text) { [IO.File]::WriteAllText($path, $text, (New-Object Text.UTF8Encoding $false)) }

function Set-ReviewPassword([string]$pw, [string]$root) {
  if (-not $pw -or $pw.Trim().Length -lt 4) { throw '密码至少 4 个字符' }
  $salt = New-Object byte[] 16; [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($salt)
  $d = RL-Derive $pw $salt $script:RL_ITER
  $check = RL-Hex ([Security.Cryptography.SHA256]::Create().ComputeHash($d))
  $key = [ordered]@{ v = 1; iter = $script:RL_ITER; salt = [Convert]::ToBase64String($salt); key = [Convert]::ToBase64String($d); check = $check }
  RL-WriteUtf8 (Join-Path $root 'review.key.json') ($key | ConvertTo-Json)
  # 把校验值写进 review.html（只含盐和派生值的哈希，不含密码）
  $html = Join-Path $root 'review.html'
  $t = [IO.File]::ReadAllText($html, [Text.Encoding]::UTF8)
  $line = "const LOCK={salt:'$($key.salt)',iter:$($script:RL_ITER),check:'$check'};"
  $t2 = [regex]::Replace($t, "const LOCK=\{[^\n]*\};", [System.Text.RegularExpressions.MatchEvaluator] { param($m) $line })
  if ($t2 -eq $t -and -not $t.Contains($line)) { throw 'review.html 中没有找到 const LOCK={...}; 这一行' }
  RL-WriteUtf8 $html $t2
  Write-Host '已更新查看密码：review.key.json（本地，不提交）与 review.html 的校验值。' -ForegroundColor Green
  Protect-Brief $root -Force | Out-Null
}

# 返回 $true 表示重新生成了 lane-brief.enc
function Protect-Brief([string]$root, [switch]$Force) {
  $src = Join-Path $root 'lane-brief.md'; $out = Join-Path $root 'lane-brief.enc'; $kf = Join-Path $root 'review.key.json'
  if (-not (Test-Path -LiteralPath $src) -or -not (Test-Path -LiteralPath $kf)) { return $false }
  $k = Get-Content -LiteralPath $kf -Raw -Encoding UTF8 | ConvertFrom-Json
  $d = [Convert]::FromBase64String($k.key)
  $encKey = $d[0..31]; $macKey = $d[32..63]
  $pt = [IO.File]::ReadAllBytes($src)
  $ph = RL-Hex (RL-Hmac $macKey $pt)       # 明文指纹（带密钥，不泄露内容）：内容没变就不重新加密
  if (-not $Force -and (Test-Path -LiteralPath $out)) {
    try { $old = Get-Content -LiteralPath $out -Raw -Encoding UTF8 | ConvertFrom-Json; if ($old.ph -eq $ph -and $old.salt -eq $k.salt) { return $false } } catch {}
  }
  $aes = [Security.Cryptography.Aes]::Create()
  try {
    $aes.KeySize = 256; $aes.Mode = 'CBC'; $aes.Padding = 'PKCS7'; $aes.Key = [byte[]]$encKey; $aes.GenerateIV(); $iv = $aes.IV
    $ct = $aes.CreateEncryptor().TransformFinalBlock($pt, 0, $pt.Length)
  } finally { $aes.Dispose() }
  $tag = RL-Hmac $macKey ([byte[]]($iv + $ct))
  $mt = (Get-Item -LiteralPath $src).LastWriteTimeUtc
  $o = [ordered]@{ v = 1; alg = 'PBKDF2-SHA256/AES-256-CBC/HMAC-SHA256'; iter = [int]$k.iter; salt = $k.salt
    iv = [Convert]::ToBase64String($iv); mac = [Convert]::ToBase64String($tag); ph = $ph
    mtime = [long]($mt - [datetime]'1970-01-01').TotalMilliseconds; ct = [Convert]::ToBase64String($ct) }
  RL-WriteUtf8 $out ($o | ConvertTo-Json -Compress)
  return $true
}

if ($MyInvocation.InvocationName -ne '.') {
  if ($SetPassword) { Set-ReviewPassword $SetPassword $Root }
  elseif (Protect-Brief $Root) { Write-Host '已加密 lane-brief.md → lane-brief.enc' -ForegroundColor Green }
  else { Write-Host 'lane-brief.enc 已是最新（或缺少 lane-brief.md / review.key.json）。' }
}
