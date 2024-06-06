export const TAX_REFERENCE_REGEX = {
  PT_VAT: /^[0-9]{9}$/,
  ES_DNI_NIE: /^[0-9]{8}[A-Z]$|^[XxYyZz]\d{7,8}[a-zA-Z]$/,
  ES_NIF_CIF_NIE: /^[0-9]{8}[A-Z]$|^[A-Z][0-9]{8}$|^[XxYyZz]\d{7,8}[a-zA-Z]$/,
  ES_NIF_CIF_NIE_EXTENDED: /^[0-9]{8}[A-Z]$|^[A-Z][0-9]{8}|[A-Z][0-9]{7}[A-Z]$|^[XxYyZz]\d{7,8}[a-zA-Z]$/,
  /* NIF - [0-9]{8}[A-Z], CIF - [A-Z][0-9]{8}$, NIE - [XxYyZz]\d{7,8}[a-zA-Z]$ */
  REJECT_ALL: /[^\w\W]/
}
