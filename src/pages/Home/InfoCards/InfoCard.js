import React from 'react';

const InfoCard = ({ card }) => {
    const { id, name, discription, icon, bgClass } = card;
    return (
        <div className={`card p-5 m-3 text-white md:card-side shadow-xl ${bgClass}`}>
            <figure><img src={icon} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{discription}</p>
            </div>
        </div>
    );
};

export default InfoCard;