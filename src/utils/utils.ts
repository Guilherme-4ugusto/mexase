export function formatarTelefone(telefone?: string | null) {
  if (!telefone) return "-";

  const apenasNumeros = telefone.replace(/\D/g, "");

  if (apenasNumeros.length === 11) {
    return apenasNumeros.replace(
      /(\d{2})(\d{5})(\d{4})/,
      "($1) $2-$3"
    );
  }

  if (apenasNumeros.length === 10) {
    return apenasNumeros.replace(
      /(\d{2})(\d{4})(\d{4})/,
      "($1) $2-$3"
    );
  }

  return telefone; 
}

export function calcularIdade(dataNasc: Date) {
  const diff = Date.now() - dataNasc.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
}