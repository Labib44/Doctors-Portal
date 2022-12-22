import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import Loading from '../../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AvailableAppointmentCard from './AvailableAppointmentCard';

const AvilbleAppointment = ({ selectedDate, setSelectedDate }) => {
    // const [appointmentData, setAppointmentData] = useState([]);
    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, 'PP');

    // react query
    const { data: appointmentData = [], refetch, isLoading } = useQuery({
        queryKey: ['appointmentOptions'],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-ten-vert.vercel.app/appointmentOptions?date=${date}`);
            const data = await res.json();
            return data;
        }
    });
    if (isLoading) {
        return <Loading></Loading>
    }

    // useEffect(() => {
    //     fetch('https://doctors-portal-server-ten-vert.vercel.app/appointmentOptions')
    //         .then(res =>res.json())
    //         .then(data => setAppointmentData(data))
    // }, [])
    return (
        <section>
            <p className='text-center text-secondary font-bold text-xl p-3 mt-10'>You have Selected date: {format(selectedDate, 'PP')}</p>
            <div className='grid mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    appointmentData.map(aptData => <AvailableAppointmentCard
                        key={aptData._id}
                        aptData={aptData}
                        setTreatment={setTreatment}
                    ></AvailableAppointmentCard>)
                }
            </div>
            {treatment &&
                <BookingModal
                    treatment={treatment}
                    setTreatment={setTreatment}
                    selectedDate={selectedDate}
                    refetch={refetch}
                >

                </BookingModal>
            }
        </section>
    );
};

export default AvilbleAppointment;