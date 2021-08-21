import React, { ReactElement, ReactNode, useRef } from 'react'
import useOutsideAlerter from './outsideAlerter'
import './index.scss'

interface IProps {
  children: ReactNode
  hideModal: () => void
  isVisible: boolean
}

const Modal = (props: IProps): ReactElement => {
  const { children, isVisible = false, hideModal } = props

  const isModalVisible = isVisible ? '' : 'modal-display-none'

  const modalContentRef = useRef(null)
  useOutsideAlerter(modalContentRef, hideModal, isVisible)

  return (
    <div id='modal' className={isModalVisible}>
      <div id='modal-content' ref={modalContentRef}>
        {children}
      </div>
    </div>
  )
}

export default Modal
