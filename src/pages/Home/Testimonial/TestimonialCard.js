import React from 'react';

const TestimonialCard = ({ tsmData }) => {
    const { name, review, location, img } = tsmData
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                
                <p>{review}</p>
                <div className="flex items-center">
                    <div className="avatar mr-5 my-5">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={img} alt='' />
                        </div>
                    </div>
                    <div>
                        <p className=''>{name}</p>
                        <p className=''>{location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;