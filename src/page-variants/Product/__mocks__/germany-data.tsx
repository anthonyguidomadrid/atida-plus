import { ReactComponent as ContainsAlcohol } from '~assets/svg/navigation-24px/ContainsAlcohol.svg'
import { ReactComponent as Warning } from '~assets/svg/navigation-24px/Warning.svg'
import { ReactComponent as Vegan } from '~assets/svg/navigation-24px/Vegan.svg'
import { ReactComponent as GlutenFree } from '~assets/svg/navigation-24px/GlutenFree.svg'
import { ReactComponent as Organic } from '~assets/svg/navigation-24px/Organic.svg'
import { ReactComponent as Reimport } from '~assets/svg/navigation-24px/ReImport.svg'
import { ReactComponent as Apotekhe } from '~assets/svg/navigation-24px/apotekhe.svg'

const pdpInfoTypeListIcons = {
  Alchohol: <ContainsAlcohol className="icon-24" />,
  Biocide: <Warning className="icon-24" />,
  Vegan: <Vegan className="icon-24" />,
  Gluten: <GlutenFree className="icon-24" />,
  Organic: <Organic className="icon-24" />,
  ReImport: <Reimport className="icon-24" />,
  Apotekhe: <Apotekhe className="icon-24" />
}

// GENERIC LIST
export const pdpInfoTypeListGeneric = [
  {
    type: 'Alchohol',
    icon: pdpInfoTypeListIcons.Alchohol,
    title: 'Alkoholgehalt: 31Vol.-%',
    description: 'Packungsbeilage beachten'
  },
  {
    type: 'Biocide',
    icon: pdpInfoTypeListIcons.Biocide,
    title: 'Biocide product',
    description:
      'Use biocidal products with caution. Always read the label and product information before use. BAuA number: DE-2014-MA-19-00002',
    link: {
      href: '/pdp/biocide-information',
      text: 'Biocide Information (PDP)'
    }
  },
  {
    type: 'Vegan',
    icon: pdpInfoTypeListIcons.Vegan,
    title: 'Vegan product'
  },
  {
    type: 'Gluten',
    icon: pdpInfoTypeListIcons.Gluten,
    title: 'Gluten free product'
  },
  {
    type: 'Organic',
    icon: pdpInfoTypeListIcons.Organic,
    title: 'Organic product',
    description: 'Certification number: DE-2014-0023'
  },
  {
    type: 'Apotekhe',
    icon: pdpInfoTypeListIcons.Apotekhe,
    title: 'Apothekenpflicht'
  }
]

// OTC LIST
export const pdpInfoTypeListOTC = [
  {
    type: 'Apotekhe',
    icon: pdpInfoTypeListIcons.Apotekhe,
    title: 'Apothekenpflicht'
  },
  {
    type: 'Alchohol',
    icon: pdpInfoTypeListIcons.Alchohol,
    title: 'Alkoholgehalt: 31Vol.-%',
    description: 'Packungsbeilage beachten'
  },
  {
    type: 'Vegan',
    icon: pdpInfoTypeListIcons.Vegan,
    title: 'Vegan product'
  },
  {
    type: 'Organic',
    icon: pdpInfoTypeListIcons.Organic,
    title: 'Organic product',
    description: 'Certification number: DE-2014-0023'
  },
  {
    type: 'Gluten',
    icon: pdpInfoTypeListIcons.Gluten,
    title: 'Gluten free product'
  }
]
// NUTRITION LIST
export const pdpInfoTypeListNutrition = [
  {
    type: 'Alchohol',
    icon: pdpInfoTypeListIcons.Alchohol,
    title: 'Alkoholgehalt: 31Vol.-%',
    description: 'Packungsbeilage beachten'
  },
  {
    type: 'Vegan',
    icon: pdpInfoTypeListIcons.Vegan,
    title: 'Vegan product'
  },
  {
    type: 'Organic',
    title: 'Organic product',
    icon: pdpInfoTypeListIcons.Organic,
    description: 'Certification number: DE-2014-0023'
  },
  {
    type: 'Gluten',
    icon: pdpInfoTypeListIcons.Gluten,
    title: 'Gluten free product'
  },
  {
    type: 'ReImport',
    icon: pdpInfoTypeListIcons.ReImport,
    title: 'Re-import product'
  }
]

// FOOD LIST
export const pdpInfoTypeListFood = [
  {
    type: 'Alchohol',
    icon: pdpInfoTypeListIcons.Alchohol,
    title: 'Alkoholgehalt: 31Vol.-%',
    description: 'Packungsbeilage beachten'
  },
  {
    type: 'Vegan',
    icon: pdpInfoTypeListIcons.Vegan,
    title: 'Vegan product'
  },
  {
    type: 'Organic',
    title: 'Organic product',
    icon: pdpInfoTypeListIcons.Organic,
    description: 'Certification number: DE-2014-0023'
  },
  {
    type: 'Gluten',
    icon: pdpInfoTypeListIcons.Gluten,
    title: 'Gluten free product'
  },
  {
    type: 'ReImport',
    icon: pdpInfoTypeListIcons.ReImport,
    title: 'Re-import product'
  }
]

// PET LIST
export const pdpInfoTypeListPet = [
  {
    type: 'Apotekhe',
    icon: pdpInfoTypeListIcons.Apotekhe,
    title: 'Apothekenpflicht'
  },
  {
    type: 'Alchohol',
    icon: pdpInfoTypeListIcons.Alchohol,
    title: 'Alkoholgehalt: 31Vol.-%',
    description: 'Packungsbeilage beachten'
  },
  {
    type: 'Vegan',
    icon: pdpInfoTypeListIcons.Vegan,
    title: 'Vegan product'
  },
  {
    type: 'Organic',

    icon: pdpInfoTypeListIcons.Organic,
    description: 'Certification number: DE-2014-0023'
  },
  {
    type: 'Gluten',
    icon: pdpInfoTypeListIcons.Gluten,
    title: 'Gluten free product'
  },
  {
    type: 'ReImport',
    icon: pdpInfoTypeListIcons.ReImport,
    title: 'Re-import product'
  }
]

// MEDICAL DEVICES LIST
export const pdpInfoTypeListMedicalDevices = [
  {
    type: 'Apotekhe',
    icon: pdpInfoTypeListIcons.Apotekhe,
    title: 'Apothekenpflicht'
  },
  {
    type: 'Alchohol',
    icon: pdpInfoTypeListIcons.Alchohol,
    title: 'Alkoholgehalt: 31Vol.-%',
    description: 'Packungsbeilage beachten'
  },
  {
    type: 'Vegan',
    icon: pdpInfoTypeListIcons.Vegan,
    title: 'Vegan product'
  },
  {
    type: 'Organic',
    icon: pdpInfoTypeListIcons.Organic,
    title: 'Organic product',
    description: 'Certification number: DE-2014-0023'
  },
  {
    type: 'Gluten',
    icon: pdpInfoTypeListIcons.Gluten,
    title: 'Gluten free product'
  },
  {
    type: 'ReImport',
    icon: pdpInfoTypeListIcons.ReImport,
    title: 'Re-import product'
  }
]

export const pdpInfoDetailsData = {
  pzn: '1234567',
  supplier: 'LOreal Deutschland',
  dosage: 'Powder',
  size: '100g',
  brand: {
    code: 'balasense',
    label: 'Balasense'
  }
}

export const certificateButtonsData = [
  {
    type: 'Food declaration (PDF)',
    url: 'https://www.mifarma.es/media/pdfs/PROSPECTOS/NATALBEN_DESARROLLO.pdf'
  },
  {
    type: 'Beipackzettel (PDF)',
    url: 'https://www.mifarma.es/media/pdfs/PROSPECTOS/NATALBEN_DESARROLLO.pdf'
  }
]

export const manufacturerDetailsMock = {
  name: 'Mead Johnson & Company, LLC.',
  address: {
    street: 'Sulzbacher Str. 40-50',
    city: '65824 Schwalbach am Taunus'
  }
}
