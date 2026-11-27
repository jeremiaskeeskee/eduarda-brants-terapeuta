# Como publicar mudanças no site

O site está no ar em **https://www.eduardabrants.com.br**, hospedado na Vercel e ligado ao GitHub.
Cada `git push` na branch `main` atualiza o site sozinho em cerca de 1 minuto.

## Passo a passo

No terminal do VS Code (**Ctrl+'**), dentro da pasta do site:

1. Ver o que mudou
   ```
   git status
   ```
2. Separar tudo para enviar
   ```
   git add .
   ```
3. Salvar com uma descrição curta (o `-m` é de "mensagem")
   ```
   git commit -m "O que mudou"
   ```
4. Enviar
   ```
   git push
   ```

Depois confira em **Vercel → Deployments** (o mais recente fica *Ready*) e no site, com **Ctrl+F5**.

## Cuidados

- Salve os arquivos (Ctrl+S) antes do `git add .`.
- Se o VS Code mostrar "Failed to save … The content of the file is newer", **não clique em Overwrite**: feche a aba sem salvar (Don't Save) e abra o arquivo de novo.
- Se o `git push` disser *rejected* ou *fetch first*, rode `git pull` e depois `git push`.
- Se mudou o `style.css` ou o `script.js`, aumente o número do `?v=` no `index.html` (veja o MAPA-DO-SITE).

## Ver mudanças sem publicar

- **Live Server:** no VS Code, clique em **Go Live** (barra azul embaixo). Abre em `127.0.0.1:5500`.
- **Modo celular:** no navegador, **F12** e depois **Ctrl+Shift+M**.
- **Testar algo e poder desfazer:** crie uma branch (`git switch -c teste-nome`), mude e veja. Para voltar: `git switch main`. Para apagar o teste: `git branch -D teste-nome`.

## O que vai para o ar

- `index.html`, `privacidade.html`, `aviso-legal.html`, `404.html`
- `style.css`, `script.js`, `favicon.svg`, `robots.txt`, `sitemap.xml`, `vercel.json`
- pasta `img/`

Não vão para o ar: `_fotos-originais/`, `_anotacoes/`, `.claude/` e `CLAUDE.md`
(bloqueados no `.vercelignore` e no `.gitignore`).

## Google

- O site está liberado para o Google (`robots.txt` com `Allow: /`).
- Quando fizer uma mudança grande, atualize a data `<lastmod>` no `sitemap.xml`.
- Search Console: https://search.google.com/search-console (envie o `sitemap.xml` uma vez).
