import { QueryBox } from "./components/QueryBox"
import { useState } from "react"
import { AnswerBox } from "./components/AnswerBox"
import { ErrorMessage } from "./components/ErrorMessage"
import { QAManager, type Question } from "./util/QAManager"

function App() {
	const [question, setQuestion] = useState<Question>()
	const [isBusy, setIsBusy] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>(
		"Could not connect to server. Please try again later.",
	)
	const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)

	const handleSubmit = async (questionText: string) => {
		try {
			setIsBusy(true)
			const question = await QAManager.addQuestion(questionText)
			setQuestion(question)
		} catch (e) {
			console.error(e)
			setErrorMessage("Could not connect to server. Please try again later.")
			setShowErrorMessage(true)
		} finally {
			setIsBusy(false)
		}
	}

	const handleThumbsUp = async (answerId: number, value: boolean = true) => {
		try {
			const updatedQuestion = await QAManager.thumbsUpAnswer(answerId, value)
			setQuestion(updatedQuestion)
		} catch (e) {
			console.error(e)
			setErrorMessage(
				"Could not upvote answer because of a server issue. Please try again later.",
			)
			setShowErrorMessage(true)
		}
	}
	const handleRetryAnswer = async () => {
		if (!question?.id) {
			console.error("No question id found")
			setErrorMessage(
				"Something went wrong retrieving the question. Please try typing the question in again.",
			)
			setShowErrorMessage(true)
			return
		}

		try {
			setIsBusy(true)
			const questionWithNewAnswer = await QAManager.getNewAnswer(question.id)
			console.log(questionWithNewAnswer)
			setQuestion(questionWithNewAnswer)
		} catch (e) {
			console.error(e)
			setErrorMessage("Could not connect to server. Please try again later.")
			setShowErrorMessage(true)
		} finally {
			setIsBusy(false)
		}
	}

	return (
		<div className="App">
			<h1 className="font-bold text-center md:text-[4rem] text-[3rem]">
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
			<ErrorMessage
				message={errorMessage}
				show={showErrorMessage}
				onDismiss={() => setShowErrorMessage(false)}
			/>
		</div>
	)
}
export default App
