import React from 'react';
import './Card.scss';

export default ({ className, sectionName, items }) => {
    return (
        <div className={className}>
            <div className="section-title">
                <span>{sectionName}</span>
            </div>
            {items}
        </div>
    )
}