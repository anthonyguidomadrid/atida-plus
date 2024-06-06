export type PDPTypeEnum = {
  [key: string]: string
}

export enum pdpType {
  GENERIC = 'generic',
  OTC = 'otc',
  FOOD = 'food',
  NUTRITION = 'nutrition',
  MEDICAL_DEVICE = 'medical_device',
  PETS = 'pets'
}
