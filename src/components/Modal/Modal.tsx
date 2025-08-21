import { useEffect, type ReactNode } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
	children: ReactNode;
	onClose: () => void;
}

const modalRoot = document.body;

const Modal = ({ children, onClose }: ModalProps) => {
	useEffect(() => {
		document.body.style.overflow = "hidden";
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleEsc);
		return () => {
			document.body.style.overflow = "";
			document.removeEventListener("keydown", handleEsc);
		};
	}, [onClose]);

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return createPortal(
		<div
			onClick={handleBackdropClick}
			className={css.backdrop}
			role="dialog"
			aria-modal="true">
			<div className={css.modal}>{children}</div>
		</div>,
		modalRoot
	);
};

export default Modal;
