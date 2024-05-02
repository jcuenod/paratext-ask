import { QueryBox } from "./components/QueryBox"
import { useState } from "react"
import { AnswerBox } from "./components/AnswerBox"
import { QAManager, type Question } from "./util/QAManager"

function App() {
	const [question, setQuestion] = useState<Question>()
	const [isBusy, setIsBusy] = useState<boolean>(false)

	const handleSubmit = async (questionText: string) => {
		setIsBusy(true)
		const question = await QAManager.addQuestion(questionText)
		setQuestion(question)
		setIsBusy(false)
	}

	const handleThumbsUp = async (answerId: number, value: boolean = true) => {
		const updatedQuestion = await QAManager.thumbsUpAnswer(answerId, value)
		setQuestion(updatedQuestion)
	}
	const handleRetryAnswer = async () => {
		if (!question?.id) {
			console.error("No question id found")
			return
		}
		setIsBusy(true)
		const questionWithNewAnswer = await QAManager.getNewAnswer(question.id)
		console.log(questionWithNewAnswer)
		setQuestion(questionWithNewAnswer)
		setIsBusy(false)
	}

	return (
		<div className="App">
			<h1 className="font-bold text-center" style={{ fontSize: "4rem" }}>
				Paratext Ask!
			</h1>
			<div className="flex flex-col gap-1 m-2">
				<QueryBox
					onSubmit={handleSubmit}
					isBusy={isBusy}
					currentQuestion={question?.text}
				/>
				{question ? (
					<AnswerBox
						question={question}
						thumbsUp={handleThumbsUp}
						retryAnswer={handleRetryAnswer}
						isBusy={isBusy}
					/>
				) : (
					<div className="flex justify-center">
						<p className="text-gray-500">
							Type a question and click "Ask!" to get a suggestion
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
export default App
