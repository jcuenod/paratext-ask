const ASK_API_URL = import.meta.env?.VITE_API_URL ?? "http://127.0.0.1:5000"

// response for creating a question
// {
//     "answers": [
//         {
//             "id": 22,
//             "text": "The Source Language tools window is no longer available in Paratext 9.",
//             "thumbs_up": false
//         }
//     ],
//     "id": 9,
//     "text": "Where is the Source Language tools window?"
// }

export type Answer = {
	id: number
	text: string
	thumbs_up: boolean
}

export type Question = {
	id: number
	text: string
	answers: Answer[]
}

const getQuestion = async (questionId: number) => {
	const response = await fetch(`${ASK_API_URL}/questions/${questionId}`)
	const data = await response.json()
	return data
}

const createQuestion = async (question: string) => {
	const response = await fetch(`${ASK_API_URL}/questions`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ text: question }),
	})
	const data = await response.json()
	return data
}

const retryAnswer = async (questionId: number) => {
	const response = await fetch(
		`${ASK_API_URL}/questions/${questionId}/answers/new`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
		}
	)
	const data = await response.json()
	return data
}

const thumbsUpAnswer = async (answerId: number, value: boolean) => {
	const response = await fetch(`${ASK_API_URL}/answers/${answerId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ thumbs_up: value }),
	})
	const data = await response.json()
	const questionId = data.question.id
	// If successful, refetch the question
	return getQuestion(questionId)
}

export const QAManager = new (class {
	private questions: Question[] = []

	public getQuestion(questionId: number) {
		return this.questions.find(q => q.id === questionId)
	}

	public addQuestion(question: string) {
		return new Promise<Question | undefined>((resolve, reject) => {
			createQuestion(question)
				.then(data => {
					this.questions.push(data)
					resolve(data)
				})
				.catch(reject)
		})
	}

	public getNewAnswer(questionId: number) {
		return new Promise<Question | undefined>((resolve, reject) => {
			retryAnswer(questionId)
				.then(data => {
					this.questions.find(q => q.id === questionId)?.answers.push(data)
					resolve(this.questions.find(q => q.id === questionId))
				})
				.catch(reject)
		})
	}

	public thumbsUpAnswer(answerId: number, value: boolean) {
		return new Promise<Question | undefined>((resolve, reject) => {
			thumbsUpAnswer(answerId, value)
				.then(data => {
					const questionId = data.id
					this.questions = [
						...this.questions.filter(q => q.id !== questionId),
						data,
					]
					resolve(data)
				})
				.catch(reject)
		})
	}
})()
