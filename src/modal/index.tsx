import css from './modal.module.css'
import { createPortal } from 'react-dom'

const Modal = () => {
    const body = document.getElementsByTagName('body')[0]

    return createPortal(
        <div className={css.shadow}>
            <div className={css.modal}>{this.props.children}</div>
        </div>,
        body
    )
}

export default Modal