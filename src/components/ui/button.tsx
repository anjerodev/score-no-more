import { type VariantProps, cva } from 'class-variance-authority'
import { ComponentProps } from 'preact'

import { cn } from '@/lib/utils/tailwind'

const buttonVariants = cva(
  [
    "relative z-0 inline-flex items-center justify-center shrink-0 cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,color,box-shadow,transform] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    'before:absolute before:inset-0 before:rounded-md before:transition-opacity before:opacity-0 before:z-[-1] hover:before:opacity-100 before:bg-current/8 before:pointer-events-none',
    'active:scale-95',
  ],
  {
    variants: {
      variant: {
        default:
          'bg-foreground text-background border border-foreground inset-ring inset-ring-background/10',
        accent: 'bg-primary text-primary-foreground',
        destructive:
          'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline:
          'border text-foreground border-input-border bg-input shadow-xs',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'bg-transparent',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {}

const Button = ({
  className,
  variant,
  size,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
Button.displayName = 'Button'

export { Button, buttonVariants }
