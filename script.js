document.addEventListener("DOMContentLoaded", () => {

    // 1. Seleciona os links do menu que apontam para uma ID interna (começam com #)
    const linksMenu = document.querySelectorAll('a[href^="#"]');

    linksMenu.forEach(link => {
        link.addEventListener("click", (evento) => {
            evento.preventDefault(); // Cancela o "salto" instantâneo padrão do HTML

            // Pega o valor do atributo href (ex: "#dados")
            const idAlvo = link.getAttribute("href");

            // Localiza a seção correspondente na página
            const secaoAlvo = document.querySelector(idAlvo);

            // Se a seção existir, faz o scroll suave até ela
            if (secaoAlvo) {
                secaoAlvo.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // 2. Modo quiosque (feira): só ativa quando a página abre com "?quiosque" (ver iniciar.bat)
    if (new URLSearchParams(location.search).has("quiosque")) {
        ativarModoQuiosque();
    }

});

function ativarModoQuiosque() {

    // Bloqueia botão direito, seleção de texto e arrastar
    ["contextmenu", "selectstart", "dragstart"].forEach(tipo => {
        document.addEventListener(tipo, evento => evento.preventDefault());
    });

    // Bloqueia F12, Ctrl+P/S/U e as ferramentas do desenvolvedor (Ctrl+Shift+I/J/C)
    document.addEventListener("keydown", evento => {
        const tecla = evento.key.toLowerCase();
        const bloquear =
            evento.key === "F12" ||
            (evento.ctrlKey && ["p", "s", "u"].includes(tecla)) ||
            (evento.ctrlKey && evento.shiftKey && ["i", "j", "c"].includes(tecla));

        if (bloquear) {
            evento.preventDefault();
        }
    });

    // Volta para o início depois de alguns minutos sem uso (para o próximo visitante)
    const MINUTOS_SEM_USO = 2;
    let temporizador;

    function reiniciarTemporizador() {
        clearTimeout(temporizador);
        temporizador = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, MINUTOS_SEM_USO * 60 * 1000);
    }

    ["mousemove", "mousedown", "keydown", "wheel", "touchstart", "scroll"].forEach(tipo => {
        document.addEventListener(tipo, reiniciarTemporizador, { passive: true });
    });

    reiniciarTemporizador();
}
