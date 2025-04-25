import type { ComponentProps } from 'preact'

import { cn } from '@/lib/utils/tailwind'

const inputStyle =
  'border-border file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring bg-input flex h-10 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-[box-shadow] file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-4 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'

export interface InputProps extends ComponentProps<'input'> {}

const Input = ({ className, type, ...props }: InputProps) => {
  return <input type={type} className={cn(inputStyle, className)} {...props} />
}
Input.displayName = 'Input'

export { Input, inputStyle }
