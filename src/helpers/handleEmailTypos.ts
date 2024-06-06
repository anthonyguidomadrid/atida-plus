import {
  emailDomainNameTypos,
  emailTopLevelDomainTypos
} from '~components/organisms/CreateAccountForm/emailTypos'

export const removeEmailTypos = (
  email: string | undefined
): string | undefined => {
  const emailName = email && email.includes('@') && email.split('@')[0]
  const emailDomains =
    email && email.includes('@') && email.split('@')[1].split('.')
  let hasTypos = false
  if (emailDomains) {
    emailTopLevelDomainTypos.find(dom => {
      if (emailDomains.at(-1)?.includes(dom.typo)) {
        hasTypos = true
        emailDomains[emailDomains.length - 1] = dom.suggestion
      }
    })
    emailDomainNameTypos.map(dom =>
      emailDomains?.map((subdomain, index) => {
        if (subdomain === dom.typo) {
          hasTypos = true
          emailDomains[index] = dom.suggestion
        }
      })
    )
    return hasTypos ? emailName + '@' + emailDomains.join('.') : undefined
  }
  return undefined
}
