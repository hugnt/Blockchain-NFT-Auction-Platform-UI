import { Fade, Slide } from '@mui/material';
import React, { Fragment, ReactElement, ReactNode } from 'react'

interface TransitionProps{
    className?:string;
    children: React.ReactElement<any, any>;
    isAppear: boolean| undefined;
    animation?: "fadeMove" | "fadeRight" | undefined;
    direction:  "up" | "left" | "right" | "down" | undefined;
    timeout?:number;
    containerRef?: Element | ((element: Element) => Element) | null | undefined;
}
export default function Transition(props:TransitionProps) {
    let {className,isAppear = false,animation, direction="right", timeout=1000, containerRef} = props;
  return (
      <div className={className}>
        {animation=="fadeMove"&&<Slide in={isAppear} timeout={timeout} container={containerRef} direction={direction}>
            <div>
              <Fade in={isAppear} timeout={timeout} >
                  {props.children}
              </Fade>
            </div>
        </Slide>}
      </div>
    
  )
}
