'use client';

import { ChangeEvent, useState } from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { cn } from '@lib';
import { IconNames } from '../Icon/icon.type';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/button';
import { Input } from './Input';
import { Label } from '@/components/ui/Label';

export const InputField = ({
  name,
  rules,
  inputClassName,
  label,
  id,
  containerClassName,
  labelClassName,
  errorMessageClassName,
  type = 'text',
  iconName,
  iconPosition = 'end',
  placeholder,
  isDisabled = false,
  readOnly = false,
  isRequired = false,
  isOptional = false,
  onBlur,
  maxLength,
  labelAbove = true,
}: {
  name: string;
  rules?: RegisterOptions;
  inputClassName?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorMessageClassName?: string;
  label?: string;
  id?: string;
  type?: 'text' | 'password' | 'radio' | 'number';
  iconName?: IconNames;
  placeholder?: string;
  isDisabled?: boolean;
  iconPosition?: 'start' | 'end';
  readOnly?: boolean;
  isRequired?: boolean;
  maxLength?: number;
  isOptional?: boolean;
  onBlur?: () => void;
  labelAbove?: boolean;
}) => {
  const { control, formState, clearErrors } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const errorMessage = formState.errors?.[name]?.message as string | undefined;

  return (
    <div className={containerClassName}>
      {labelAbove && label && (
        <Label htmlFor={id} className={cn('block text-sm font-medium mb-1', labelClassName)}>
          {label}
          {isRequired && <span className="pl-1 text-red-700">*</span>}
          {isOptional && <span className="pl-1 text-muted">(optional)</span>}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        disabled={isDisabled}
        render={({ field }) => {
          const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
            clearErrors('root');
            field.onChange(event.target.value);
          };

          return (
            <>
              <div className="relative">
                <Input
                  {...field}
                  id={id}
                  value={field.value ?? ''}
                  maxLength={maxLength}
                  onChange={handleOnChange}
                  onBlur={onBlur}
                  readOnly={readOnly}
                  placeholder={placeholder ?? ''}
                  className={cn(
                    'w-full border rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary',
                    (iconName && iconPosition === 'end') || type === 'password'
                      ? 'pr-10'
                      : iconName && iconPosition === 'start'
                      ? 'pl-10'
                      : '',
                    inputClassName,
                  )}
                  type={showPassword ? 'text' : type}
                />

                {iconName && !(type === 'password' && iconPosition === 'end') && (
                  <div
                    className={`absolute ${
                      iconPosition === 'end' ? 'right-0' : 'left-0'
                    } top-0 h-full px-3 py-2 flex items-center`}
                  >
                    <Icon icon={iconName} size="sm" className="h-4 w-4" />
                  </div>
                )}

                {type === 'password' && (
                  <Button
                    type="button"
                    variant="ghost"
                    icon={showPassword ? 'eyeClosed' : 'eye'}
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 z-20 top-0 h-full px-3 py-2  hover:bg-transparent flex items-center"
                  ></Button>
                )}
              </div>
              {errorMessage && (
                <span className={cn('text-red-500 text-xs mt-1', errorMessageClassName)}>
                  {errorMessage}
                </span>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

