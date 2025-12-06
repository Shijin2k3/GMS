import { cn } from "apps/frontend/lib";
import { ButtonProps, Button as ShadCnButton } from "@components/ui/button";
import { IconNames } from "../Icon/icon.type";
import { Icon } from "../Icon/Icon";

export interface ButtonType extends ButtonProps {
  label?: string;
  icon?: IconNames;
  iconPosition?: 'start' | 'end';
  iconClassName?: string;
  contentClassName?: string;
  labelClassName?: string;
    className?: string;
  caption?: string;
  captionClassName?: string;
}

export const Button = ({
  label,
  icon,
  iconPosition = 'start',
  iconClassName,
  className,
  contentClassName,
  labelClassName,
  caption,
  captionClassName,
  ...props
}: ButtonType) => {
  return (
    <ShadCnButton
      className={cn('text-lg font-bold', className)}
      {...props}
    >
      <div
        className={cn(
          'flex items-center text-lg font-bold',
          iconPosition === 'start' ? 'gap-2' : 'gap-2 flex-row-reverse',
          contentClassName
        )}
      >
        {icon && <Icon icon={icon} className={iconClassName} />}
        {label && <span className={labelClassName}>{label}</span>}
        {caption && <span className={captionClassName}>{caption}</span>}
      </div>
    </ShadCnButton>
  );
};
