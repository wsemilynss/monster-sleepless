@echo off
chcp 65001 >nul
cd /d "%~dp0"
title 怪物夜未眠 自动同步
echo === 怪物夜未眠 自动同步到 GitHub Pages ===
echo.
where git >nul 2>nul
if errorlevel 1 (
  echo [错误] 未检测到 Git，请先安装 Git for Windows: https://git-scm.com/download/win
  goto end
)
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0auto-sync.ps1"
:end
echo.
echo 同步已停止。如果窗口一打开就退出，请把上方提示截图反馈。
pause
