import { cn } from '@/lib/utils'

type DefaultColumnProps = {
    children?: React.ReactNode
    className?: string
}

export const DefaultColumn = ({ children, className }: DefaultColumnProps) => {
    return (
        <p
            className={cn(
                'overflow-hidden text-xs whitespace-nowrap text-ellipsis',
                className
            )}
        >
            {children}
        </p>
    )
}
