import { forwardRef,PropsWithChildren } from "react";
import cs from 'classnames'
import './index.scss'
 
type BaseIconProps = {
    className?: string;
    style?: React.CSSProperties;
    size?: string | string[];
    spin?: boolean;
};

/*
Omit<T, K> 表示从类型 T 中排除一些属性 K。
IconProps 包含了 BaseIconProps 中的所有属性，以及 SVG 元素的所有属性（除了 BaseIconProps 中已经定义的属性）。
*/ 
export type IconProps = BaseIconProps & Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>;


export const getSize = (size: IconProps['size']) => {
    // 如果是数组形式，直接假设两个元素分别代表宽高进行返回
    if (Array.isArray(size) && size.length === 2) {
        return size as string[];
    }

    const width = (size as string) || '1em';
    const height = (size as string) || '1em';

    return [width, height];
};

// 创建一个组件时，会考虑到这个组件能接受任何类型的子元素
// PropsWithChildren在组件的props中添加children属性，children表示组件子元素
// forwardRef把svg的ref转发出去以便灵活使用
export const Icon = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>((props,ref)=>{
    const {style,className,spin,size,children,...rest} = props;

    const [width, height] = getSize(size);

    const cn = cs(
        'icon',
        {
            'icon-spin': spin
        },
        className
    )

    return (<svg ref={ref} className={cn} style={style} width={width} height={height} fill="currentColor" {...rest}>{children}</svg>) 
})