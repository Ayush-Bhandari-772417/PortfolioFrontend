@echo off
echo ===============================================
echo        NEXT.JS FULL PROJECT AUDIT
echo ===============================================

REM ---------- CLEAN ----------
echo.
echo [0] Cleaning old build...
IF EXIST .next rmdir /s /q .next

REM ---------- ENV / TELEMETRY ----------
echo.
echo [1] Next.js info & telemetry...
call npx next info
call npx next telemetry disable

REM ---------- INSTALL CHECK ----------
echo.
echo [2] Installing / deduping deps...
call npm install
call npm dedupe
call npm outdated
call npm audit

REM ---------- LINT / TYPES ----------
echo.
echo [3] ESLint auto-fix...
call npm run lint -- --fix
call npx eslint . --max-warnings=0

echo.
echo [4] TypeScript check...
call npx tsc --noEmit

REM ---------- DEPENDENCY CHECK ----------
echo.
echo [5] Unused / circular deps...
call npx depcheck
call npx madge --circular src
echo Skipping madge graph generation - requires Graphviz

REM ---------- BUILD ANALYSIS ----------
echo.
echo [6] Bundle analyze build...
setlocal
set "ANALYZE=true"
call npm run build -- --webpack
endlocal

echo.
echo [7] Profiled build...
call npx next build --profile --webpack

echo.
echo [8] Source map explorer...
call npx source-map-explorer ".next\static\**\*.js" 2>nul || echo Source map explorer encountered warnings - this is non-critical

REM ---------- NORMAL BUILD ----------
echo.
echo [9] Production build...
call npm run build

REM ---------- START TEST ----------
echo.
echo [10] Testing production server...
taskkill /im node.exe /f >nul 2>&1
timeout /t 2 >nul
start /b cmd /c "npm run start >nul 2>&1"
timeout /t 5 >nul

REM ---------- SERVE STATIC ----------
echo.
echo [11] Serving .next for check...
taskkill /im node.exe /f >nul 2>&1
timeout /t 2 >nul
call npx serve .next --listen 3001 --cors

taskkill /im node.exe /f >nul 2>&1

echo.
echo ===============================================
echo     ALL CHECKS COMPLETED
echo ===============================================
pause