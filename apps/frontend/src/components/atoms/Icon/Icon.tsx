import { IconDefinition, config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToolTip } from '@/atoms/ToolTip/Tooltip';
import { IconNames, IconTypeMap } from './icon.type';
import { IconProps } from '@types';

config.autoAddCss = false;
export function Icon({
  icon,
  className,
  rotate,
  size,
  iconColor,
  bgColor,
  rounded,
  animation,
  onClick,
  toolTipClassName,
  toolTipMessage,
  toolTipPosition,
}: IconProps) {
  const getIcon = (icon: IconNames) => {
    const iconObj = IconTypeMap[icon] as any;
    return iconObj['default'];
  };

  return (
    <ToolTip
      tipMessage={toolTipMessage || ''}
      side={toolTipPosition}
      tipClassName={toolTipClassName}
    >
      <FontAwesomeIcon
        icon={getIcon(icon)}
        size={size}
        rotate={rotate}
        className={className}
        border={false}
        style={{
          color: iconColor,
          background: bgColor,
          borderRadius: rounded ? '50%' : '',
        }}
        onClick={(e) => (onClick ? onClick(e) : null)}
        {...(animation ? { [animation]: true } : {})}
      />
    </ToolTip>
  );
}

