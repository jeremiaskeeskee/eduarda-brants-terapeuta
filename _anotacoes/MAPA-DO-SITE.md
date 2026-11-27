# Mapa do site

Use **Ctrl+F** no VS Code e procure o nome da parte (ex.: `Agendar`).
O mesmo nome aparece no HTML e no CSS.

---

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Página principal |
| `privacidade.html` | Política de Privacidade |
| `aviso-legal.html` | Aviso Legal |
| `404.html` | Página de "não encontrada" |
| `style.css` | Todo o visual (cores, tamanhos, celular) |
| `script.js` | Menu, formulário, animações, WhatsApp |
| `img/` | Fotos do site (WebP) e imagem de compartilhamento (`og-image.jpg`) |
| `favicon.svg` | Ícone da aba (girassol) |
| `fontes/` | Fontes do site (Fraunces e DM Sans), hospedadas no próprio site |
| `robots.txt` / `sitemap.xml` | Instruções e lista de páginas para o Google |
| `vercel.json` | Configuração da Vercel (links limpos, segurança, cache) |
| `_fotos-originais/` | Fotos originais do Instagram (não sobe pro site) |
| `_anotacoes/` | Estas anotações (não sobe pro site) |

---

## Partes da página principal (`index.html`)

Na ordem em que aparecem no site:

```html
<!-- Topo -->               logo + menu
<!-- Início -->             título, texto, botão, card "Terapeuta formada", foto e selo
<!-- Para os pais -->       "O comportamento mudou?" + sinais de atenção + botão
<!-- Como posso ajudar -->  3 cards de temas (no celular andam para o lado)
<!-- Sobre mim -->          fotos + texto sobre ela e a formação
<!-- Como funciona -->      ficha (público, 1ª conversa, sessões, formato) + 3 passos
<!-- Dúvidas -->            cartão de contato + perguntas dos pais
<!-- Agendar -->            formulário (responsável, quem, idade, período, origem)
<!-- Instagram -->          perfil + grade de fotos
<!-- Rodapé -->             links, contato, aviso CVV, crédito
<!-- Botão WhatsApp -->     botão verde flutuante
<!-- Ícone girassol -->     desenho do girassol usado no site
```

---

## Partes do visual (`style.css`)

```css
/* Cores, fontes e medidas */   cores principais ficam aqui (--creme, --marinho, --girassol...)
/* Botões */
/* Topo */  /* Topo flutuante */
/* Início */  /* Selo */  /* Credencial no início */
/* Sobre mim */
/* Cards */  /* Como posso ajudar */
/* Para os pais */
/* Como funciona */
/* Instagram */
/* Dúvidas */
/* Agendar */  /* Formulário: consentimento */
/* Rodapé */  /* Crédito */
/* Botão WhatsApp */
/* Responsivo */  /* Celular */   ajustes para tablet e celular
/* Páginas legais */  /* Página 404 */
```

---

## Partes do código (`script.js`)

```js
/* Configuração */           número do WhatsApp e nome
/* Topo e botão WhatsApp */
/* Menu do celular */
/* Animação ao aparecer */
/* Dúvidas */                abre uma pergunta por vez
/* Links do WhatsApp */
/* Formulário */             monta a mensagem do WhatsApp
/* Como posso ajudar */      cards andando para o lado (só quando não cabem na tela)
/* Como funciona */          linha do tempo acendendo
/* Credencial */             destaque ao tocar no celular
```

---

## Onde mudar as coisas mais comuns

**Número do WhatsApp**
- `script.js` → `/* Configuração */` → `whatsapp: "55..."` (formulário e botões)
- Também aparece escrito em: `index.html` (Rodapé e dados do Google no topo do arquivo), `privacidade.html`, `aviso-legal.html`, `404.html`
  → procure `99177-5748` e `5548991775748` e troque em todos

**Horários / dias de atendimento**
- `index.html` → procure `manhã` (menu do celular, Como funciona, Agendar e Rodapé)

**Duração da sessão**
- `index.html` → procure `50 minutos` (Como funciona e Rodapé)

**Card "Terapeuta formada" (início)**
- `index.html` → procure `credencial__txt`
- Quando tiver o nome da instituição, troque `Formação em Terapia` por `Formação em Terapia · Nome da instituição`

**Perguntas frequentes**
- `index.html` → `<!-- Dúvidas -->` → cada pergunta é um `<details>`
- Se mudar uma pergunta, mude também no topo do arquivo, no bloco `FAQPage` (é o que o Google lê)

**Cores**
- `style.css` → `/* Cores, fontes e medidas */` → linhas `--marinho`, `--girassol`, `--caramelo`...

**Fotos**
- Ficam em `img/`, cada uma em 2 tamanhos: `nome.webp` (grande) e `nome-600.webp` (celular)
- Para trocar uma foto, substitua os dois arquivos mantendo o mesmo nome

**Instagram**
- Procure `eduarda.brants016` em todos os arquivos

**Depois de mudar o CSS ou o JS**
- No `index.html`, aumente o número em `style.css?v=8` ou `script.js?v=4` (ex.: de `v=8` para `v=9`)
- Assim quem já visitou o site recebe a versão nova sem precisar apertar Ctrl+F5
