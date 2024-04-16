import { useEffect, useState } from 'react';
import { marked } from 'marked';
import "github-markdown-css/github-markdown-light.css"

// Sometimes marked returns a promise, but not always
const normalizeMarked = async (textToRender: string) => {
    const m = marked(textToRender)
    if (m instanceof Promise) {
        return await m
    }
    return m
}

type RenderedMarkdownProps = {
    text: string
}
export const RenderedMarkdown = ({ text }: RenderedMarkdownProps) => {
    const [renderedAnswer, setRenderedAnswer] = useState<string>('')

    useEffect(() => {
        normalizeMarked(text).then(setRenderedAnswer)
    }, [text])

    return (
        <div className="markdown-body" style={{ backgroundColor: "transparent" }} dangerouslySetInnerHTML={{ __html: renderedAnswer }} />
    )
}