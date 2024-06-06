import React, { useState } from 'react'
import { PlainClientAPI } from 'contentful-management'
import { Paragraph } from '@contentful/forma-36-react-components'
import { SidebarExtensionSDK } from '@contentful/app-sdk'
import { Button } from '@contentful/forma-36-react-components'
import { useEffect } from 'react'

interface SidebarProps {
  sdk: SidebarExtensionSDK
  cma: PlainClientAPI
}

const Sidebar = (props: SidebarProps) => {
  interface Environment {
    localhost: string
    dev: string
    uat: string
    master: string
  }
  const [environment, setEnvironment] = useState('')
  const [envHost, setEnvHost] = useState('')
  const [secret, setSecret] = useState('')

  useEffect(() => {
    props?.sdk?.ids?.environmentAlias
      ? setEnvironment(props?.sdk?.ids?.environmentAlias)
      : setEnvironment(props?.sdk?.ids?.environment)
  }, [props])

  useEffect(() => {
    const envSecret: Environment = {
      localhost: process.env.REACT_APP_localhost as string,
      dev: process.env.REACT_APP_dev as string,
      uat: process.env.REACT_APP_uat as string,
      master: process.env.REACT_APP_master as string
    }

    const envsHost: Environment = {
      localhost: 'http://localhost:3000',
      dev: 'https://www.dev.atida.com',
      uat: 'https://www.uat.atida.com',
      master: 'https://www.atida.com'
    }

    envSecret.hasOwnProperty(environment)
      ? // @ts-ignore
        setSecret(envSecret[environment])
      : setSecret(envSecret.dev)

    envsHost.hasOwnProperty(environment)
      ? // @ts-ignore
        setEnvHost(envsHost[environment])
      : setEnvHost(envsHost.localhost)
  }, [environment])

  return environment !== '' ? (
    <Paragraph>
      <Button
        buttonType="muted"
        isFullWidth={true}
        href={`${envHost}/api/preview?secret=${secret}&slug=${props.sdk.entry.fields.slug
          .getForLocale('pt-PT')
          .getValue()}&locale=pt-pt`}
        target={'blank'}
      >
        <span style={{ marginRight: '0.25rem' }}>🇵🇹 </span> Preview in
        Portuguese
      </Button>
      <br />
      <br />
      <Button
        buttonType="muted"
        isFullWidth={true}
        href={`${envHost}/api/preview?secret=${secret}&slug=${props.sdk.entry.fields.slug
          .getForLocale('es-ES')
          .getValue()}&locale=es-es`}
        target={'blank'}
      >
        <span style={{ marginRight: '0.25rem' }}>🇪🇸 </span> Preview in Spanish
      </Button>
    </Paragraph>
  ) : null
}

export default Sidebar
