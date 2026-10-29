@echo off
rem Abre o site em modo quiosque no Microsoft Edge (para a feira).
rem Para sair: Alt+F4.

rem Caminho da pasta do projeto no formato de URL (barras normais)
set "PASTA=%~dp0"
set "PASTA=%PASTA:\=/%"

rem Perfil separado: garante o modo quiosque mesmo se o Edge ja estiver aberto
set "PERFIL=%TEMP%\erer-quiosque"

start "" msedge --kiosk "file:///%PASTA%index.html?quiosque" --edge-kiosk-type=fullscreen --no-first-run --user-data-dir="%PERFIL%"
