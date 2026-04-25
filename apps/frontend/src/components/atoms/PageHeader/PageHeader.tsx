'use client';

import React from 'react';
import { Button } from '@/components/atoms/Button/button';
import { IconNames } from '@/components/atoms/Icon/icon.type';

type PageHeaderProps = {
  title: string;
  actionLabel?: string;
  actionIcon?: IconNames;
  onActionClick?: () => void;
  className?: string;
};

export const PageHeader = ({
  title,
  actionLabel,
  actionIcon,
  onActionClick,
  className,
}: PageHeaderProps) => {
  return (
    <div className={`flex items-center justify-between mb-4 mt-4 ${className || ''}`}>
      <h2 className="text-2xl font-bold">{title}</h2>

      {actionLabel && (
        <Button
          label={actionLabel}
          icon={actionIcon}
          onClick={onActionClick}
        />
      )}
    </div>
  );
};