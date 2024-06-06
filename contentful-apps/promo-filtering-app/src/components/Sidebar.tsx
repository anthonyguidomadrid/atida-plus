import React, { useEffect, useState, useMemo, useCallback } from 'react'

import { Link, PlainClientAPI } from 'contentful-management'
import { Pill, SectionHeading } from '@contentful/forma-36-react-components'
import { SidebarExtensionSDK } from '@contentful/app-sdk'

interface SidebarProps {
  sdk: SidebarExtensionSDK
  cma: PlainClientAPI
}

type EntryLink = Link<'Entry'>

type LocalisedString = { [locale: string]: string }

interface Category {
  id: LocalisedString
}

interface Label {
  id: LocalisedString
  key?: LocalisedString
  labelKey?: LocalisedString
}

const ItemToFilterBy: React.FC<{ item: string }> = ({ item }) => {
  return (
    <Pill
      label={item}
      style={{ marginRight: '.3rem', marginBottom: '.2rem' }}
    />
  )
}

const areListsDifferent = (a: string[], b: string[]): boolean => {
  if (a.length !== b.length) return true
  if (a.filter(item => !b.includes(item)).length) return true
  if (b.filter(item => !a.includes(item)).length) return true

  return false
}

const Sidebar: React.FC<SidebarProps> = ({ sdk, cma }) => {
  //Allowing undefined to know when they haven't been initialised yet
  const [labels, setLabels] = useState<string[] | undefined>(undefined)
  const [categories, setCategories] = useState<string[] | undefined>(undefined)

  const displayCategories = useMemo(() => categories ?? [], [categories])
  const displayLabels = useMemo(() => labels ?? [], [labels])

  const entryId = useMemo(() => sdk.ids.entry, [sdk.ids.entry])

  const updateItemsToFilterBy = useCallback(
    async (items: string[]) => {
      const entry = await cma.entry.get({ entryId: entryId })
      const currentItems = entry.fields['itemsToFilterBy']
        ? entry.fields['itemsToFilterBy'][sdk.locales.default]
        : []

      if (!areListsDifferent(items, currentItems)) return

      entry.fields['itemsToFilterBy'] = {
        [sdk.locales.default]: items
      }
      cma.entry.update({ entryId }, entry).catch(e => console.error(e))
    },
    [entryId, cma.entry, sdk.locales.default]
  )

  useEffect(() => {
    if (categories !== undefined && labels !== undefined) {
      const items = [...labels, ...categories]
      updateItemsToFilterBy(items)
    }
  }, [labels, categories, updateItemsToFilterBy])

  const updateLabels = async (entryLabels: EntryLink[]) => {
    const result: string[] = entryLabels
      ? await Promise.all(
          entryLabels.map(async label => {
            const entry = await cma.entry.get<Label>({ entryId: label.sys.id })
            const entryKey = entry.fields.key
              ? entry.fields.key
              : entry.fields.labelKey
            return entryKey ? entryKey[sdk.locales.default] : ''
          })
        )
      : []
    setLabels(result)
  }

  const updateCategories = async (entryCategories: EntryLink[]) => {
    const result: string[] = entryCategories
      ? await Promise.all(
          entryCategories.map(async category => {
            const entry = await cma.entry.get<Category>({
              entryId: category.sys.id
            })
            return entry.fields.id[sdk.locales.default]
          })
        )
      : []
    setCategories(result)
  }

  useEffect(() => {
    sdk.entry.fields.categories?.onValueChanged(updateCategories)
    sdk.entry.fields.labels?.onValueChanged(updateLabels)
  }, [])

  return (
    <div>
      <SectionHeading style={{ marginBottom: '.3rem' }}>
        Categories ({displayCategories.length})
      </SectionHeading>
      {displayCategories.map((item, index) => (
        <ItemToFilterBy item={item} key={`${item}-${index}`} />
      ))}
      <br />
      <br />
      <SectionHeading style={{ marginBottom: '.3rem' }}>
        Labels ({displayLabels.length})
      </SectionHeading>
      {displayLabels.map((item, index) => (
        <ItemToFilterBy item={item} key={`${item}-${index}`} />
      ))}
    </div>
  )
}

export default Sidebar
