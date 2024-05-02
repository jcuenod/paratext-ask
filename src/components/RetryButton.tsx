import { rotateRightIcon } from "./Icons"

type RetryButtonProps = {
	isBusy: boolean
	onClick: () => void
}
export const RetryButton = ({ isBusy, onClick }: RetryButtonProps) => (
	<button
		className={`
            text-gray-500 p-1
            active:text-blue-800
            active:rotate-90 transition-transform duration-70
            hover:text-blue-700
            disabled:text-gray-300 disabled:transform-none
        `}
		disabled={isBusy}
		onClick={onClick}
	>
		{rotateRightIcon}
	</button>
)
