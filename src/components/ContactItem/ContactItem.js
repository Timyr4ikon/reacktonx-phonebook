import React from 'react'
import './ContactItem.css'

export default ({el,onDelete}) => {
    return (
        <li id={el.id} className="item">
            <span className="label1">{el.name}</span>
            <span className="label2">{el.number}</span>
            <button onClick={onDelete} className="button">X</button>
        </li>
    )
}
