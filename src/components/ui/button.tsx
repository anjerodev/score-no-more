import { type VariantProps, cva } from 'class-variance-authority'
import type { ComponentProps } from 'preact'

import { cn } from '@/lib/utils/tailwind'

const buttonVariants = cva(
  [
    'relative z-0 inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-all focus-visible:ring-3 [&_svg:not([class*="size-"])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    'before:pointer-events-none before:absolute before:inset-0 before:z-[-1] before:rounded-md before:bg-current/20 before:opacity-0 before:transition-opacity hover:before:opacity-50',
    'active:before:opacity-100',
    'disabled:pointer-events-none disabled:inset-ring-muted-foreground/10 disabled:border-muted disabled:bg-muted disabled:text-muted-foreground',
  ],
  {
    variants: {
      variant: {
        default:
          'inset-ring inset-ring-primary-foreground/10 border border-primary bg-primary text-primary-foreground ring-primary/40',
        accent:
          'inset-ring inset-ring-accent-foreground/10 border border-accent bg-accent text-accent-foreground ring-accent/40 ',
        destructive:
          'inset-ring inset-ring-destructive-foreground/10 border border-destructive bg-destructive text-destructive-foreground ring-destructive/40',
        outline:
          'border border-border bg-background text-foreground shadow-xs ring-foreground/15',
        secondary:
          'inset-ring inset-ring-primary-foreground/10 border border-primary/10 bg-primary/10 text-primary ring-primary/15',
        ghost: 'bg-transparent ring-primary/15',
        link: 'text-primary underline-offset-4 ring-primary/15 before:hidden hover:underline disabled:border-transparent disabled:bg-transparent',
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
