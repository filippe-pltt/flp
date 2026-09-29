// Gera deck.html no modelo de slide da Made (arquivos em ./made-slide, baixados da CDN).
import { montarPagina } from './made-slide/montar.mjs';
import { navegacaoJS } from './made-slide/slide.mjs';
import { readFileSync, writeFileSync } from 'node:fs';

const AQUI = new URL('.', import.meta.url).pathname;
const LOGO_SVG = readFileSync(AQUI + 'made-slide/logo-made.svg', 'utf8').trim();
const CSS_DECK = readFileSync(AQUI + 'made-slide/css-deck.css', 'utf8');

// Tabela curta e notas S–D: só tokens do base.css.
const CSS_EXTRA = `
.tab{width:100%;border-collapse:collapse;background:var(--card);border:1px solid var(--line);border-radius:var(--raio);overflow:hidden;margin-top:14px;font-size:15px}
.tab th{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:500;text-align:left;padding:10px 16px;border-bottom:1px solid var(--line);background:var(--paper)}
.tab td{padding:10px 16px;border-bottom:1px solid var(--line);color:var(--ink);line-height:1.35;vertical-align:top}
.tab tr:last-child td{border-bottom:0}
.tab .n{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.tab .fora{color:var(--purple);font-weight:600;white-space:nowrap}
.tab tr.nos td{background:var(--note-fundo);font-weight:600}
.nota{font-family:var(--display);font-weight:800;font-size:30px;color:var(--purple);line-height:1}
.veredito{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap}
.card h3{margin-top:0}
.card ul{margin:0;padding-left:18px;color:var(--muted);font-size:15px;line-height:1.45}
.card ul li{margin-bottom:4px}
.teto{background:var(--capa);color:var(--branco);border-radius:var(--raio);padding:20px 26px;font-family:var(--display);font-weight:700;font-size:clamp(20px,2vw,28px);letter-spacing:-.6px;margin-top:10px}
.slide.denso .tab td{padding:8px 14px;font-size:14px}
@media(max-height:820px){.tab td{padding:7px 14px;font-size:14px}.card{padding:18px}}
`;

const S = (id, rotulo, corpo, cls = '') =>
  `<div class="slide${cls ? ' ' + cls : ''}" id="${id}" data-rotulo="${rotulo}"><div class="content">\n${corpo}\n</div></div>`;

const slides = [
S('resumo', 'Resumo', `
  <p class="eyebrow">Resumo · o que os dados públicos mostram</p>
  <h2>A Márcia tem estrutura de marca que anuncia, mas <em>não anuncia</em>, e o site não vende fora do Rio.</h2>
  <div class="kpis">
    <div class="kpi rv"><b>0</b><span>anúncios ativos da marca na Meta e no Google. A Salon Line tem cerca de 1.600 na Meta.</span><small>Mídia · 28/09</small></div>
    <div class="kpi rv d1"><b>245%</b><span>peso do frete PAC sobre um shampoo de R$ 11,94 em Manaus. Em São Paulo, 163%.</span><small>Frete · 28/09</small></div>
    <div class="kpi rv d2"><b>−77%</b><span>de tráfego orgânico estimado desde julho de 2022. Hoje são cerca de 1,3 mil visitas por mês.</span><small>Busca · Semrush</small></div>
  </div>
  <p class="takeaway">Antes de investir em mídia, é preciso arrumar a casa: contas, frete, site e conteúdo de química.</p>
  <p class="footnote">Fontes: Biblioteca de Anúncios da Meta e Google Ads Transparency Center (28/09/2026); calculadora de frete do site (28/09/2026); Semrush, base Brasil (29/09/2026). Estimativas marcadas como tal.</p>`),

S('midia', 'Mídia paga', `
  <p class="eyebrow">Mídia · contas e campanhas</p>
  <h2>Seis pixels instalados e <em>nenhuma campanha</em> no ar.</h2>
  <div class="kpis">
    <div class="kpi rv"><b>6</b><span>pixels de mídia para 3 plataformas: 2 Meta, 2 Google Ads e 2 TikTok. Contas em dobro costumam ser herança de agências anteriores.</span><small>Tags do site</small></div>
    <div class="kpi rv d1"><b>0</b><span>anúncios ativos na página oficial da Meta e nenhum anúncio no Google apontando para o site.</span><small>Bibliotecas de anúncios</small></div>
    <div class="kpi rv d2"><b>1</b><span>anúncio de busca em 12 meses: agosto de 2026, na palavra "aflore" (marca concorrente), com texto genérico.</span><small>Semrush · busca paga</small></div>
  </div>
  <p class="takeaway">Primeira decisão da reunião: quem é dono de cada conta. Consolidar uma por plataforma, em nome da Márcia.</p>
  <p class="footnote">Fontes: leitura das tags da home e do container GTM-MKK6HLCD (28/09/2026); Biblioteca de Anúncios da Meta, página 175086359210667; Semrush, histórico de busca paga, base Brasil (29/09/2026).</p>`),

S('mensuracao', 'Mensuração', `
  <p class="eyebrow">Mensuração · Google Ads</p>
  <h2>A conversão do Google Ads pode contar <em>compras que não aconteceram</em>.</h2>
  <div class="grid two">
    <div class="card rv"><h3>O que está configurado</h3><ul>
      <li>A tag de conversão dispara em qualquer URL que contenha "checkout", inclusive em trocas de tela sem recarregar.</li>
      <li>Na Loja Integrada, "checkout" aparece do carrinho à confirmação.</li>
      <li>Valor e número do pedido vêm de elementos que só existem na tela final.</li>
      <li>Conversões otimizadas desligadas.</li></ul></div>
    <div class="card rv d1"><h3>O efeito</h3><ul>
      <li>Início de checkout registrado como compra, com valor vazio ou zero.</li>
      <li>Custo por venda distorcido e lances automáticos aprendendo com o sinal errado.</li>
      <li>O vínculo entre marciacosmeticos e marciaonline está configurado, e o GA4 não conta em dobro.</li></ul></div>
  </div>
  <p class="takeaway">Restringir o gatilho ao pedido concluído e usar o evento de compra nativo, com valor e ID.</p>
  <p class="footnote">Fonte: container público do GTM, versão 8, lido em 28/09/2026.</p>`),

S('tecnico', 'Erros técnicos', `
  <p class="eyebrow">Site · erros e otimizações técnicas</p>
  <h2>Oito correções técnicas, a maioria <em>de baixo esforço</em>.</h2>
  <table class="tab rv">
    <thead><tr><th>O que está errado</th><th>Correção</th><th>Esforço</th></tr></thead>
    <tbody>
      <tr><td>Título "Marcia Online" em todas as páginas, H1 da home vazio, sem meta description</td><td>Ajustar o template com "Márcia Cosméticos"</td><td>Baixo</td></tr>
      <tr><td>19 links do menu levam a URLs "None-2023-06-09…". A categoria Hidrashock abre vazia</td><td>Refazer o menu e tirar as vazias do índice</td><td>Baixo</td></tr>
      <tr><td>7 banners da home apontam para marciaonline.com.br. URLs index.php antigas caem em "Acesso bloqueado"</td><td>Trocar os links e pedir remoção no Search Console</td><td>Baixo</td></tr>
      <tr><td>Home de 6,3 MB e 183 requisições, com banners PNG de 1920 px também no celular</td><td>WebP com versão para celular (economia estimada de 2,7 MB)</td><td>Médio</td></tr>
      <tr><td>YouTube embutido (cerca de 1 MB) e pixels em dobro (cerca de 1 MB de scripts)</td><td>Trocar o vídeo por imagem com link e remover os pixels órfãos</td><td>Baixo</td></tr>
      <tr><td>Sem dados estruturados de produto (preço, estoque, nota)</td><td>Ativar schema Product</td><td>Médio</td></tr>
      <tr><td>Ícones hospedados no servidor de um fornecedor e 28 imagens sem texto alternativo</td><td>Hospedar na loja e descrever as imagens</td><td>Baixo</td></tr>
      <tr><td>Conversão do Google Ads em qualquer "checkout" e WhatsApp com número inválido</td><td>Gatilho no pedido concluído e número corrigido</td><td>Baixo</td></tr>
    </tbody>
  </table>
  <p class="takeaway">Lighthouse no celular: 13/100. Tudo isso se resolve em 30 a 60 dias, sem verba de mídia.</p>
  <p class="footnote">Fontes: navegação no site, Lighthouse 12 mobile e leitura do container GTM-MKK6HLCD (28–29/09/2026). A nota do Lighthouse varia com a rede do teste. Peso e requisições são medidas diretas.</p>`, 'denso'),

S('frete', 'Frete', `
  <p class="eyebrow">Oferta · frete</p>
  <h2>Fora do Rio, o frete custa <em>mais que o produto</em>.</h2>
  <table class="tab rv">
    <thead><tr><th>Destino</th><th class="n">PAC</th><th class="n">Prazo</th><th class="n">SEDEX</th><th class="n">PAC ÷ produto</th></tr></thead>
    <tbody>
      <tr><td>Rio de Janeiro</td><td class="n">n/d</td><td class="n">3 dias</td><td class="n">R$ 10,36</td><td class="n">87% (SEDEX)</td></tr>
      <tr><td>São Paulo</td><td class="n">R$ 19,47</td><td class="n">7 dias</td><td class="n">R$ 29,44</td><td class="n">163%</td></tr>
      <tr><td>Porto Alegre</td><td class="n">R$ 21,82</td><td class="n">9 dias</td><td class="n">R$ 41,22</td><td class="n">183%</td></tr>
      <tr><td>Salvador</td><td class="n">R$ 24,34</td><td class="n">8 dias</td><td class="n">R$ 52,99</td><td class="n">204%</td></tr>
      <tr><td>Manaus</td><td class="n">R$ 29,20</td><td class="n">20 dias</td><td class="n">R$ 61,84</td><td class="n">245%</td></tr>
    </tbody>
  </table>
  <p class="takeaway">Uma régua nacional de frete grátis visível no topo (a Salon Line usa R$ 99) e kits por rotina acima dela.</p>
  <p class="footnote">Fonte: calculadora do site, Shampoo Aney Brilho Molhado 300 ml (R$ 11,94), 1 unidade, CEPs centrais, 28/09/2026. No Mercado Livre, 24 de 25 anúncios Márcia têm frete grátis (Apify, 29/09/2026).</p>`, 'denso'),

S('cro', 'CRO e ticket', `
  <p class="eyebrow">Conversão · ticket, packs e cross-sell</p>
  <h2>O ticket é baixo demais para o frete. <em>Pack é a saída.</em></h2>
  <div class="grid two">
    <div class="card rv"><h3>O que existe hoje</h3><ul>
      <li>Itens de R$ 4,95 (AOX 70 ml) a R$ 18,94 (Cores Nativas): para chegar a R$ 99, seriam de 6 a 20 itens.</li>
      <li>"Kits Ofertas" tem 1 kit só: Cachos Perfeitos, R$ 49,28.</li>
      <li>O combo de 4 itens com 10% só aparece na página do Aney.</li>
      <li>Na coloração, os "relacionados" são outras cores e formatos, que substituem o produto. Não sugerem AOX, luvas nem pós-química.</li>
      <li>83% das visitas saem na primeira página, com 32 segundos de média.</li></ul></div>
    <div class="card rv d1"><h3>O que testar</h3><ul>
      <li><b>Par de descoloração:</b> pó 50 g + AOX 70 ml (R$ 17,89 avulsos), com a volumagem certa já escolhida.</li>
      <li><b>Kit cor em casa:</b> coloração + shampoo e máscara pós-química + guia de uso.</li>
      <li><b>Leve 3:</b> o revendedor vende 3 descolorantes de 20 g por R$ 23,35 com frete grátis no Mercado Livre. No site, os mesmos 3 saem por R$ 23,82 mais o frete.</li>
      <li>Barra "faltam R$ X para o frete grátis" fixa no topo e no carrinho.</li>
      <li>Complementares no carrinho, sempre "o que usar junto".</li></ul></div>
  </div>
  <p class="takeaway">A régua de frete deve ser calibrada pelo ticket médio real, e os packs desenhados para passar dela.</p>
  <p class="footnote">Fontes: preços do site em 29/09/2026; Mercado Livre via Apify (29/09/2026); Similarweb, agosto de 2026 (estimativa). O ticket médio real sai do painel da Loja Integrada.</p>`, 'denso'),

S('busca', 'Busca orgânica', `
  <p class="eyebrow">SEO · o que as pessoas buscam</p>
  <h2>No Google, a Márcia só existe para quem <em>já digita "Márcia"</em>.</h2>
  <table class="tab rv">
    <thead><tr><th>Busca</th><th class="n">Buscas/mês</th><th>Márcia</th><th>Quem aparece no topo</th></tr></thead>
    <tbody>
      <tr><td>tinta de cabelo</td><td class="n">49.500</td><td class="fora">fora do top 100</td><td>Embelleze, L'Oréal, varejo</td></tr>
      <tr><td>pó descolorante</td><td class="n">33.100</td><td class="fora">fora do top 100</td><td>Varejo e L'Oréal</td></tr>
      <tr><td>guanidina</td><td class="n">9.900</td><td class="fora">fora do top 100</td><td>Salon Line (1º e 5º)</td></tr>
      <tr><td>como pintar o cabelo em casa</td><td class="n">2.400</td><td class="fora">fora do top 100</td><td>YouTube, L'Oréal, Garnier</td></tr>
      <tr><td>água oxigenada 30 volumes</td><td class="n">880</td><td class="fora">fora do top 100</td><td>Drogasil e revendas</td></tr>
      <tr class="nos"><td>pó descolorante marcia</td><td class="n">1.000</td><td>1º</td><td>Márcia</td></tr>
    </tbody>
  </table>
  <p class="takeaway">Salon Line, Skala, Bio Extratus e Beauty Color também não estão no top 20 de tinta e descolorante. O espaço está livre.</p>
  <p class="footnote">Fonte: Semrush, base Brasil, 29/09/2026 (estimativas). Tráfego orgânico da Márcia: ~5,7 mil/mês em jul/2022, 237 em dez/2023 (troca de loja e domínio), ~1,3 mil hoje.</p>`, 'denso'),

S('autoridade', 'Autoridade e blog', `
  <p class="eyebrow">SEO · autoridade e conteúdo</p>
  <h2>Pouca autoridade, e o blog que <em>já traz tráfego</em> está solto.</h2>
  <div class="grid two">
    <div class="card rv"><h3>Autoridade</h3><ul>
      <li>Authority Score 11 (de 0 a 100), com 283 domínios de referência.</li>
      <li>84% dos backlinks vêm de um único blog de beleza.</li>
      <li>Os links de B2B e imprensa se resumem a ABAD, Guia da Farmácia e Brazil Beauty News.</li>
      <li>Domínio antigo: o valor está na home, que já redireciona. O 301 um a um tem pouco retorno.</li></ul></div>
    <div class="card rv d1"><h3>Blog</h3><ul>
      <li>129 palavras e cerca de 200 visitas por mês, com "5.0 coloração" em 6º e "guanidina o que é" em 8º.</li>
      <li>Nenhum link da loja para o blog.</li>
      <li>Três posts sobre guanidina competem entre si.</li>
      <li>Categorias trocadas: o guia de Cores Nativas está em "Mãos e pés".</li></ul></div>
  </div>
  <p class="takeaway">O blog é o único ativo de busca que cresce. Precisa de menu, de revisão técnica e de assuntos escolhidos pelas buscas de cor.</p>
  <p class="footnote">Fontes: Semrush Backlinks e Organic Research, base Brasil (29/09/2026); navegação no blog em 29/09/2026.</p>`, 'denso'),

S('conteudo', 'Qualidade de conteúdo', `
  <p class="eyebrow">Conteúdo · confiança em química capilar</p>
  <h2>O produto mais seguro tem a melhor página. O mais arriscado, <em>a pior</em>.</h2>
  <table class="tab rv">
    <thead><tr><th>Página</th><th>Nota</th><th>O que falta</th></tr></thead>
    <tbody>
      <tr><td>Shampoo Aney Brilho Molhado</td><td><span class="nota">A</span></td><td>Modo de uso, composição e FAQ honesto já estão lá. Faltam dados de produto e avaliações.</td></tr>
      <tr><td>Blog: "Tintura em pó: o que é"</td><td><span class="nota">C</span></td><td>Diz que tintura em pó é descolorante, mas a loja vende tintura em pó como coloração. Não cita o teste de alergia, e o autor é genérico.</td></tr>
      <tr><td>Coloração Cores Nativas</td><td><span class="nota">D</span></td><td>Dois parágrafos promocionais, sem modo de uso, sem composição e sem o teste de alergia de 48 h. Promete 25 nuances e lista 15.</td></tr>
    </tbody>
  </table>
  <p class="takeaway">As reclamações do Reclame Aqui estão justamente em coloração e descoloração. A página de cor precisa ensinar a usar.</p>
  <p class="footnote">Nota de S (excelente) a D (insuficiente) dada pela Made, com foco em E-E-A-T (experiência, especialidade, autoridade e confiança). Leitura em 29/09/2026. Reclame Aqui: nota 8,5, 25 reclamações em 12 meses até 31/08/2026.</p>`, 'denso'),

S('redes', 'Redes sociais', `
  <p class="eyebrow">Redes · conteúdo e alcance</p>
  <h2>O conteúdo engaja como o dos concorrentes, mas <em>quase ninguém vê</em>.</h2>
  <div class="kpis">
    <div class="kpi rv"><b>0,23%</b><span>engajamento no Instagram, igual ao da Bio Extratus e acima de Lola e Embelleze. Nenhum post foi impulsionado.</span><small>Instagram · 12 posts</small></div>
    <div class="kpi rv d1"><b>145 mil</b><span>seguidores no Facebook contra 24,4 mil no Instagram: a base antiga não migrou.</span><small>Perfis públicos</small></div>
    <div class="kpi rv d2"><b>29,4 mil</b><span>visualizações de um vídeo da Cores Naturais no TikTok, 370 vezes os seguidores. O perfil está parado desde dezembro de 2025.</span><small>TikTok</small></div>
  </div>
  <p class="takeaway">A matéria-prima existe: reels de criadoras e uma série de coloração que já provou alcance. Falta distribuir.</p>
  <p class="footnote">Fonte: perfis públicos coletados via Apify em 29/09/2026. Engajamento é a média de curtidas e comentários dos 12 posts mais recentes dividida pelos seguidores.</p>`),

S('benchmark', 'Benchmark', `
  <p class="eyebrow">Benchmark · Márcia e cinco concorrentes</p>
  <h2>O engajamento é igual ao dos concorrentes. <em>O alcance é de outro tamanho.</em></h2>
  <table class="tab rv">
    <thead><tr><th>Marca</th><th class="n">Visitas/mês</th><th class="n">Orgânico Google</th><th class="n">Instagram</th><th class="n">Engaj.</th><th class="n">TikTok</th><th class="n">Anúncios Meta</th><th>Frete grátis</th></tr></thead>
    <tbody>
      <tr class="nos"><td>Márcia</td><td class="n">4,4 mil</td><td class="n">1,3 mil</td><td class="n">24,4 mil</td><td class="n">0,23%</td><td class="n">79</td><td class="n">0</td><td>Só RJ, sem valor</td></tr>
      <tr><td>Salon Line</td><td class="n">2,29 mi</td><td class="n">570 mil</td><td class="n">4,6 mi</td><td class="n">0,68%</td><td class="n">4,9 mi</td><td class="n">~1.600</td><td>Acima de R$ 99</td></tr>
      <tr><td>Bio Extratus</td><td class="n">443 mil</td><td class="n">167 mil</td><td class="n">1,8 mi</td><td class="n">0,23%</td><td class="n">579 mil</td><td class="n">~56</td><td>Cupom acima de R$ 200</td></tr>
      <tr><td>Lola</td><td class="n">195 mil</td><td class="n">292 mil</td><td class="n">1,3 mi</td><td class="n">0,10%</td><td class="n">1,1 mi</td><td class="n">~35</td><td>n/d</td></tr>
      <tr><td>Skala</td><td class="n">61 mil</td><td class="n">50 mil</td><td class="n">2,1 mi</td><td class="n">0,40%</td><td class="n">1,5 mi</td><td class="n">38</td><td>n/d</td></tr>
      <tr><td>Beauty Color</td><td class="n">n/d</td><td class="n">30 mil</td><td class="n">224 mil</td><td class="n">n/d</td><td class="n">n/d</td><td class="n">0</td><td>n/d</td></tr>
    </tbody>
  </table>
  <p class="takeaway">A Márcia não perde em conteúdo. Perde em distribuição: zero anúncio, busca só de marca e uma base 70 vezes menor que a da Bio Extratus.</p>
  <p class="footnote">Visitas: Similarweb, agosto de 2026, todos os canais. Orgânico: Semrush, setembro de 2026, só busca orgânica. As duas são estimativas e divergem (na Lola, o orgânico supera o total). Redes e anúncios: perfis públicos e Biblioteca da Meta via Apify, 28–29/09/2026.</p>`, 'denso'),

S('concorrentes', 'Concorrentes', `
  <p class="eyebrow">Mercado · 150 anúncios ativos de 6 concorrentes</p>
  <h2>Os concorrentes brigam por cachos e desconto. <em>Cor e segurança estão sem dono.</em></h2>
  <div class="kpis">
    <div class="kpi rv"><b>4 de 150</b><span>anúncios falam de coloração, descoloração ou cabelos brancos.</span><small>Coloração</small></div>
    <div class="kpi rv d1"><b>45 de 150</b><span>falam de cachos, e 35 de desconto ou custo-benefício. É uma arena lotada.</span><small>Cachos e preço</small></div>
    <div class="kpi rv d2"><b>0 de 150</b><span>falam de segurança (teste de mecha, alergia, uso correto) ou de fábrica própria.</span><small>Segurança e origem</small></div>
  </div>
  <p class="takeaway">Na mídia paga e na busca orgânica, a categoria em que a Márcia tem 90 anos de história está livre.</p>
  <p class="footnote">Fonte: Biblioteca de Anúncios da Meta via Apify, 29/09/2026 (Lola, Salon Line, Bio Extratus, Skala, Embelleze e Skafe; até 30 por marca). Busca: Semrush, base Brasil, 29/09/2026.</p>`),

S('marketplaces', 'Marketplaces', `
  <p class="eyebrow">Canais · marketplaces</p>
  <h2>No Mercado Livre, um revendedor <em>é a Márcia</em>.</h2>
  <div class="kpis">
    <div class="kpi rv"><b>21 de 25</b><span>anúncios de produtos Márcia são do revendedor MAR &amp; CIA, que tem loja oficial no ML como Perfumaria Irene.</span><small>Vendedores</small></div>
    <div class="kpi rv d1"><b>24 de 25</b><span>anúncios têm frete grátis, e 19 são kits de 2, 3 ou 6 unidades (R$ 22 a R$ 156). É o que falta no site.</span><small>Oferta</small></div>
    <div class="kpi rv d2"><b>16 de 25</b><span>anúncios são de Loção Capilar. A linha Aney quase não aparece na busca pela marca.</span><small>Mix</small></div>
  </div>
  <div class="grid two" style="margin-top:14px">
    <div class="card rv"><ul>
      <li>Um vendedor chamado "MARCIA COSMETICOS" tem 3 anúncios, sem selo de loja oficial.</li>
      <li>O primeiro resultado da busca "marcia cosmeticos" é de outra marca.</li>
      <li>Shopee: loja "marcia_cosmeticos" inativa. Amazon: só terceiros. Magalu: não verificada.</li></ul></div>
    <div class="card rv d1"><ul>
      <li>Confirmar se o "MARCIA COSMETICOS" é da marca e pedir o selo oficial.</li>
      <li>Decidir com a Navarro: loja oficial própria ou revendedor autorizado, com preço mínimo.</li>
      <li>Levar para o site a lógica de kit com frete grátis que o revendedor já provou.</li></ul></div>
  </div>
  <p class="takeaway">O canal já vende kit com frete grátis. A decisão é quem controla o preço e a marca nele.</p>
  <p class="footnote">Fonte: busca "marcia cosmeticos" no Mercado Livre, 2 primeiras páginas (94 anúncios), via Apify em 29/09/2026. Vendas por anúncio: no máximo 50 unidades.</p>`, 'denso'),

S('hipotese', 'Hipótese testada', `
  <p class="eyebrow">Posicionamento · a hipótese contra os dados</p>
  <h2>A tradição se confirma. A <em>"liderança"</em> ainda não tem prova.</h2>
  <table class="tab rv">
    <thead><tr><th>Hipótese</th><th>Veredito</th><th>Por quê</th></tr></thead>
    <tbody>
      <tr><td>Tradição de 90 anos</td><td class="veredito">Confirmada</td><td>Só a Lola fala de idade nos anúncios ("15 anos"). Hoje os 90 anos só aparecem nas bios das redes.</td></tr>
      <tr><td>Coloração como espaço</td><td class="veredito">Confirmada</td><td>4 de 150 anúncios, e nenhum concorrente analisado no top 20 da busca.</td></tr>
      <tr><td>Preço justo</td><td class="veredito">Em parte</td><td>A coloração custa R$ 18,94, mas 35 anúncios já brigam por preço, e o frete anula a vantagem fora do RJ.</td></tr>
      <tr><td>Liderança em coloração</td><td class="veredito">Sem prova</td><td>Na busca, quem ocupa o topo são L'Oréal, Embelleze e o varejo. "Especialista" se sustenta, "líder" não.</td></tr>
    </tbody>
  </table>
  <p class="takeaway">Proposta: sair de "tradição" como fato e ir para "orientação" como benefício.</p>
  <p class="footnote">Fontes: 150 anúncios ativos na Meta (Apify, 29/09/2026); Semrush, base Brasil (29/09/2026); preços do site em 29/09/2026.</p>`, 'denso'),

S('posicionamento', 'Posicionamento', `
  <p class="eyebrow">Posicionamento · proposta para discussão</p>
  <h2>A marca que <em>ensina a acertar</em> a cor em casa.</h2>
  <div class="teto rv">Cor em casa, sem erro: quem faz cor há 90 anos te ensina a acertar.</div>
  <div class="grid three" style="margin-top:14px">
    <div class="card rv"><h3>Orientação que evita erro</h3><ul><li>Teste de alergia e de mecha em toda página de química</li><li>Guias de proporção, volumagem e tempo de pausa</li></ul></div>
    <div class="card rv d1"><h3>Fabricante que responde</h3><ul><li>Fábrica própria de 20.000 m²</li><li>96% das reclamações respondidas, nota 8,5</li></ul></div>
    <div class="card rv d2"><h3>Preço de rotina</h3><ul><li>Coloração a R$ 18,94 e rotina de cachos a menos de R$ 50</li><li>Só depois de resolver o frete</li></ul></div>
  </div>
  <p class="takeaway">Quem pinta em casa é o público principal. Cachos entram como segunda frente, puxada por kit. PDV recebe conteúdo que reduz troca.</p>
  <p class="footnote">Frase-guia interna, não é slogan. Não substitui pesquisa com consumidoras sobre reconhecimento e percepção de qualidade.</p>`, 'denso'),

S('plano', 'Plano 30-60-90', `
  <p class="eyebrow">Plano · arrumar a casa antes de anunciar</p>
  <h2>Noventa dias para <em>voltar a anunciar</em> com o site pronto.</h2>
  <div class="grid three">
    <div class="card rv"><p class="num">30 DIAS</p><ul>
      <li>Donos das contas definidos e um pixel por plataforma</li>
      <li>Gatilho de conversão do Google Ads corrigido</li>
      <li>Título, menu, banners, blog no menu e WhatsApp</li>
      <li>Régua nacional de frete no topo</li>
      <li>E-mails pessoais fora da página "Onde encontrar" (LGPD)</li></ul></div>
    <div class="card rv d1"><p class="num">60 DIAS</p><ul>
      <li>Páginas de coloração e descoloração reescritas, com teste de alergia</li>
      <li>Guias para tinta, pó descolorante e água oxigenada</li>
      <li>Kits por rotina e dados estruturados de produto</li>
      <li>Imagens otimizadas para o celular</li></ul></div>
    <div class="card rv d2"><p class="num">90 DIAS</p><ul>
      <li>Mídia medida, começando por cor em casa</li>
      <li>Anúncios de parceria com as criadoras que já postaram</li>
      <li>Busca paga nas palavras genéricas de cor</li>
      <li>Política de marketplace e busca por CEP no PDV</li></ul></div>
  </div>
  <p class="takeaway">Para medir o tamanho de cada problema, precisamos de acesso a GA4, Search Console, contas de mídia e painel da Loja Integrada.</p>`, 'denso'),
].join('\n\n');

let html = montarPagina({
  template: AQUI + 'made-slide/slide.html',
  valores: {
    TITULO: 'Auditoria de marketing digital',
    CLIENTE: 'Márcia Cosméticos',
    CONTEXTO: 'Auditoria externa · 29 de setembro de 2026',
    LOGO_SVG,
    SLIDES: slides,
    SLIDE_JS: navegacaoJS(),
  },
});
html = html.replace('</style>', CSS_DECK + CSS_EXTRA + '</style>');
writeFileSync(AQUI + 'deck.html', html);
console.log('ok', html.length, 'bytes');
