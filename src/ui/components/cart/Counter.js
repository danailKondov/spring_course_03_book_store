import React from 'react'
import leftArrow from '../img/arrow_left.png'
import rightArrow from '../img/arrow_right.jpg'
import '../css/store.css'

export const Counter = (props) => {
    return (
        <div>
            <img
                className="counter_img"
                src={leftArrow}
                onClick={() => props.onQuantityChangeMinus(props.bookId)}
            />
            {props.children}
            <img
                className="counter_img"
                src={rightArrow}
                onClick={() => props.onQuantityChangePlus(props.bookId)}
            />
        </div>
    )
};