@echo off
rem Liga o servidor (outros computadores da rede podem acessar)
rem e abre o site em modo quiosque no Microsoft Edge (para a feira).
rem Para sair do quiosque: Alt+F4. Para desligar o servidor: feche a janela dele.

cd /d "%~dp0"
start "Servidor Projeto ERER" node servidor.js

rem Espera o servidor ligar antes de abrir o navegador
timeout /t 2 /nobreak >nul

rem Perfil separado: garante o modo quiosque mesmo se o Edge ja estiver aberto
set "PERFIL=%TEMP%\erer-quiosque"

start "" msedge --kiosk "http://localhost:3001/?quiosque" --edge-kiosk-type=fullscreen --no-first-run --user-data-dir="%PERFIL%"
