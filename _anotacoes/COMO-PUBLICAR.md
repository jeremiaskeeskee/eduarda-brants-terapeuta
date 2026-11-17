# Como publicar o site da Eduarda na Vercel

## O que vai para o ar
- `index.html`, `privacidade.html`, `aviso-legal.html`, `404.html`
- `style.css`, `script.js`, `favicon.svg`, `robots.txt`, `vercel.json`
- pasta `img/`

Não vão para o ar (já estão bloqueadas no `.vercelignore` e no `.gitignore`):
`_fotos-originais/`, `.claude/` e este arquivo.

## Opção A: pelo GitHub (igual ao projeto SK Móveis)
1. No GitHub, crie um repositório novo e **privado** (ex.: `eduarda-brants-terapeuta`).
2. Envie a pasta pelo GitHub Desktop ou pelo terminal:
   ```
   git init
   git add .
   git commit -m "Site Eduarda Brants"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/eduarda-brants-terapeuta.git
   git push -u origin main
   ```
3. Na Vercel: **Add New → Project → Import** o repositório.
4. Em **Framework Preset**, escolha **Other**. Deixe Build Command e Output Directory vazios.
5. Clique em **Deploy**. O site fica em `eduarda-brants-terapeuta.vercel.app`.

A partir daí, cada `git push` atualiza o site sozinho.

## Opção B: pelo terminal, sem GitHub
```
npm i -g vercel
vercel        (prévia)
vercel --prod (produção)
```

## MODO PRÉVIA (ativo agora)
O site está escondido do Google em 3 lugares:
1. `index.html`: `<meta name="robots" content="noindex, nofollow">`
2. `robots.txt`: `Disallow: /`
3. `vercel.json`: cabeçalho `X-Robots-Tag: noindex, nofollow`

### Para lançar de verdade (quando ela se formar e tiver o domínio)
1. `index.html`: trocar por `<meta name="robots" content="index, follow, max-image-preview:large">`
2. `robots.txt`: trocar `Disallow: /` por `Allow: /` e adicionar `Sitemap: https://SEU-DOMINIO/sitemap.xml`
3. `vercel.json`: apagar a linha do `X-Robots-Tag`
4. Completar os endereços com o domínio (Open Graph, Schema, canonical, sitemap).

## Conectar o domínio (depois)
1. Vercel → projeto → **Settings → Domains → Add** → `seudominio.com.br`
2. No registro.br → **DNS** → criar os registros que a Vercel mostrar
   (normalmente um `A` para `76.76.21.21` e um `CNAME` do `www` para `cname.vercel-dns.com`).
3. Esperar a propagação (alguns minutos até algumas horas). O HTTPS é automático.
