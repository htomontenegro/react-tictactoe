import React from 'react'

export default function Square(props) {
    return (
        <button className="cuadro" onClick={props.onClick}>
            {props.value}
        </button>
    )
}
