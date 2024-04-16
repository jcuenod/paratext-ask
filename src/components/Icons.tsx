import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp as fasThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as farThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'

library.add(fasThumbsUp, farThumbsUp, faRotateRight, faCircleChevronLeft, faCircleChevronRight)

const tui = icon({ prefix: 'fas', iconName: 'thumbs-up' })
export const thumbsUpSolidIcon = <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: tui.html }} />
const tur = icon({ prefix: 'far', iconName: 'thumbs-up' })
export const thumbsUpRegularIcon = <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: tur.html }} />
const rri = icon({ prefix: 'fas', iconName: 'rotate-right' })
export const rotateRightIcon = <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: rri.html }} />
const ccl = icon({ prefix: 'fas', iconName: 'circle-chevron-left' })
export const arrowLeftIcon = <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: ccl.html }} />
const ccr = icon({ prefix: 'fas', iconName: 'circle-chevron-right' })
export const arrowRightIcon = <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: ccr.html }} />
