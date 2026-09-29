# Auditoria Márcia Cosméticos: continuação

Briefing para uma nova sessão do Claude Code continuar a auditoria externa de marketing digital da Márcia Cosméticos (marciacosmeticos.com.br) sem refazer o que já foi feito.

## Status em 29/09/2026 (sessão 2)

Feito: tarefas 1 a 5 de "O que fazer agora".
- Relatório v4 publicado no mesmo link, com Semrush no achado 4, o subitem 4a de qualidade de conteúdo, a seção nova "Posicionamento" antes do Plano, o plano revisto e o "Método e limites" atualizado.
- Dados Semrush em `semrush/README.md`.
- Deck para o CEO no modelo de slide da Made: `deck/deck.html` (16 slides mais a capa: técnico, CRO, benchmark e marketplaces incluídos), gerado por `deck/gen-deck.mjs` com o chassi em `deck/made-slide/` (baixado da CDN). PDF em `deck/deck.pdf`.
- Os plugins Product Marketing e website-quality-checker não estavam na sessão. O posicionamento e as notas de S a D foram feitos à mão, com o mesmo método (hipótese testada, casa de mensagens, mapa de alternativas, E-E-A-T).
- O proxy do ambiente mudou de porta: hoje é o que está em `$HTTPS_PROXY` (40647), e não 38185.

## Prompt para colar na sessão nova

> Leia `audits/marcia-cosmeticos/PROXIMA-SESSAO.md` na branch `claude/auditoria-marketing-digital-btqoj9` e execute as tarefas da seção "O que fazer agora", na ordem. Atualize o relatório publicado em https://claude.ai/artifact/DxoGW75LcurXu6JjdfH9Cd (leia o artifact antes de publicar) e faça commit e push na mesma branch.

## Antes de abrir a sessão (checklist do usuário)

- [ ] Conectar o **Semrush** em https://claude.ai/customize/connectors.
- [ ] Ativar os plugins **Product Marketing** e **website-quality-checker** (catálogo "Anthropic Directory", em Plugins).
- [ ] Confirmar que o ambiente de nuvem tem a variável `APIFY_TOKEN` e acesso de rede amplo. As duas coisas já foram configuradas nesta sessão.
- [ ] Abrir a sessão nova **depois** de conectar e ativar. Conectores e plugins só são carregados quando a sessão começa.

## Onde está tudo

| O quê | Onde |
|---|---|
| Sessão anterior (histórico completo) | https://claude.ai/code/session_01MD8cVYnyGEYivEhBJ4Q7xi |
| Relatório publicado (v3.1) | https://claude.ai/artifact/DxoGW75LcurXu6JjdfH9Cd |
| Fonte do relatório | `audits/marcia-cosmeticos/audit-marcia.html` e `img/` (6 prints) |
| Consultas Apify | `audits/marcia-cosmeticos/apify/run.py`, uso: `python3 run.py [nome]` |
| Dados brutos Apify (29/09) | `audits/marcia-cosmeticos/apify/data/*.json` |
| Documento original do time (24/09) | PDF "Audit_Marcia_Cosmeticos_Made_Brasil", com 6 seções: menu, marca, catálogo, frete, PDV, atendimento |

Para republicar o relatório no **mesmo link**: primeiro ler o artifact com `Artifact action: "read"` e a `url` acima. Depois editar `audit-marcia.html` e publicar com `url` igual ao link, levando as imagens em `files` (`img/*.jpg`). Publicar sem `url` cria outro link.

## Contexto do cliente

- Marca carioca de mais de 90 anos, com fábrica própria de 20.000 m². O portfólio vai de coloração (Cores Nativas, Cores Naturais, Loção Capilar), descoloração (pó descolorante, AOX) e alisantes (guanidina) até cuidados e cachos (linha Aney Brilho Molhado, Botanical Care) e mãos e pés (acetona, removedor).
- O e-commerce roda na Loja Integrada e é operado pela **Navarro Distribuidora** (CNPJ 32.112.840/0001-32), não pela fabricante.
- O domínio antigo é `marciaonline.com.br` (loja anterior, Magento) e redireciona para o atual.
- O entregável é da agência Made Brasil, e o público é o CEO da Márcia.

## Achados já no relatório (não refazer)

1. **Mídia:** 6 pixels instalados (Meta `1036792118901758` e `847340554691511`, Google Ads `AW-16482982365` e `AW-18326144078`, TikTok `D9HSJPBC77UD7F80B2C0` e `DABJ23BC77UF8GCEDQ50`), GA4 `G-N9DMG905M5` e GTM `GTM-MKK6HLCD` v8. Nenhum anúncio ativo na Meta (página `175086359210667`) nem no Google Ads Transparency.
2. **Mensuração:** a conversão do Google Ads no GTM dispara em qualquer URL com "checkout", inclusive em historyChange. Conversões otimizadas estão desligadas. O vínculo entre os domínios está configurado.
3. **Frete:** cotação do shampoo Aney (R$ 11,94), só Correios. No PAC: SP R$ 19,47, POA R$ 21,82, Salvador R$ 24,34, Manaus R$ 29,20 (20 dias). No SEDEX, RJ sai por R$ 10,36, apesar do selo "Frete grátis para RJ" na home. Existem um combo Aney com 10%, o Kit Cachos Perfeitos e o pop-up "saiba quanto falta", mas nenhum valor mínimo aparece antes do carrinho.
4. **SEO:**
   - O title é "Marcia Online", a home tem H1 vazio e não tem meta description.
   - O menu tem 19 URLs `None-2023-06-09…`, e a categoria HIDRASHOCK abre vazia.
   - A home e a página de produto não têm schema de produto.
   - URLs antigas `marciaonline.com.br/index.php/...` caem em "Acesso bloqueado".
   - O blog `blog.marciacosmeticos.com.br` (posts de 24 e 28/09) não tem link na loja e diz "tintura em pó = descolorante", enquanto a loja vende tintura em pó como coloração.
5. **Performance:** Lighthouse mobile 13/100, home com 6,3 MB e 183 requisições. Banners em PNG 1920 px, YouTube embutido, ícones hospedados em `cacalutia.com.br`.
6. **Redes:**
   - Instagram com 24,4 mil seguidores. Ficou sem post de 29/04 a 19/08 e depois publicou 29 posts, na maioria collabs com microinfluenciadoras. Engajamento de 0,23%, igual ao da Bio Extratus.
   - TikTok com 79 seguidores e último vídeo em 23/12/2025. Um vídeo da Cores Naturais fez 29,4 mil visualizações.
   - Facebook com 145 mil seguidores. YouTube com 8 inscritos.
7. **Reputação:** Reclame Aqui com nota 8,5, 25 reclamações, 96% respondidas e 80% resolvidas, empresa não verificada. As reclamações se concentram em química capilar. O link de WhatsApp do site usa o número inválido `5502199118301`.
8. **Mercado Livre:** entre 25 anúncios Márcia, 19 são kits e 24 têm frete grátis. O revendedor MAR & CIA domina. Um vendedor chamado "MARCIA COSMETICOS" tem 3 anúncios e não tem selo oficial. A loja da Shopee está inativa.
9. **PDV:** 11 estados sem ponto de venda e e-mails pessoais de lojistas publicados (LGPD). Esse item foi mantido do documento de 24/09 e **não foi verificado de novo**.
10. **Benchmark:** visitas estimadas pelo Similarweb para agosto: Márcia 4,4 mil, Salon Line 2,29 mi, Bio Extratus 443 mil, Lola 195 mil, Skala 61 mil. Anúncios ativos na Meta: Salon Line ~1.600, Bio Extratus 56, Skala 38, Lola 35.
11. **Criativos dos concorrentes:** dos 150 anúncios ativos lidos, só 4 falam de coloração, e 45 são de parceria com criadoras. Coloração em casa é o espaço livre para a Márcia.

## O que fazer agora

### 1. SEO com Semrush (conector)
Base Brasil (`br`). Preencher e reescrever o achado 4 e o placar de "SEO e domínios":
- Visão geral dos domínios `marciacosmeticos.com.br` e `marciaonline.com.br`: tráfego orgânico estimado, número de palavras-chave, backlinks e domínios de referência.
- Palavras orgânicas da Márcia (top 50) e volume de busca de "márcia cosméticos", "descolorante márcia", "tintura márcia", "cores nativas", "aney brilho molhado", "água oxigenada 30 volumes" e "tinta de cabelo em casa".
- Lacunas de palavras-chave (keyword gap) contra `salonline.com.br`, `skala.com.br`, `bioextratus.com.br` e `beautycolor.com.br`, **com foco em coloração e descoloração**, para testar se o espaço livre visto nos anúncios também existe na busca orgânica.
- Backlinks que ainda apontam para `marciaonline.com.br`, para priorizar os redirecionamentos 301 um a um.
- Se houver: dados de anúncios pagos do Semrush, para confirmar se a Márcia comprou busca paga recentemente.
- Colocar os números do Semrush ao lado dos do Similarweb e explicar a diferença. São duas estimativas.

### 2. Posicionamento (plugin Product Marketing)
Usar `positioning-messaging`, `alternatives-map` e `message-house` com os dados acima. Resultado: uma **seção nova antes do Plano** com o posicionamento proposto, as mensagens por público (quem pinta em casa, quem cuida de cachos, revendedor/PDV) e o contraste com a linguagem dos concorrentes, que está em `apify/data/meta_criativos.json`.

Hipótese de partida: tradição de 90 anos, fábrica própria, preço justo e liderança em coloração acessível. Validar essa hipótese com os dados, não apenas repeti-la.

### 3. Qualidade de conteúdo (plugin website-quality-checker)
Dar nota de S a D para três URLs:
- https://www.marciacosmeticos.com.br/sh-aney-brilho-molhado-300ml
- uma página de coloração (ex.: https://www.marciacosmeticos.com.br/coresnativas)
- o post mais recente do blog

Entrar como subitem do achado 4, com foco em confiabilidade (E-E-A-T) em química capilar.

### 4. Deck para a reunião
10 a 12 slides para o CEO, a partir do relatório final. Preferir o tipo Slides de artifact, ou usar a skill pptx se pedirem o arquivo. O HTML fica como anexo.

### 5. Fechamento
- Atualizar "Método e limites" com as fontes novas e a data.
- Mudar a versão no cabeçalho para `v4`.
- Commit e push na branch `claude/auditoria-marketing-digital-btqoj9`.

## Dicas técnicas (o que já deu errado)

- **O site bloqueia curl e requisições sem navegador.** O firewall da Loja Integrada devolve "Acesso Bloqueado". Usar o Playwright com o Chromium de `/opt/pw-browsers/chromium`, proxy `http://127.0.0.1:38185` e o flag `--ignore-certificate-errors-spki-list=<hash>`. O hash é o SPKI de `/root/.ccr/agent-proxy-ca.crt`:
  `openssl x509 -in /root/.ccr/agent-proxy-ca.crt -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | base64`
  O Playwright está em `/opt/node22/lib/node_modules/playwright/index.mjs`.
- `robots.txt`, `sitemap.xml` e URLs `index.php/...` são bloqueados pelo firewall mesmo com navegador.
- A API do PageSpeed estourou a cota. Rodar o Lighthouse local com `npm i lighthouse@12` e `CHROME_PATH=/opt/pw-browsers/chromium`, passando os mesmos flags de proxy e SPKI em `--chrome-flags`.
- **Instagram, Mercado Livre e Magalu** bloqueiam a navegação a partir do datacenter. Para os dois primeiros, usar o Apify (`run.py`). A Magalu ainda não foi verificada.
- **Biblioteca de Anúncios da Meta:** a URL com `view_all_page_id=<id>` funciona direto. Os IDs das páginas estão no `run.py` (`meta_criativos`).
- O Apify custou cerca de US$ 0,50 no total até aqui. O `run.py` imprime o custo de cada consulta.

## Regras do entregável

- Português, texto direto e sem jargão. Cada achado tem evidência, impacto e "O que fazer".
- Número sem fonte não entra. Estimativas (Similarweb, Semrush, Lighthouse) são marcadas como estimativa.
- Nunca colocar token ou chave em arquivo, commit ou chat.
