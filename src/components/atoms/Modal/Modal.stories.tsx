import { Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Modal, ModalProps, useModalState } from '.'

export default {
  component: Modal,
  title: 'atoms/Modal',
  args: {
    isVisible: false,
    body: ''
  },
  argTypes: {
    setIsVisible: {
      control: {
        disable: true
      }
    }
  }
}

type ModalPropsWithoutVisibility = Omit<
  ModalProps,
  'isVisible' | 'setIsVisible'
>

const Template = (args: ModalPropsWithoutVisibility) => {
  const [isModalVisible, setIsModalVisible] = useModalState()

  return (
    <Modal
      isVisible={isModalVisible}
      setIsVisible={setIsModalVisible}
      {...args}
    />
  )
}

export const withHeaderText: Story<ModalPropsWithoutVisibility> = Template.bind(
  {}
)
withHeaderText.args = {
  headerText: 'Hello World',
  headerTextStyle: 'text-xl'
}

export const withBody: Story<ModalPropsWithoutVisibility> = Template.bind({})
withBody.args = {
  headerText: 'Hello World',
  headerTextStyle: 'text-xl',
  body: 'HELLO WORLD!!!!'
}

export const noHeaderJustBody: Story<ModalPropsWithoutVisibility> = Template.bind(
  {}
)
noHeaderJustBody.args = {
  body: 'Hello World!'
}

export const rightAlignedFullHeight: Story<ModalPropsWithoutVisibility> = Template.bind(
  {}
)
rightAlignedFullHeight.args = {
  modalStyle: 'absolute right-0 h-full w-1/3',
  headerText: 'Right-aligned!',
  body: 'WOOOHOOOO'
}

export const stylyzedModal: Story<ModalPropsWithoutVisibility> = Template.bind(
  {}
)
stylyzedModal.args = {
  modalStyle: 'rounded-xl',
  headerText: 'Curvy!',
  body: 'Lorem ipsum dolor sit amet...'
}
