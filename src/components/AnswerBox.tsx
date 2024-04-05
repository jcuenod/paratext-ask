import { marked } from 'marked';
import { useEffect, useState } from 'react';
import "github-markdown-css/github-markdown-light.css"
import { Question } from '../util/QAManager';

import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp as fasThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as farThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'

library.add(fasThumbsUp, farThumbsUp, faRotateRight, faCircleChevronLeft, faCircleChevronRight)

const tui = icon({ prefix: 'fas', iconName: 'thumbs-up' })
const thumbsUpSolidIcon = <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: tui.html }} />
const tur = icon({ prefix: 'far', iconName: 'thumbs-up' })
const thumbsUpRegularIcon = <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: tur.html }} />
const rri = icon({ prefix: 'fas', iconName: 'rotate-right' })
const rotateRightIcon = <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: rri.html }} />
const ccl = icon({ prefix: 'fas', iconName: 'circle-chevron-left' })
const arrowLeftIcon = <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: ccl.html }} />
const ccr = icon({ prefix: 'fas', iconName: 'circle-chevron-right' })
const arrowRightIcon = <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: ccr.html }} />

// Sometimes marked returns a promise, but not always
const normalizeMarked = async (textToRender: string) => {
    const m = marked(textToRender)
    if (m instanceof Promise) {
        return await m
    }
    return m
}

type AnswerBoxProps = {
    className?: string
    question: Question | undefined
    thumbsUp: (answerId: number, value: boolean) => void
    retryAnswer: (callback?: Function) => void
}
export const AnswerBox = ({ question, thumbsUp, retryAnswer, ...props }: AnswerBoxProps) => {
    const answers = question?.answers
    const [renderedAnswer, setRenderedAnswer] = useState<string>('')
    const [answerIndex, setAnswerIndex] = useState<number>(0)
    const [isBusy, setIsBusy] = useState<boolean>(false)

    useEffect(() => {
        const textToRender = answers?.[answerIndex]?.text || ''
        normalizeMarked(textToRender).then(setRenderedAnswer)
    }, [answers, answerIndex])

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
            <div className='markdown-container'>
                <div className="markdown-body" style={{ backgroundColor: "transparent" }} dangerouslySetInnerHTML={{ __html: renderedAnswer }} />
                <div className='absolute left-0 top-0 bottom-0 flex flex-row items-center ml-[-0.7rem]'>
                    <button className='hover:text-blue-700' style={{ 'display': answerIndex > 0 ? 'inherit' : 'none' }}
                        onClick={() => setAnswerIndex(answerIndex - 1)}>
                        {arrowLeftIcon}
                    </button>
                </div>
                <div className='absolute right-0 top-0 bottom-0 flex flex-row items-center mr-[-0.7rem]'>
                    <button className='hover:text-blue-700' style={{ 'display': answerIndex < (answers?.length || 1) - 1 ? 'inherit' : 'none' }}
                        onClick={() => setAnswerIndex(answerIndex + 1)}>
                        {arrowRightIcon}
                    </button>
                </div>
                <div className='absolute bottom-0 right-0 p-1'>
                    <button
                        className={`
                            text-gray-500 p-1
                            active:text-blue-800
                            active:rotate-90 transition-transform duration-70
                            hover:text-blue-700
                            disabled:text-gray-300 disabled:transform-none
                        `}
                        disabled={isBusy}
                        onClick={doRetryAnswer}
                    >
                        {rotateRightIcon}
                    </button>
                    <button
                        className={`
                            active:scale-110 p-1
                            ${answers?.[answerIndex]?.thumbs_up ? 'text-yellow-500' : 'text-gray-500'}
                            hover:text-blue-700
                        `}
                        onClick={giveThumbsUp}
                    >
                        {answers?.[answerIndex]?.thumbs_up ? thumbsUpSolidIcon : thumbsUpRegularIcon}
                    </button>
                </div>
            </div>
        </div >
    )
}