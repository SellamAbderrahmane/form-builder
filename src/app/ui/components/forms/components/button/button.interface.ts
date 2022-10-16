import { TemplateRef } from '@angular/core';

export interface ButtonConfig {
  ghost?: boolean;
  block?: boolean;
  danger?: boolean;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
  shape?: 'circle' | 'round';
  type?: 'primary' | 'dashed' | 'link' | 'text';
  size?: 'large' | 'small' | 'default';
  class?: string;
  onClick?(data?: any): any;
  icon?: {
    class?: string;
    style?: object;

    /**
     * Type of the ant design icon
     */
    type?: string;
    /**
     * 	Type of the ant design icon
     */
    theme?: 'fill' | 'outline' | 'twotone';
    /**
     * 	Rotate icon with animation
     */
    spin?: boolean;
    /**
     * 	Only support the two-tone icon. Specific the primary color.
     */
    twotoneColor?: string;
    /**
     * type of the icon from iconfont
     */
    iconfont?: string;
    /**
     * Rotate degrees
     */
    rotate?: number;
  };
  tooltip?: {
    visible?: boolean;
    tooltipTitle?: any;
    tooltipTrigger?: 'click' | 'focus' | 'hover' | null;
    tooltipPlacement?:
      | 'top'
      | 'left'
      | 'right'
      | 'bottom'
      | 'topLeft'
      | 'topRight'
      | 'bottomLeft'
      | 'bottomRight'
      | 'leftTop'
      | 'leftBottom'
      | 'rightTop'
      | 'rightBottom';
  };
  popconfirm?: {
    visible?: boolean;
    popconfirmTitle?: any;
    popconfirmTrigger?: 'click' | 'focus' | 'hover' | null;
    popconfirmPlacement?:
      | 'top'
      | 'left'
      | 'right'
      | 'bottom'
      | 'topLeft'
      | 'topRight'
      | 'bottomLeft'
      | 'bottomRight'
      | 'leftTop'
      | 'leftBottom'
      | 'rightTop'
      | 'rightBottom';

    cancelText?: string;
    okText?: string;
    okType?: 'primary' | 'ghost' | 'dashed' | 'danger' | 'default';
    condition?: boolean;
    icon?: string | TemplateRef<void>;
    onCancel?: (data: any) => void;
    onConfirm?: (data: any) => void;
  };

  isHide?: (btn: ButtonConfig) => boolean | boolean;
  isDisable?: (btn: ButtonConfig) => boolean | boolean;
}
