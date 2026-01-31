'use client';

import { Label } from '@components/ui/Label';
import { cn } from 'apps/frontend/lib';
import * as React from 'react';
import { Input } from './Input';
import { forwardRef, InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const FloatingInput = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return <Input ref={ref} {...props} placeholder=" " className={cn('peer', className)} />;
});
FloatingInput.displayName = 'FloatingInput';

interface FloatingLabelExtraProps {
  noFloat?: boolean;
}

const FloatingLabel = forwardRef<
  React.ComponentRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> & FloatingLabelExtraProps
>(({ className, noFloat = false, ...props }, ref) => {
  return (
    <Label
      ref={ref}
      {...props}
      className={cn(
        'absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted',
        'transition-all duration-200 pointer-events-none',
        !noFloat && [
          'peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary',
          'peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs',
        ],
        'bg-background px-1',
        className,
      )}
    />
  );
});
FloatingLabel.displayName = 'FloatingLabel';

type FloatingLabelInputProps = InputProps & {
  label?: string;
  labelClassName?: string;
  noFloat?: boolean;
};

const FloatingLabelInput = forwardRef<
  React.ComponentRef<typeof FloatingInput>,
  React.PropsWithoutRef<FloatingLabelInputProps>
>(({ id, label, labelClassName, noFloat, ...props }, ref) => {
  return (
    <div className="relative">
      <FloatingInput ref={ref} id={id} {...props} />
      {label && (
        <FloatingLabel htmlFor={id} className={labelClassName} noFloat={noFloat}>
          {label}
        </FloatingLabel>
      )}
    </div>
  );
});
FloatingLabelInput.displayName = 'FloatingLabelInput';

export { FloatingInput, FloatingLabel, FloatingLabelInput };
