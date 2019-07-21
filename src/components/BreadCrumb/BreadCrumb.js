import React from 'react';
import './BreadCrumb.scss';

export default ({ name, onBreadCrumbClick }) => {
    return (
        <li className="breadcrumb-item" onClick={onBreadCrumbClick}>
            <a href={'javascript:void(0)'} >{name}</a>
        </li>
    )
}