/* Configuração */
const CONFIG = {
  // WhatsApp: 55 + DDD + número
  whatsapp: "5548991775748", // (48) 99177-5748
  nome: "Eduarda",
};

document.documentElement.classList.remove("no-js");

/* Topo e botão WhatsApp */
const topo = document.getElementById("topo");
const flutuante = document.getElementById("whatsFlutuante");
const onScroll = () => {
  const y = window.scrollY;
  topo.classList.toggle("is-scrolled", y > 30);
  flutuante.classList.toggle("on", y > 600);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Menu do celular */
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");
const setMenu = (aberto) => {
  menu.classList.toggle("aberto", aberto);
  menuBtn.setAttribute("aria-expanded", String(aberto));
  menuBtn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  document.body.style.overflow = aberto ? "hidden" : "";
};
menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("aberto")));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

/* Animação ao aparecer */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
  });
}, { threshold: 0.01, rootMargin: "0px 0px 60px 0px" });
document.querySelectorAll(".reveal").forEach((el, i) => {
  const irmaos = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
  el.style.transitionDelay = `${Math.min(irmaos.indexOf(el), 4) * 40}ms`;
  io.observe(el);
});

/* Dúvidas */
const faqs = document.querySelectorAll(".faq details");
faqs.forEach((d) => d.addEventListener("toggle", () => {
  if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
}));

/* Links do WhatsApp */
const linkWhats = (texto) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;
flutuante.href = linkWhats(`Olá, ${CONFIG.nome}! Vi seu site e gostaria de saber mais sobre o atendimento.`);
document.querySelectorAll(".js-whats").forEach((a) => { a.href = flutuante.href; });
flutuante.target = "_blank";
flutuante.rel = "noopener";

/* Formulário */
const form = document.getElementById("formAgendar");
const nota = document.getElementById("formNota");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dados = new FormData(form);
  const nome = (dados.get("nome") || "").toString().trim();
  const campoNome = form.querySelector("#fNome");

  if (!nome) {
    campoNome.parentElement.classList.add("erro");
    nota.textContent = "Me conta só o seu nome para eu saber com quem estou falando 🙂";
    nota.classList.add("erro");
    campoNome.focus();
    return;
  }
  campoNome.parentElement.classList.remove("erro");
  nota.classList.remove("erro");

  const msg = (dados.get("mensagem") || "").toString().trim();
  const idade = (dados.get("idade") || "").toString().replace(/\D/g, "");
  const paraFilho = dados.get("quem") !== "eu";
  const abertura = paraFilho
    ? `Olá, ${CONFIG.nome}! Me chamo ${nome} e gostaria de agendar uma conversa sobre o meu filho(a)${idade ? `, de ${idade} anos` : ""}.`
    : `Olá, ${CONFIG.nome}! Me chamo ${nome}${idade ? `, tenho ${idade} anos` : ""} e gostaria de agendar uma sessão.`;
  const linhas = [
    abertura,
    ``,
    `• Atendimento: online`,
    `• Melhor período: ${dados.get("periodo")}`,
  ];
  if (msg) linhas.push(``, msg);

  window.open(linkWhats(linhas.join("\n")), "_blank", "noopener");
  nota.textContent = "Abrindo o WhatsApp… se não abrir, verifique se o navegador bloqueou a janela.";
});

document.getElementById("ano").textContent = new Date().getFullYear();

/* Como posso ajudar */
(() => {
  const secao = document.querySelector(".ajuda");
  if (!secao) return;
  const viewport = secao.querySelector(".ajuda__viewport");
  const trilho = secao.querySelector(".ajuda__trilho");
  const cards = [...trilho.children];
  const barra = document.getElementById("ajudaBarra");
  const atual = document.getElementById("ajudaAtual");
  const dica = secao.querySelector(".ajuda__dica");
  const total = document.getElementById("ajudaTotal");
  if (total) total.textContent = String(cards.length).padStart(2, "0");
  const calmo = window.matchMedia("(prefers-reduced-motion: reduce)");
  let distancia = 0, ticking = false;

  const visiveis = () => Math.max(1, Math.floor((viewport.clientWidth + 10) / (cards[0].offsetWidth + 14)));
  const marcar = (p) => {
    const n = Math.min(cards.length, visiveis() + Math.round(p * (cards.length - visiveis())));
    atual.textContent = String(n).padStart(2, "0");
    barra.style.width = `${(n / cards.length) * 100}%`;
    if (dica) dica.style.opacity = p > 0.97 ? "0" : "1";
  };

  const montar = () => {
    secao.classList.remove("is-pin");
    trilho.style.transform = "";
    const sobra = Math.max(0, trilho.scrollWidth - viewport.clientWidth);
    secao.classList.toggle("sem-rolagem", sobra < 2);
    if (!calmo.matches && sobra >= 2) {
      secao.classList.add("is-pin");
      distancia = Math.max(0, trilho.scrollWidth - viewport.clientWidth);
      secao.style.height = `${window.innerHeight + distancia * 1.25}px`;
    } else {
      secao.classList.remove("is-pin");
      secao.style.height = "";
      trilho.style.transform = "";
      distancia = 0;
    }
    atualizar();
  };

  const atualizar = () => {
    ticking = false;
    if (!secao.classList.contains("is-pin")) {
      const max = viewport.scrollWidth - viewport.clientWidth;
      marcar(max > 0 ? viewport.scrollLeft / max : 0);
      return;
    }
    const total = secao.offsetHeight - window.innerHeight;
    const p = Math.min(1, Math.max(0, -secao.getBoundingClientRect().top / total));
    trilho.style.transform = `translate3d(${-p * distancia}px, 0, 0)`;
    marcar(p);
  };

  const pedir = () => { if (!ticking) { ticking = true; requestAnimationFrame(atualizar); } };
  window.addEventListener("scroll", pedir, { passive: true });
  viewport.addEventListener("scroll", pedir, { passive: true });
  let ultimaLargura = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth !== ultimaLargura) { ultimaLargura = window.innerWidth; montar(); }
  });
  window.addEventListener("orientationchange", montar);
  window.addEventListener("load", montar);
  montar();
})();

/* Como funciona */
(() => {
  const linha = document.getElementById("linhaTempo");
  const fill = document.getElementById("linhaTempoFill");
  if (!linha || !fill) return;
  const etapas = [...linha.querySelectorAll(".etapa")];
  let ticking = false;
  const atualizar = () => {
    ticking = false;
    const trilho = fill.parentElement.getBoundingClientRect();
    const alvo = window.innerHeight * 0.6;
    const p = Math.min(1, Math.max(0, (alvo - trilho.top) / trilho.height));
    fill.style.height = `${p * 100}%`;
    etapas.forEach((e) => {
      const m = e.querySelector(".etapa__marco").getBoundingClientRect();
      e.classList.toggle("ativa", m.top + m.height / 2 < alvo);
    });
  };
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(atualizar); } }, { passive: true });
  window.addEventListener("resize", atualizar);
  atualizar();
})();
