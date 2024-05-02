import { thumbsUpRegularIcon, thumbsUpSolidIcon } from "./Icons"

type ThumbsUpButtonProps = {
	isThumbsUp: boolean
	giveThumbsUp: () => void
}
export const ThumbsUpButton = ({
	isThumbsUp,
	giveThumbsUp,
}: ThumbsUpButtonProps) => (
	<button
		className={`
            active:scale-110 active:-rotate-12 transition-transform duration-75 p-1
            ${isThumbsUp ? "text-yellow-500" : "text-gray-500"}
            hover:text-blue-700
        `}
		onClick={giveThumbsUp}
	>
		{isThumbsUp ? thumbsUpSolidIcon : thumbsUpRegularIcon}
	</button>
)
