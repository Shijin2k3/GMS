import { IconNames } from "@components/atoms/Icon/icon.type";
import { ToolTipPosition } from "@components/atoms/ToolTip/Tooltip";
import { RotateProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { MouseEvent, } from 'react';

export interface IconProps {
    icon: IconNames;
    size?: SizeProp;
    rotate?: RotateProp;
    className?: string;
    bgColor?: string;
    iconColor?: string;
    rounded?: boolean;
    toolTipMessage?: string;
    toolTipPosition?: ToolTipPosition;
    toolTipClassName?: string;
    onClick?: (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => void;
    animation?:
    | 'beat'
    | 'spin'
    | 'beatFade'
    | 'bounce'
    | 'fade'
    | 'flip'
    | 'shake'
    | 'spinPulse';
}