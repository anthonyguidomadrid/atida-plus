import { CustomerAddress } from '../types'

export const address: CustomerAddress = {
  salutation: 'Mr',
  firstName: 'Test',
  lastName: 'g2s',
  address1: 'Carl-Blos-Strass. 2 update es',
  address2: undefined,
  address3: undefined,
  houseNumber: 'someNumber',
  zipCode: '22222',
  city: 'Bonn',
  district: 'someDistrict',
  province: 'someProvince',
  country: 'Portugal',
  iso2Code: 'PT',
  company: 'string',
  phone: 'string',
  isDefaultShipping: true,
  isDefaultBilling: true
}

export const addressesList = [
  { ...address, id: '0', isDefaultShipping: true, isDefaultBilling: true },
  { ...address, id: '1', isDefaultShipping: false, isDefaultBilling: false },
  { ...address, id: '2', isDefaultShipping: false, isDefaultBilling: false },
  { ...address, id: '3', isDefaultShipping: false, isDefaultBilling: false }
]

export const addressesListWithDifferentDefaults = [
  { ...address, id: '0', isDefaultShipping: true, isDefaultBilling: false },
  { ...address, id: '1', isDefaultShipping: false, isDefaultBilling: true },
  { ...address, id: '2', isDefaultShipping: false, isDefaultBilling: false },
  { ...address, id: '3', isDefaultShipping: false, isDefaultBilling: false }
]
export const validatedAddress = {
  items: [
    {
      title: 'SomeStreet SomeHouseNumber, SomeZipCode SomeCity, España',
      id: 'someId',
      resultType: '',
      houseNumberType: '',
      address: {},
      position: {},
      access: [],
      mapView: {},
      scoring: {}
    }
  ]
}

export const suggestedAddresses = [
  {
    title: 'Calle Doctor Remón, 26560 Autol (La Rioja), España',
    id: 'here:af:street:iaXUD1faB.j.9OiOYjq9IB',
    resultType: 'street',
    address: {
      label: 'Calle Doctor Remón, 26560 Autol (La Rioja), España',
      countryCode: 'ESP',
      countryName: 'España',
      stateCode: 'RI',
      state: 'La Rioja',
      county: 'La Rioja',
      city: 'Autol',
      street: 'Calle Doctor Remón',
      postalCode: '26560'
    },
    position: {
      lat: 42.21413,
      lng: -2.00471
    },
    mapView: {
      west: -2.00563,
      south: 42.21371,
      east: -2.00385,
      north: 42.2143
    },
    scoring: {
      queryScore: 1,
      fieldScore: {
        streets: [0.63]
      }
    }
  },
  {
    title: 'Calle María Domínguez Remón, 50015 Zaragoza (Zaragoza), España',
    id: 'here:af:street:igDDsrW8G6XtRvHl4DVm8D',
    resultType: 'street',
    address: {
      label: 'Calle María Domínguez Remón, 50015 Zaragoza (Zaragoza), España',
      countryCode: 'ESP',
      countryName: 'España',
      stateCode: 'AR',
      state: 'Aragón',
      county: 'Zaragoza',
      city: 'Zaragoza',
      district: 'El Rabal',
      street: 'Calle María Domínguez Remón',
      postalCode: '50015'
    },
    position: {
      lat: 41.67328,
      lng: -0.87339
    },
    mapView: {
      west: -0.87409,
      south: 41.67326,
      east: -0.87268,
      north: 41.67329
    },
    scoring: {
      queryScore: 0.99,
      fieldScore: {
        streets: [0.58]
      }
    }
  },
  {
    title: 'Calle María Domínguez Remón, 50540 Borja (Zaragoza), España',
    id: 'here:af:street:Wy19ub9jsb9nOcNUdwmVZA',
    resultType: 'street',
    address: {
      label: 'Calle María Domínguez Remón, 50540 Borja (Zaragoza), España',
      countryCode: 'ESP',
      countryName: 'España',
      stateCode: 'AR',
      state: 'Aragón',
      county: 'Zaragoza',
      city: 'Borja',
      street: 'Calle María Domínguez Remón',
      postalCode: '50540'
    },
    position: {
      lat: 41.83431,
      lng: -1.53738
    },
    mapView: {
      west: -1.53827,
      south: 41.83383,
      east: -1.53654,
      north: 41.83457
    },
    scoring: {
      queryScore: 0.99,
      fieldScore: {
        streets: [0.58]
      }
    }
  },
  {
    title: 'Calle de Ramón y Cajal, 24750 La Bañeza (León), España',
    id: 'here:af:street:YaQOTdFSt3grMqrAn73G8D',
    resultType: 'street',
    address: {
      label: 'Calle de Ramón y Cajal, 24750 La Bañeza (León), España',
      countryCode: 'ESP',
      countryName: 'España',
      stateCode: 'CL',
      state: 'Castilla y León',
      county: 'León',
      city: 'La Bañeza',
      street: 'Calle de Ramón y Cajal',
      postalCode: '24750'
    },
    position: {
      lat: 42.29729,
      lng: -5.90294
    },
    mapView: {
      west: -5.90409,
      south: 42.29693,
      east: -5.90185,
      north: 42.29778
    },
    scoring: {
      queryScore: 0.9,
      fieldScore: {
        state: 0.75,
        streets: [0.67]
      }
    }
  },
  {
    title: 'Calle de Don Ramón de la Cruz, 28001 Madrid (Madrid), España',
    id: 'here:af:street:o1eUvkG1iU5ZGQo1HN.LuA',
    resultType: 'street',
    address: {
      label: 'Calle de Don Ramón de la Cruz, 28001 Madrid (Madrid), España',
      countryCode: 'ESP',
      countryName: 'España',
      stateCode: 'MD',
      state: 'Comunidad de Madrid',
      county: 'Madrid',
      city: 'Madrid',
      street: 'Calle de Don Ramón de la Cruz',
      postalCode: '28001'
    },
    position: {
      lat: 40.42882,
      lng: -3.67817
    },
    mapView: {
      west: -3.68712,
      south: 40.42825,
      east: -3.66923,
      north: 40.42927
    },
    scoring: {
      queryScore: 0.8,
      fieldScore: {
        streets: [0.61]
      }
    }
  },
  {
    title: 'Calle de Ramón y Cajal, 24750 La Bañeza (León), España',
    id: 'here:af:street:YaQOTdFSt3grMqrAn73G8D',
    resultType: 'street',
    address: {
      label: 'Calle de Ramón y Cajal, 24750 La Bañeza (León), España',
      countryCode: 'ESP',
      countryName: 'España',
      stateCode: 'CL',
      state: 'Castilla y León',
      county: 'León',
      city: 'La Bañeza',
      street: 'Calle de Ramón y Cajal',
      postalCode: '24750'
    },
    position: {
      lat: 42.29729,
      lng: -5.90294
    },
    mapView: {
      west: -5.90409,
      south: 42.29693,
      east: -5.90185,
      north: 42.29778
    },
    scoring: {
      queryScore: 0.9,
      fieldScore: {
        state: 0.75,
        streets: [0.67]
      }
    }
  },
  {
    title: 'Calle de Don Ramón de la Cruz, 28001 Madrid (Madrid), España',
    id: 'here:af:street:o1eUvkG1iU5ZGQo1HN.LuA',
    resultType: 'street',
    address: {
      label: 'Calle de Don Ramón de la Cruz, 28001 Madrid (Madrid), España',
      countryCode: 'ESP',
      countryName: 'España',
      stateCode: 'MD',
      state: 'Comunidad de Madrid',
      county: 'Madrid',
      city: 'Madrid',
      street: 'Calle de Don Ramón de la Cruz',
      postalCode: '28001'
    },
    position: {
      lat: 40.42882,
      lng: -3.67817
    },
    mapView: {
      west: -3.68712,
      south: 40.42825,
      east: -3.66923,
      north: 40.42927
    },
    scoring: {
      queryScore: 0.8,
      fieldScore: {
        streets: [0.61]
      }
    }
  }
]

export const qualifiedQuery = {
  query: '&qq=postalCode=SomeZipCode;houseNumber=SomeHouseNumber&q=SomeStreet'
}
