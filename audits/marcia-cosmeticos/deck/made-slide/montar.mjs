import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const AQUI = dirname(fileURLToPath(import.meta.url));

/** Monta uma página de entrega: embute o base.css e substitui os {{PLACEHOLDERS}}.
 *  A página sai autocontida — nenhuma folha de estilo externa. */
export function montarPagina({ template, valores = {} }) {
  const html = readFileSync(template, "utf8");
  const css = readFileSync(join(AQUI, "base.css"), "utf8");

  const mapa = { ...valores, BASE_CSS: css };
  const semValor = new Set();

  // Uma única passada sobre o template: cada ocorrência de {{CHAVE}} é trocada
  // pelo valor correspondente, tratado como texto literal — nunca reinterpretado
  // como novo placeholder (evita vazamento entre campos e interpretação de $&, $$ etc).
  // Um {{...}} que porventura apareça DENTRO de um valor substituído é conteúdo
  // literal do cliente, não placeholder — por isso a checagem de sobra é feita
  // aqui, sobre o template original, e não reexaminando o resultado já montado.
  const montada = html.replace(/\{\{([^{}]*)\}\}/g, (match, chave) => {
    if (Object.prototype.hasOwnProperty.call(mapa, chave)) {
      return String(mapa[chave]);
    }
    semValor.add(chave);
    return match;
  });

  if (semValor.size) {
    throw new Error(
      `placeholder sem valor: ${[...semValor].join(", ")} — em ${template}`,
    );
  }
  return montada;
}

const CHASSI_VALIDO = ["slide", "rolagem"];

const CRITERIO = `
slide   — o material é apresentado: alguém conduz ou se percorre do começo ao fim;
          o conteúdo é argumento; tabela até ~8 linhas.
          ex.: mesa de performance, fechamento de sprint
rolagem — o material é consultado: a pessoa chega procurando uma coisa;
          o conteúdo é referência; há tabela longa ou algo que se busca com Ctrl+F.
          ex.: plano de SEO técnico, catálogo, checklist`;

/** O tipo `documento` precisa declarar o chassi. Sem valor padrão, de propósito. */
export function validarChassi(manifesto) {
  if (manifesto?.tipo !== "documento") return manifesto;
  const { chassi } = manifesto;
  if (!chassi) {
    throw new Error(
      `o tipo documento exige o campo "chassi" (slide | rolagem) e não tem valor padrão.\n${CRITERIO}`,
    );
  }
  if (!CHASSI_VALIDO.includes(chassi)) {
    throw new Error(
      `chassi inválido: "${chassi}". Use slide ou rolagem.\n${CRITERIO}`,
    );
  }
  return manifesto;
}
