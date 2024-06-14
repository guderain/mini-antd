import { CSSProperties, PropsWithChildren, ReactNode } from "react"
import { useState ,useRef,useMemo} from 'react'
import {
  useInteractions,
  useFloating,
  useClick,
  useDismiss,
  offset,
  arrow,
  FloatingArrow,
  flip,
  useHover
} from '@floating-ui/react';
import './index.css'
/*Portal 能将子节点渲染到父组件以外的 DOM 节点上*/ 
import { createPortal } from "react-dom";

type Alignment = 'start' | 'end';
type Side = 'top' | 'right' | 'bottom' | 'left';
type AlignedPlacement = `${Side}-${Alignment}`;

interface PopoverProps extends PropsWithChildren {
    content: ReactNode,
    trigger?: 'hover' | 'click'
    placement?: Side | AlignedPlacement,
    open?: boolean,
    onOpenChange?: (open: boolean) => void,
    className?: string;
    style?: CSSProperties
}

function Popover(props: PopoverProps) {
    const {
        open,
        onOpenChange,
        content,
        children,
        trigger = 'hover',
        placement = 'bottom',
        className,
        style
    } = props;
    /*
    浮层使用 position：absolute 相对于 body 定位，但如果中间有个元素也设置了 position: relative 或者 absolute，那样定位就是相对于那个元素了。
    所以，要把浮层用 createPortal 渲染到 body 之下。
    */ 
    const el = useMemo(() => {
        const el = document.createElement('div');
        el.className = `wrapper`;
    
        document.body.appendChild(el);
        return el;
    }, []);
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null);
  
  const {refs,floatingStyles,context} = useFloating({
    open: isOpen,
    onOpenChange: (open)=>{
        setIsOpen(open);
        onOpenChange?.(open);
    },
    placement,
    middleware: [
      offset(20),
      arrow({
        element: arrowRef
      }),
      flip()//边界处理，超出则翻转
    ],
  });
  const interaction = trigger === 'hover' ? useHover(context) : useClick(context);
  const dismiss = useDismiss(context);
 

  const {getReferenceProps, getFloatingProps} = useInteractions([
    interaction,
    dismiss
  ]);
  const floating = isOpen && <div
    className='popover-floating'
    ref={refs.setFloating}
    style={floatingStyles}
    {...getFloatingProps()}
>
    {content}
    <FloatingArrow ref={arrowRef} context={context} fill="#fff" stroke="#000" strokeWidth={1}/>
</div>
  return(
    <>
      <span ref={refs.setReference} {...getReferenceProps()} className={className} style={style}>
        {children}
      </span>
      {createPortal(floating,el)}
    </>
  )
}

export default Popover
