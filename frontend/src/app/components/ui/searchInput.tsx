import * as React from 'react'

import { cn } from '@lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md bg-zinc-800 px-3 py-2 ring-offset-black file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 border-0 focus:border-0 focus:outline-none text-zinc-400'
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
