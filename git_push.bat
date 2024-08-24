@echo off
cd /d "%~dp0"

git add .

git commit -m "Working Backend"

git push -u origin main

pause
