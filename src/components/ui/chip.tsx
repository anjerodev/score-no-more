import type { ComponentProps } from 'preact'

import { cn } from '@/lib/utils/tailwind'

export interface ChipProps extends ComponentProps<'div'> {
  label?: string
}

const Chip = ({ children, className, label, ...props }: ChipProps) => {
  return (
    <div
      className={cn(
        'text-small border-border text-foreground relative box-border inline-flex h-7 max-w-fit min-w-min shrink-0 items-center justify-between gap-2 rounded-full border-2 bg-transparent px-1 whitespace-nowrap',
        className
      )}
      {...props}
    >
      {label && (
        <span className="flex-1 px-2 pr-1 font-normal text-inherit">
          {label}
        </span>
      )}
      {children}
    </div>
  )
}
Chip.displayName = 'Chip'

export { Chip }
