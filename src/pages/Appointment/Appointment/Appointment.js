import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvilbleAppointment from '../AvailableAppointment/AvilbleAppointment';

const Appointment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div>
            <AppointmentBanner
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            ></AppointmentBanner>
            <AvilbleAppointment
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            ></AvilbleAppointment>
        </div>
    );
};

export default Appointment;