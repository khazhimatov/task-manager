import disableScroll from 'disable-scroll'
import React, { FC, PropsWithChildren, ReactNode, ReactPortal, useCallback, useState }
  from 'react'
import { createPortal } from 'react-dom'

import styles from './modal.module.sass'

export type ModalPropsType = PropsWithChildren<{
  isOpen?: boolean,
  close: () => void,
  elementId?: string
}>

const Modal = ({ children, isOpen = false, close, elementId = 'root' }: ModalPropsType)
: ReactPortal | null => {
  if (isOpen === false) {
    return null
  }
  return createPortal(
    <div className={styles.wrapper}>
      <div onClick={close} className={styles.mask}/>
      <div className={styles.container}>
        <div className={styles.close} onClick={close}>&times;</div>
        {children}
      </div>
    </div>,
    document.getElementById(elementId)!)
}

export type optionsType = {
  preventScroll?: boolean
  onClose: () => void
}

export type useModalReturnType = {
  Modal: FC<{children: ReactNode}>,
  openModal: () => void,
  closeModal: () => void,
  isOpenModal: boolean,
}

const useModal = (elementId = 'root', options: optionsType = {
  onClose: () => {},
}): useModalReturnType => {

  const { preventScroll = false } = options
  const [isOpen, setOpen] = useState(false)

  const open = useCallback(() => {
    setOpen(true)
    if (preventScroll) {
      disableScroll.on()
    }
  }, [setOpen, preventScroll])

  const close = useCallback(() => {
    options.onClose()
    setOpen(false)
    if (preventScroll) {
      disableScroll.off()
    }
  }, [setOpen, preventScroll])

  const ModalWrapper = useCallback(({ children }) =>
    <Modal isOpen={isOpen} close={close} elementId={elementId}>
      {children}
    </Modal>
  , [isOpen, close, elementId])

  return { Modal: ModalWrapper, openModal: open, closeModal: close, isOpenModal: isOpen }
}

export default useModal
