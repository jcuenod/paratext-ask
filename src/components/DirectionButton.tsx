import { arrowLeftIcon, arrowRightIcon } from './Icons'

const baseClasses = 'absolute top-0 bottom-0 flex flex-row items-center active:scale-110 transition-transform duration-75'
const leftSideClasses = baseClasses + ' left-0 ml-[-0.7rem]'
const rightSideClasses = baseClasses + ' right-0 mr-[-0.7rem]'

type DirectionButtonProps = {
    show: boolean
    onClick: () => void
    direction: 'left' | 'right'
}
export const DirectionButton = ({ show, onClick, direction }: DirectionButtonProps) => {
    return (
        <div className={direction === 'left' ? leftSideClasses : rightSideClasses}>
            <button className='hover:text-blue-700' style={{ 'display': show ? 'inherit' : 'none' }}
                onClick={onClick}>
                {direction === 'left' ? arrowLeftIcon : arrowRightIcon}
            </button>
        </div>
    )
}