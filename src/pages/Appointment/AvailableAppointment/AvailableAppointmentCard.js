import React from 'react';

const AvailableAppointmentCard = ({ aptData, setTreatment }) => {
    const { _id, name, price, slots } = aptData;
    return (
        <div>
            <div className="card shadow-xl text-center">
                <div className="card-body ">
                    <h2 className="text-xl font-bold text-secondary">{name}</h2>
                    <p>{slots.length > 0 ? slots[0] : 'Try Another Day'}</p>
                    <p>{slots.length} {slots.length > 1 ? 'Spaces' : 'Space'} Available</p>
                    <p>Price: ${price}</p>
                    <div className="card-actions ">

                        <label onClick={() => setTreatment(aptData)} htmlFor="booking-modal" disabled={slots.length === 0} className="btn btn-primary w-full">Book Appointment</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailableAppointmentCard;