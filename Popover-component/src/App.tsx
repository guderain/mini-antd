import { useState ,useRef} from 'react'
import {
  useInteractions,
  useFloating,
  useClick,
  useDismiss,
  offset,
  arrow,
  FloatingArrow
} from '@floating-ui/react';
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null);
  
  const {refs,floatingStyles,context} = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top-end',
    middleware: [
      offset(10),
      arrow({
        element: arrowRef
      })
    ],
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
 

  const {getReferenceProps, getFloatingProps} = useInteractions([
    click,
    dismiss
  ]);

  return(
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>hello</button>
      {isOpen && <div className='popover-floating' ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>guderain<FloatingArrow ref={arrowRef} context={context} fill="#fff" stroke="#000" strokeWidth={1}/>  
      </div>}
    </>
  )
}

export default App
