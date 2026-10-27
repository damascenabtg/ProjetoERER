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

});
