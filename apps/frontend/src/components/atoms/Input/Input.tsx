import * as React from 'react';
import { IconNames } from '../Icon/icon.type';
import { Icon } from '../Icon/Icon';
import { cn } from 'apps/frontend/lib';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  iconName?: IconNames;
  iconPosition?: 'start' | 'end';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      iconName,
      placeholder,
      iconPosition = 'start',
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative flex items-center ">
        {iconName && (
          <div
            className={`absolute ${
              iconPosition === 'end' ? 'right-0' : 'left-0'
            } bottom-1 h-full px-3 py-2 flex items-center`}
          >
            <Icon icon={iconName} size="sm" className="h-4 w-4" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-10 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 z-0',
            iconName ? (iconPosition === 'end' ? 'pl-10' : 'pr-10') : '',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
