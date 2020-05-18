import React from 'react'
import './AddForm.css'
import PropTypes from 'prop-types'; // ES6

export  const AddForm = ({nameValue,numberValue,onChange,onSubmit}) => {
    return (
        <form onSubmit={onSubmit} className="form">
            <span className="span">Name</span>
            <input className="input" type="text"  value={nameValue} name="addFormName" onChange={onChange} required/> 
            <span  className="span">Number</span>
            <input type="number" className="input"  value={numberValue} name="number" onChange={onChange} required/>
            <button className="btn" type="submit">a:d:d</button> 
        </form>
    )
}

AddForm.propTypes ={
    nameValue : PropTypes.string.isRequired,
    numberValue : PropTypes.string.isRequired,
    onChange : PropTypes.func.isRequired,
    onSubmit : PropTypes.func.isRequired,
}



