'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/ui/ToolTip';
import { cn } from '@lib';
import { ReactElement, ReactNode } from 'react';

export type ToolTipPosition = 'bottom' | 'left' | 'right' | 'top';
export const ToolTip = ({
  children,
  tipMessage,
  tipClassName,
  side = 'bottom',
  element,
  ContentClassName,
}: {
  children: ReactElement;
  tipMessage: ReactNode;
  tipClassName?: string;
  side?: ToolTipPosition;
  element?: any;
  ContentClassName?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        {tipMessage ? (
          <TooltipContent side={side} className={ContentClassName}>
            {element ? element : <div className={cn('text-sm', tipClassName)}>{tipMessage}</div>}
          </TooltipContent>
        ) : null}
      </Tooltip>
    </TooltipProvider>
  );
};
