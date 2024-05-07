import { useState } from "react"
import { Spinner } from "./Spinner"

type QueryBoxProps = {
	className?: string
	onSubmit: (query: string) => void
	isBusy?: boolean
	currentQuestion?: string
}
export const QueryBox = ({
	className,
	onSubmit,
	currentQuestion,
	isBusy,
	...props
}: QueryBoxProps) => {
	const [inputValue, setInputValue] = useState<string>("")

	let buttonContent: string | JSX.Element = "Ask!"
	if (isBusy) {
		buttonContent = <Spinner />
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				const inputText = inputValue
				if (inputText) {
					onSubmit(inputText)
				}
			}}
		>
			<div className="flex md:min-w-[30rem] min-w-[20rem]">
				<input
					className={`
                        border border-gray-300 rounded-l-lg outline-none
                        active:border-blue-500
                        focus:border-blue-500
                        py-2 px-4 w-full ${className}
                    `}
					onChange={event => setInputValue(event.target.value)}
					{...props}
				/>
				<button
					type="submit"
					disabled={isBusy || !inputValue || inputValue === currentQuestion}
					className={`
                        font-bold py-2 px-4 rounded-r-lg
                        bg-blue-500 text-white 
                        hover:bg-blue-700
                        active:bg-blue-800
                        disabled:bg-blue-500 disabled:opacity-70
                        min-w-20
                        flex items-center justify-center
                    `}
				>
					{buttonContent}
				</button>
			</div>
		</form>
	)
}
