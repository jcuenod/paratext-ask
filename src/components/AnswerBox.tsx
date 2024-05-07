import { useEffect, useState } from "react"
import { Question } from "../util/QAManager"
import { DirectionButton } from "./DirectionButton"
import { RetryButton } from "./RetryButton"
import { ThumbsUpButton } from "./ThumbsUpButton"
import { RenderedMarkdown } from "./RenderedMarkdown"

type AnswerBoxProps = {
	className?: string
	question: Question | undefined
	isBusy: boolean
	thumbsUp: (answerId: number, value: boolean) => void
	retryAnswer: () => void
}
export const AnswerBox = ({
	question,
	thumbsUp,
	retryAnswer,
	isBusy,
	...props
}: AnswerBoxProps) => {
	const answers = question?.answers
	const [answerIndex, setAnswerIndex] = useState<number>(0)

	useEffect(() => {
		setAnswerIndex((answers?.length || 1) - 1)
	}, [answers?.length, question?.id])

	const giveThumbsUp = () => {
		if (!answers?.[answerIndex]?.id) {
			console.error("No answer id found")
			return
		}
		const answerId = answers?.[answerIndex]?.id
		thumbsUp(answerId, answers?.[answerIndex]?.thumbs_up ? false : true)
	}

	return (
		<div
			className={
				"flex rounded-lg mt-2 p-6 text-left md:w-[32rem] lg:w-[48rem] border border-gray-300 shadow-lg relative transition-all duration-300" +
				(isBusy ? " blur-sm pointer-events-none" : "")
			}
			style={{ background: "rgba(255, 255, 255, 0.6)" }}
			{...props}
		>
			<div className="markdown-container pb-6">
				<RenderedMarkdown text={answers?.[answerIndex]?.text || ""} />
				<DirectionButton
					direction="left"
					onClick={() => setAnswerIndex(answerIndex - 1)}
					show={answerIndex > 0}
				/>
				<DirectionButton
					direction="right"
					onClick={() => setAnswerIndex(answerIndex + 1)}
					show={answerIndex < (answers?.length || 1) - 1}
				/>
				<div className="absolute bottom-0 right-0 p-2">
					<RetryButton isBusy={isBusy} onClick={retryAnswer} />
					<ThumbsUpButton
						isThumbsUp={answers?.[answerIndex]?.thumbs_up || false}
						giveThumbsUp={giveThumbsUp}
					/>
				</div>
			</div>
		</div>
	)
}
