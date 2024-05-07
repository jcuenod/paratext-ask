import { closeIcon } from "./Icons"

type ErrorMessageProps = {
	show: boolean
	message: string
	onDismiss: () => void
}
export const ErrorMessage = ({
	show,
	message,
	onDismiss,
}: ErrorMessageProps) => {
	return (
		<div
			className={
				`fixed w-full bottom-0 left-0 p-3 z-50
                flex items-center justify-center gap-2
                translate-y-full transition-transform duration-300
                text-lg bg-red-500 text-red-100` +
				(show ? " translate-y-0" : "")
			}
		>
			<span>{message}</span>
			{/* dismiss button */}
			<button
				type="button"
				className="inline-flex items-center justify-center h-8 w-8
                hover:text-white hover:bg-red-400 active:scale-90
                rounded transition-transform duration-75"
				data-dismiss-target="#toast-default"
				aria-label="Close"
				onClick={onDismiss}
			>
				{closeIcon}
			</button>
		</div>
	)
}
