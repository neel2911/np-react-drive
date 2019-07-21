import React from 'react';
import './Button.scss';

export default ({ onButtonClick, buttonText }) => {
    return (
        <button type="button" className="google-button" onClick={onButtonClick}>
            <span className="google-button-text">{buttonText}</span>
        </button>
    )
}