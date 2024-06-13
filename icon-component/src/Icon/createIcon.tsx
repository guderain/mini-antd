import React, { forwardRef } from 'react';
import { Icon, IconProps } from '.';

interface CreateIconOptions {
    content: React.ReactNode;
    iconProps?: IconProps;
    viewBox?: string;
}

export function createIcon(options:CreateIconOptions){
    // viewBox 是 SVG 元素的一个属性，它定义了一个用户坐标系统和宽高比，该系统由四个值组成：min-x, min-y, width 和 height。
    // 控制svg坐标系统的映射，会自动缩放显示完整的svg内容
    const {content,iconProps={},viewBox='0 0 1024 1024'} = options;

    return forwardRef<SVGSVGElement, IconProps>((props,ref)=>{
        return <Icon ref={ref} viewBox={viewBox} {...iconProps} {...props}>{content}</Icon>
    })
}