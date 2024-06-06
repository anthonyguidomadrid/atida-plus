export type ExpertSignatureState = {
  experts?: ExpertSignature[]
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
}

export type ExpertSignature = {
  categories: {
    id: string
    title: string
  }
  image: {
    __typename: 'Asset'
    title: string
    url: string
  }
  name: string
  jobTitle: string
  jobDescription: string
}

export type ExpertSignatureTrigger = {
  categoryId: string
}

export type ExpertSignaturePayload = {
  categories: string
}

export type ExpertSignatures = {
  items: ExpertSignature[] | []
}

export type ExpertSignatureResponse = {
  data: {
    expertSignatureCollection: ExpertSignatures
  }
}
