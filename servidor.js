// Servidor da página para a feira: serve os arquivos desta pasta na rede local.
// Uso: node servidor.js   (ou npm run servidor)

const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");

// 3001 para não brigar com o Quiz de Informática, que usa a 3000
const PORTA = 3001;
const PASTA = __dirname;

const TIPOS = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon"
};

const servidor = http.createServer((pedido, resposta) => {
    let caminho;
    try {
        caminho = decodeURIComponent(new URL(pedido.url, "http://x").pathname);
    } catch {
        resposta.writeHead(400).end();
        return;
    }
    if (caminho === "/") caminho = "/index.html";

    const arquivo = path.join(PASTA, caminho);
    const tipo = TIPOS[path.extname(arquivo).toLowerCase()];

    // Não deixa sair da pasta do projeto nem abrir arquivos ocultos (.git)
    const dentroDaPasta = arquivo.startsWith(PASTA + path.sep);
    const oculto = caminho.split("/").some(parte => parte.startsWith("."));

    if (!dentroDaPasta || oculto || !tipo) {
        resposta.writeHead(404).end("Não encontrado");
        return;
    }

    fs.readFile(arquivo, (erro, conteudo) => {
        if (erro) {
            resposta.writeHead(404).end("Não encontrado");
            return;
        }
        resposta.writeHead(200, { "Content-Type": tipo }).end(conteudo);
    });
});

// Endereços IPv4 deste computador na rede (Wi-Fi ou cabo)
function enderecosNaRede() {
    return Object.values(os.networkInterfaces())
        .flat()
        .filter(rede => rede.family === "IPv4" && !rede.internal)
        .map(rede => rede.address);
}

servidor.listen(PORTA, "0.0.0.0", () => {
    console.log("");
    console.log("  Projeto ERER rodando!");
    console.log("");
    console.log(`  Neste computador:   http://localhost:${PORTA}`);
    enderecosNaRede().forEach(ip => {
        console.log(`  Outros na rede:     http://${ip}:${PORTA}`);
    });
    console.log("");
    console.log("  Para desligar, feche esta janela.");
    console.log("");
});

servidor.on("error", erro => {
    if (erro.code === "EADDRINUSE") {
        console.log(`\n  A porta ${PORTA} já está em uso. O servidor já está aberto em outra janela?\n`);
    } else {
        console.log(erro);
    }
});
