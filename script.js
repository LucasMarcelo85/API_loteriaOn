import puppeteer from "puppeteer";

async function scrapeBolao() {
  const url = "https://www.loteriasonline.caixa.gov.br/silce-web/#/bolao-caixa/9833";
  const browser = await puppeteer.launch({ headless: false }); // Mudar para false para depuração
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "domcontentloaded" });

  // Espera que os elementos existam no DOM antes de continuar
  await page.waitForFunction(() => {
    return document.querySelectorAll(".card-bolao-caixa").length > 0;
  }, { timeout: 60000 }); // Aumentando o tempo limite para 60 segundos

  // Captura os dados
  const boloes = await page.evaluate(() => {
    const cards = document.querySelectorAll(".card-bolao-caixa");
    let resultado = [];

    cards.forEach(card => {
      const nome = card.querySelector(".titulo-bolao")?.innerText.trim() || "Desconhecido";
      const premio = card.querySelector(".valor-premio")?.innerText.trim() || "Não informado";
      const loteria = card.querySelector(".nome-loteria")?.innerText.trim() || "Não informado";
      const preco = card.querySelector(".valor-bolao")?.innerText.trim() || "Não informado";
      const cotas = card.querySelector(".quantidade-cotas")?.innerText.trim() || "Não informado";

      resultado.push({ nome, premio, loteria, preco, cotas });
    });

    return resultado;
  });

  console.log(JSON.stringify(boloes, null, 2));

  await browser.close();
}

// Executa a função
scrapeBolao().catch(console.error);
