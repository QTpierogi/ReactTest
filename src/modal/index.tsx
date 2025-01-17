import css from './modal.module.css'
import { createPortal } from 'react-dom'
import { PropsWithChildren } from 'react'

const Modal = (props: PropsWithChildren) => {
    const body = document.getElementsByTagName('body')[0]

    return createPortal(
        <div className={css.shadow}>
            <div className={css.modal}>{props.children}</div>
        </div>,
        body
    )
}

export default Modal