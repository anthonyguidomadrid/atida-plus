export const ZIP_CODES_REGEX = {
  PT_STRICT: /^[0-9]{4}-[0-9]{3}$/,
  PT_FLEXIBLE: /^([0-9]{4}-[0-9]{3})$|^([0-9]{7})$/,
  ES_STRICT: /^(0[1-9][0-9]{3}|[1-4][0-9]{4}|5[0-2][0-9]{3})$/,
  ES_FLEXIBLE: /^(?:0?[1-9]|[1-4]\d|5[0-2])\d{3}$/,
  DE_FLEXIBLE: /^[0-9]{5}$/,
  DE_STRICT: /^[0-9]{5}$/,
  REJECT_ALL: /[^\w\W]/,
  ACCEPT_ALL: /^[\s\S]*/
}
