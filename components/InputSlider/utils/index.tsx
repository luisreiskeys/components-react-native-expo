export function currency(num: number) {
  let a = parseFloat(num.toString())
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  a = a.replace(/\./g, "+");
  a = a.replace(/,/g, ".");
  a = a.replace(/\+/g, ",");
  a = a.replace(/\-/g, "");
  if (num >= 0) {
    return `R$ ${a}`;
  } else {
    return `-R$ ${a}`;
  }
}
