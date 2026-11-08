# 怪物夜未眠 自动同步（PowerShell 版，无需 Node.js）
# 每秒检查网页文件改动 → 停止改动 5 秒后自动 git 提交并推送 → GitHub Pages 自动重新发布
# 说明：Windows PowerShell 5.1 下 FileSystemWatcher.WaitForChanged 会漏掉编辑器的保存事件，
#       因此改用 git status + 文件时间戳轮询，稳定可靠，也能识别新增 / 删除 / 重命名。
$ErrorActionPreference = 'Continue'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$ROOT = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ROOT

# 只同步需要发布的文件，临时文件 / 原画素材（creatures）不会被自动提交
$TARGETS = @(
  'index.html',
  '怪物夜未眠.html',
  'review.html',
  'lane-brief.enc',
  'reference-figures.mp4',
  'README.md',
  'assets',
  'docs'
)
$BRANCH = 'main'
$DEBOUNCE_SEC = 5
$PUSH_RETRY_SEC = 30

function Stamp { Get-Date -Format 'HH:mm:ss' }

function Invoke-Git {
  # 注意：调用时 git 的 "--" 必须写成 '--'（带引号），否则会被 PowerShell 吞掉
  $out = & git -c core.quotepath=false @args 2>&1 | ForEach-Object {
    if ($_ -is [System.Management.Automation.ErrorRecord]) { $_.Exception.Message } else { "$_" }
  }
  $ok = ($LASTEXITCODE -eq 0)
  $lines = $out | Where-Object { $_ -and $_ -ne 'System.Management.Automation.RemoteException' }
  [pscustomobject]@{ Ok = $ok; Text = ($lines -join "`n") }
}

function Get-ExistingTargets { @($TARGETS | Where-Object { Test-Path -LiteralPath (Join-Path $ROOT $_) }) }

function Get-Pending {
  $t = @(Get-ExistingTargets)
  if (-not $t) { return '' }
  (Invoke-Git status --porcelain --untracked-files=all '--' @t).Text
}

# 状态 + 文件时间戳，用于判断"是否仍在连续修改"
function Get-Signature($pending) {
  $stamps = foreach ($t in (Get-ExistingTargets)) {
    Get-ChildItem -LiteralPath (Join-Path $ROOT $t) -Recurse -File -Force -ErrorAction SilentlyContinue |
      ForEach-Object { '{0}|{1}|{2}' -f $_.FullName, $_.LastWriteTimeUtc.Ticks, $_.Length }
  }
  $pending + "`n" + ($stamps -join "`n")
}

function Get-AheadCount {
  $r = Invoke-Git rev-list --count "origin/$BRANCH..HEAD"
  if ($r.Ok) { [int]$r.Text } else { 0 }
}

function Push-Changes {
  $r = Invoke-Git push origin $BRANCH
  if (-not $r.Ok) {
    # 远端若有新提交，先 rebase 再推一次
    $pull = Invoke-Git pull --rebase --autostash origin $BRANCH
    if (-not $pull.Ok) {
      Invoke-Git rebase --abort | Out-Null
      Write-Host ("[{0}] 拉取远端失败：`n{1}" -f (Stamp), $pull.Text) -ForegroundColor Red
      return $false
    }
    $r = Invoke-Git push origin $BRANCH
  }
  if ($r.Ok) {
    Write-Host ("[{0}] 已发布到 GitHub Pages（网页端 / 手机端约 1 分钟后生效，手机请下拉刷新）" -f (Stamp)) -ForegroundColor Green
    return $true
  }
  Write-Host ("[{0}] 推送失败（已在本地提交，{1} 秒后自动重试）：`n{2}" -f (Stamp), $PUSH_RETRY_SEC, $r.Text) -ForegroundColor Red
  return $false
}

# 审阅台：lane-brief.md 一改动就重新加密成 lane-brief.enc（明文不提交；需要本地 review.key.json，见 review-lock.ps1）
$LOCK_SCRIPT = Join-Path $ROOT 'review-lock.ps1'
if (Test-Path -LiteralPath $LOCK_SCRIPT) { . $LOCK_SCRIPT -Root $ROOT }
$script:BriefStamp = $null
function Update-Brief {
  if (-not (Get-Command Protect-Brief -ErrorAction SilentlyContinue)) { return }
  $src = Join-Path $ROOT 'lane-brief.md'
  if (-not (Test-Path -LiteralPath $src)) { return }
  $stamp = (Get-Item -LiteralPath $src).LastWriteTimeUtc.Ticks
  if ($stamp -eq $script:BriefStamp) { return }
  $script:BriefStamp = $stamp
  try {
    if (Protect-Brief $ROOT) { Write-Host ("[{0}] 已重新加密任务书 → lane-brief.enc" -f (Stamp)) }
  } catch {
    Write-Host ("[{0}] 任务书加密失败：{1}" -f (Stamp), $_.Exception.Message) -ForegroundColor Red
  }
}

function Sync {
  try {
    $t = @(Get-ExistingTargets)
    Invoke-Git add -A '--' @t | Out-Null
    $staged = Invoke-Git diff --cached --name-only '--' @t
    if ($staged.Text) {
      $msg = 'auto: 自动同步 ' + (Get-Date -Format 'yyyy/M/d HH:mm:ss')
      $c = Invoke-Git commit -m $msg
      if (-not $c.Ok) {
        Write-Host ("[{0}] 提交失败：`n{1}" -f (Stamp), $c.Text) -ForegroundColor Red
        return
      }
      Write-Host ("[{0}] 已提交：{1}" -f (Stamp), ($staged.Text -replace "`n", '、'))
    }
    if ((Get-AheadCount) -gt 0) { [void](Push-Changes) }
  } catch {
    Write-Host ("[{0}] 同步失败：{1}" -f (Stamp), $_.Exception.Message) -ForegroundColor Red
  }
}

if (-not (Invoke-Git rev-parse --is-inside-work-tree).Ok) {
  Write-Host '错误：当前文件夹不是 git 仓库，无法同步。' -ForegroundColor Red
  exit 1
}

Write-Host '正在监听以下文件，保存即自动发布：'
foreach ($f in (Get-ExistingTargets)) { Write-Host "  - $f" }
Write-Host ''
Write-Host '保持本窗口开启即可；按 Ctrl+C 停止。'
Write-Host ''

Update-Brief
Sync  # 启动时若还有未提交 / 未推送的改动，先同步一次

$lastSig = $null
$changedAt = $null
$lastPushTry = Get-Date
while ($true) {
  Start-Sleep -Seconds 1
  Update-Brief
  $pending = Get-Pending
  if (-not $pending) {
    $lastSig = $null
    $changedAt = $null
    # 之前推送失败的提交：定期重试
    if (((Get-Date) - $lastPushTry).TotalSeconds -ge $PUSH_RETRY_SEC) {
      $lastPushTry = Get-Date
      if ((Get-AheadCount) -gt 0) { [void](Push-Changes) }
    }
    continue
  }
  $sig = Get-Signature $pending
  if ($sig -ne $lastSig) {
    if (-not $changedAt) {
      $names = ($pending -split "`n" | ForEach-Object { $_.Substring(3).Trim('"') }) -join '、'
      Write-Host ("[{0}] 检测到改动（{1}），停止改动 {2} 秒后自动提交…" -f (Stamp), $names, $DEBOUNCE_SEC)
    }
    $lastSig = $sig
    $changedAt = Get-Date
    continue
  }
  if (((Get-Date) - $changedAt).TotalSeconds -ge $DEBOUNCE_SEC) {
    Sync
    $lastPushTry = Get-Date
    $lastSig = $null
    $changedAt = $null
  }
}
