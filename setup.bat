@echo off
echo ========================================
echo   DuraCoreX - React App Setup
echo ========================================
echo.

:: Delete broken node_modules if present
if exist node_modules (
  echo Cleaning old node_modules...
  rmdir /s /q node_modules
)

:: Install dependencies
echo Installing dependencies (this takes ~1 min)...
call npm install

if %errorlevel% neq 0 (
  echo.
  echo ERROR: npm install failed. Make sure Node.js is installed.
  echo Download Node.js from: https://nodejs.org
  pause
  exit /b 1
)

echo.
echo ========================================
echo   Starting development server...
echo   Open http://localhost:5173 in browser
echo ========================================
echo.
call npm run dev
pause
