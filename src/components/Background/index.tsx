import React, { Fragment, ReactNode } from 'react'
import './Background.css';
interface Props {
    children: ReactNode;
  }
export default function Backgrounds(props: Props) {
  return (
    <div id="bg-wrapper">
        {props.children}
        <div className="background">
            
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
    
  )
}
