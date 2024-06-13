import React from 'react';
import './index.scss'
import classNames from 'classnames';
import { ConfigContext } from './ConfigProvider';

export type SizeType = 'small' | 'middle' | 'large' | number | undefined;

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    style?: React.CSSProperties;
    size?: SizeType | [SizeType, SizeType];
    direction?: 'horizontal' | 'vertical';
    align?: 'start' | 'end' | 'center' | 'baseline';
    split?: React.ReactNode;
    wrap?: boolean;
}

const spaceSize = {
    small: 8,
    middle: 16,
    large: 24,
}
function getNumberSize(size: SizeType) {
    return typeof size === 'string' ? spaceSize[size] : size || 0;
}

   /*
        <Space direction='horizontal' align='end'>
            <div>111</div>
            <div>222</div>
            <div>333</div>
        </Space>  
        渲染后的结构应为如下
        <div class="space space-horizontal space-align-end">
            <div class="space-item">
                <div>111</div>
            </div>
           <div class="space-item">
                <div>222</div>
            </div>
            <div class="space-item">
                <div>333</div>
            </div>
        </div>
    */ 
const Space: React.FC<SpaceProps> = props => {
    const { space } = React.useContext(ConfigContext);
    const {
      className,
      style,
      children,
      size = space?.size||'small',
      direction = 'horizontal',
      align,
      split,
      wrap = false,
      ...otherProps
    } = props;

    // 存子元素的数组扁平化处理为的一维数组
    const childNodes = React.Children.toArray(props.children);

    // 根据direction与align的值进行CSS类名处理 添加到Space组件上
    const mergedAlign = direction === 'horizontal' && align === undefined ? 'center' : align;
    // 字符串直接添加，对象则检查value(非null/undefined/false/0/''/NaN),true则添加到结果字符串，className会直接添加到结果字符串中
    const cn = classNames(
        'space',
        `space-${direction}`,
        {
            [`space-align-${mergedAlign}`]: mergedAlign,
        },
        className,
    );

    // 添加key与类名为遍历渲染准备，添加到被包裹的每项的外侧div(space-item)上
    const nodes = childNodes.map((child: any, i) => {

        const key = child && child.key || `space-item-${i}`;
    
        return <>
                <div className='space-item' key={key}>
                    {child}
                </div>
                {i < childNodes.length && split && (
                    <span className={`${className}-split`} style={style}>
                        {split}
                    </span>
                )}
            </>
    });
    
    const otherStyles: React.CSSProperties = {};
    // 计算horizontalSize和verticalSize的值来控制列和行的缝隙
    const [horizontalSize, verticalSize] = React.useMemo(
        () =>
        // size可能只传一个值，当size是一个单独的值时，确保处理为数组同时拥有相同的水平和垂直尺寸。
        ((Array.isArray(size) ? size : [size, size]) as [SizeType, SizeType]).map(item =>
            getNumberSize(item),
        ),
        [size]
    );

    otherStyles.columnGap = horizontalSize;
    otherStyles.rowGap = verticalSize;

    if (wrap) {
        otherStyles.flexWrap = 'wrap';
    }
  
    return <div
      className={cn}
      style={{
        ...otherStyles,
        ...style
      }}
      {...otherProps}
    >{nodes}</div>
};
  
export default Space;
  