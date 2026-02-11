'use client';

import React, { memo, useCallback } from 'react';
import { ToolTip } from '../ToolTip/Tooltip';
import { Button } from './button';
import { cn } from '@lib';
import { Icon } from '../Icon/Icon';

export type ActionButton<T> = {
  type: string;
  iconName: React.ComponentProps<typeof Icon>['icon'];
  tooltip?: string | ((row: T) => string);
  isDisabled?: (row: T) => boolean;
  onAction: (type: string, id: string | number, row: T) => void;
};

export type ActionButtonsProps<T = any> = {
  id: string | number;
  data: T;
  actions: ActionButton<T>[];
  className?: string;
};

const ActionButtons = <T,>({ id, actions, data, className }: ActionButtonsProps<T>) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {actions.map((action, index) => {
        const disabled = action.isDisabled?.(data) ?? false;

        const tooltipMessage =
          typeof action.tooltip === 'function' ? action.tooltip(data) : action.tooltip;

        const handleClick = () => {
          if (!disabled) {
            action.onAction(action.type, id, data);
          }
        };

        return (
          <ToolTip
            key={`${action.type}-${index}`}
            tipMessage={tooltipMessage}
            side="top"
            ContentClassName="bg-gray-900 text-white rounded px-2 py-1 text-xs"
          >
            <Button
              variant="ghost"
              onClick={handleClick}
              disabled={disabled}
              aria-label={action.type}
              className={cn(
                'rounded-full transition-colors',
                disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600',
              )}
            >
              <Icon icon={action.iconName} iconColor="white" className="h-4 w-4" />
            </Button>
          </ToolTip>
        );
      })}
    </div>
  );
};

export default memo(ActionButtons);

