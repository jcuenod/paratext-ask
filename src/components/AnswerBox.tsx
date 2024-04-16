import { useEffect, useState } from 'react';
import { Question } from '../util/QAManager';
import { DirectionButton } from './DirectionButton';
import { RetryButton } from './RetryButton';
import { ThumbsUpButton } from './ThumbsUpButton';
import { RenderedMarkdown } from './RenderedMarkdown';

type AnswerBoxProps = {
    className?: string
    question: Question | undefined
    thumbsUp: (answerId: number, value: boolean) => void
    retryAnswer: (callback?: Function) => void
}
export const AnswerBox = ({ question, thumbsUp, retryAnswer, ...props }: AnswerBoxProps) => {
    const answers = question?.answers
    const [answerIndex, setAnswerIndex] = useState<number>(0)
    const [isBusy, setIsBusy] = useState<boolean>(false)

    useEffect(() => {
        setAnswerIndex((answers?.length || 1) - 1)
    }, [question?.id])

    const giveThumbsUp = () => {
        if (!answers?.[answerIndex]?.id) {
            console.error('No answer id found')
            return
        }
        const answerId = answers?.[answerIndex]?.id
        thumbsUp(answerId, answers?.[answerIndex]?.thumbs_up ? false : true)
    }

    const doRetryAnswer = () => {
        setIsBusy(true)
        retryAnswer(() => {
            setAnswerIndex(answerIndex + 1)
            setIsBusy(false)
        })
    }

    return (
        <div className="flex rounded-lg mt-2 p-6 text-left w-[48rem] border border-gray-300 shadow-lg relative" style={{ background: 'rgba(255, 255, 255, 0.6)' }} {...props}>
            <div className='markdown-container pb-6'>
                <RenderedMarkdown text={answers?.[answerIndex]?.text || ''} />
                <DirectionButton direction='left' onClick={() => setAnswerIndex(answerIndex - 1)} show={answerIndex > 0} />
                <DirectionButton direction='right' onClick={() => setAnswerIndex(answerIndex + 1)} show={answerIndex < (answers?.length || 1) - 1} />
                <div className='absolute bottom-0 right-0 p-2'>
                    <RetryButton isBusy={isBusy} doRetryAnswer={doRetryAnswer} />
                    <ThumbsUpButton isThumbsUp={answers?.[answerIndex]?.thumbs_up || false} giveThumbsUp={giveThumbsUp} />
                </div>
            </div>
        </div >
    )
}