export const updateBusinessDetailsPayload = {
  companyName: 'Some company name',
  taxReference: '12345678A',
  equivalenceSurcharge: false,
  reference: 'some-customer-reference'
}

export const updateBusinessDetailsPayloadWithRedirect = {
  ...updateBusinessDetailsPayload,
  redirect: '/some-page'
}
