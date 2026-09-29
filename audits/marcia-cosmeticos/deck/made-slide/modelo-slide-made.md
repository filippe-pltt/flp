# Modelo de slide da Made — briefing para gerar em outro Claude

Cole este arquivo no outro Claude (ou aponte para ele) e peça: *"Gere um deck no modelo de slide da Made com o conteúdo abaixo"*.
O resultado é **um único `.html` autocontido**, navegável por setas, que imprime em PDF (1 slide por página).

## 1. Arquivos-fonte (caminhos absolutos)

Raiz do repositório: `/Users/filippehanck/Desktop/Projetos/Alares`

| O quê | Caminho |
|---|---|
| **Logo Made** (SVG, `fill="currentColor"`, viewBox 252.6×155.8) | **URL pública:** `https://cdn.madehub.com.br/made/logo-made.svg` · local: `templates/entrega/logo-made.svg` |
| CSS-base da superfície clara (tokens, capa, cards, takeaway…) | `templates/entrega/base.css` |
| Casca HTML do chassi de slide (navegação, sumário, progresso) | `templates/entrega/slide.html` |
| JS de navegação (setas, hash, sumário) | `templates/entrega/slide.mjs` (função `navegacaoJS()`) |
| Montador de placeholders `{{CHAVE}}` | `templates/entrega/montar.mjs` |
| CSS de componentes de deck (kpis, timeline, blocos, denso) | `entregas/visao-por-frente/lib/comum.mjs` (`CSS_DECK`) |
| **Exemplo real completo** (15 slides) | `entregas/visao-por-frente/deck/index.html` |
| Fragmentos de slide de exemplo | `entregas/visao-por-frente/slides/*.html` |
| Gerador do exemplo | `entregas/visao-por-frente/gen-deck.mjs` |
| Regras do tipo documento/chassi | `templates/entrega/tipos/documento.md` |

**Sem acesso ao repositório — tudo está na CDN pública.** Baixe numa pasta só (o `montar.mjs` procura o `base.css` ao lado dele):

```bash
mkdir -p made-slide && cd made-slide
for f in logo-made.svg slide/base.css slide/slide.html slide/slide.mjs slide/montar.mjs slide/css-deck.css slide/modelo-slide-made.md; do
  curl -sSO "https://cdn.madehub.com.br/made/$f"
done
```

| Arquivo | URL |
|---|---|
| Logo | `https://cdn.madehub.com.br/made/logo-made.svg` |
| `base.css` | `https://cdn.madehub.com.br/made/slide/base.css` |
| `slide.html` | `https://cdn.madehub.com.br/made/slide/slide.html` |
| `slide.mjs` | `https://cdn.madehub.com.br/made/slide/slide.mjs` |
| `montar.mjs` | `https://cdn.madehub.com.br/made/slide/montar.mjs` |
| `css-deck.css` (componentes de deck: kpis, timeline, blocos, denso) | `https://cdn.madehub.com.br/made/slide/css-deck.css` |
| Este briefing | `https://cdn.madehub.com.br/made/slide/modelo-slide-made.md` |

Nesse caso, troque os caminhos `templates/entrega/...` do exemplo abaixo pelos arquivos da pasta baixada, e injete o `css-deck.css` antes de `</style>`. O logo **precisa ir inline** no HTML (`<svg>` colado, não `<img src>`), senão o `currentColor` não pega e ele não fica branco na capa.

## 2. Como gerar (com o repositório)

```js
import { montarPagina } from '/Users/filippehanck/Desktop/Projetos/Alares/templates/entrega/montar.mjs';
import { navegacaoJS } from '/Users/filippehanck/Desktop/Projetos/Alares/templates/entrega/slide.mjs';
import { readFileSync, writeFileSync } from 'node:fs';

const RAIZ = '/Users/filippehanck/Desktop/Projetos/Alares/';
// com o repositório: readFileSync(RAIZ + 'templates/entrega/logo-made.svg', 'utf8')
// sem ele: baixe da CDN e leia o arquivo baixado (inline, não <img>)
const LOGO_SVG = (await fetch('https://cdn.madehub.com.br/made/logo-made.svg').then(r => r.text())).trim();

const html = montarPagina({
  template: RAIZ + 'templates/entrega/slide.html',
  valores: {
    TITULO: 'Título do deck',
    CLIENTE: 'Nome do cliente',            // aparece na capa: [logo Made] | × Cliente
    CONTEXTO: 'QBR · 24 de setembro de 2026', // eyebrow da capa
    LOGO_SVG,
    SLIDES: slidesHtml,                     // string com os <div class="slide">…
    SLIDE_JS: navegacaoJS(),
  },
});
writeFileSync('deck.html', html);
```

`montarPagina` embute o `base.css` na página e falha se sobrar `{{PLACEHOLDER}}` sem valor. A capa é gerada pelo próprio `slide.html` — **não escreva capa nos SLIDES**.

## 3. Anatomia de um slide

```html
<div class="slide" id="resumo" data-rotulo="Resumo executivo"><div class="content">
  <p class="eyebrow">Seção · contexto curto</p>
  <h2>Afirmação de uma frase, com o ponto-chave em <em>destaque roxo</em>.</h2>
  <!-- corpo: kpis / duas colunas / gráfico / lista -->
  <p class="takeaway">A conclusão do slide, em uma ou duas frases.</p>
  <p class="footnote">Fonte: … · data</p>
</div></div>
```

- `id` único (vira o hash da URL) e `data-rotulo` (nome no sumário e no rodapé).
- **Uma ideia por slide.** Altura fixa: se não cabe, são duas ideias — parta em dois.
- Slide mais carregado: `class="slide denso"` (encolhe título, kpi e takeaway).
- Animação de entrada: adicione `class="rv"` (+ `d1`/`d2` para atraso) nos blocos.
- Tabela: até ~8 linhas. Passou disso, o material é de consulta, não de slide.

## 4. Identidade visual (tokens do `base.css`)

Superfície **clara**; só a capa é escura.

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#f7f7fa` | fundo |
| `--ink` | `#18191c` | texto |
| `--muted` | `#60636c` | texto secundário |
| `--line` | `#dedee5` | bordas |
| `--card` | `#ffffff` | cartões |
| `--purple` | `#5a53f7` | cor da marca: números, realce, eyebrow, barra de progresso |
| `--accent` | `#36efa2` | verde: pílulas/etiquetas (texto `--on-accent` `#1c1786`) |
| `--capa` | `#19191f` | fundo da capa |
| `--note-fundo` | `#eeeef7` | fundo de nota |
| `--raio` | `14px` | raio de cartões |

Fontes (Google Fonts, já no `slide.html`): **Sora** 400/600/700/800 (títulos, números grandes), **Instrument Sans** 400–700 (corpo), **JetBrains Mono** 400/500 (eyebrow, rótulos, datas).

Regras de estilo:
- **Só tokens.** Nenhum hex solto no CSS do deck; gráficos SVG também usam `var(--purple)`, `var(--line)` etc.
- `h1/h2`: Sora 750, `letter-spacing` negativo, `line-height:1.02`; `<em>` em roxo, sem itálico.
- `.eyebrow`: mono, caixa alta, espaçada, com traço roxo depois (no deck).
- Número de destaque (`.kpi b`): Sora, roxo, `clamp(34px,3.6vw,56px)`.
- `.takeaway`: 24px, peso 600, filete roxo de 4px à esquerda.
- Logo: sempre inline (`currentColor`) — branco na capa, `--ink` na barra do topo. **Não existe logo colorida para fundo escuro; use a mono.**
- Sem gradientes decorativos, sem sombras pesadas, sem emojis.

## 5. Componentes prontos (CSS de deck)

Classes de `CSS_DECK` (copie o bloco de `entregas/visao-por-frente/lib/comum.mjs` e injete antes de `</style>` com `html.replace('</style>', CSS_DECK + '</style>')`):

- `.kpis` (3 colunas) > `.kpi` com `<b>número</b><span>descrição</span><small>rótulo</small>`
- `.metodo` (2 colunas de kpi), `.criacao-grid` (gráfico 1.55fr + kpis 1fr)
- `.frente` (2 colunas) com `ul` de itens `<li><a>nome</a><time>dd/mm</time></li>` e `.prox` (próximos passos com traço roxo), `.numero-frente`
- `.tl` linha do tempo em 4 cards (`li.cliente` ganha etiqueta "pedido da Alares")
- `.blocos > .bloco` (grade de 6; `.inedito` destaca)
- `.chart` + `.legenda` para SVG
- Do base: `.card`, `.note`, `.ribbon`, `.pill`, `.grid .two/.three`

## 6. Comportamento (já vem no chassi)

Setas ←/→, PageUp/PageDown, Home/End; hash na URL (`#resumo`); botão **Sumário** (dialog gerado dos `data-rotulo`); barra de progresso; rodapé com rótulo do slide atual; `@media print` põe cada slide em uma página (imprimir em A4 paisagem, com "gráficos de segundo plano" ligado).

## 7. Regras de conteúdo

- **Todo número tem fonte e data** (`.footnote` ou linha na origem). Dado sem fonte não entra.
- Título é afirmação, não rótulo ("Search é o único canal com tração", não "Canais").
- Tom: direto, sem hipérbole, sem vocabulário anglófono desnecessário; PT-BR.
- Nada interno da Made (nomes de pessoas, ranking de card, custo interno, credencial, dado pessoal) num deck que vai ao cliente.

## 8. Checagem antes de entregar

1. Abrir o `.html` em 1440×900, 1366×768 e 1280×800: **nenhum slide pode rolar** (se rolar, virou duas ideias).
2. `grep '{{'` no HTML final: zero sobras.
3. Navegar de ponta a ponta com as setas e conferir o sumário.
4. Exportar PDF e conferir 1 slide por página.

## 9. Prompt sugerido para o outro Claude

> Use o modelo de slide da Made descrito em `docs/referencia/modelo-slide-made.md` (raiz `/Users/filippehanck/Desktop/Projetos/Alares`). Gere `deck.html` com `montarPagina` + `navegacaoJS`, logo de `https://cdn.madehub.com.br/made/logo-made.svg` (inline), cliente **[CLIENTE]**, contexto **[CONTEXTO]**, título **[TÍTULO]**. Conteúdo, um slide por item: **[LISTA DE SLIDES COM TÍTULO-AFIRMAÇÃO, NÚMEROS E FONTES]**. Siga as regras das seções 3, 4 e 7 e rode a checagem da seção 8.
