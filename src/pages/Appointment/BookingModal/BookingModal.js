import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
    const { name: treatementName, slots, price } = treatment;
    const date = format(selectedDate, 'PP');
    const { user } = useContext(AuthContext);
    // console.log(user.displayName);

    const handleBooking = (event) => {
        event.preventDefault()
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phnNumber = form.phnNumber.value;

        const booking = {
            appointmentDate: date,
            treatment: treatementName,
            slot,
            patient: name,
            email,
            phnNumber,
            price
        }
        // console.log(booking);

        fetch('https://doctors-portal-server-ten-vert.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('Booking Confirmed')
                    refetch();
                }
                else {
                    toast.error('You alredy booked')
                }

            })

    }

    return (
        <div className='p-3'>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{treatementName}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-5 p-5'>
                        <input type="text" disabled value={date} className="input input-bordered input-success w-full " />

                        <select name='slot' className="select select-bordered select-success w-full ">
                            {/* i means id for key */}
                            {
                                slots.map((slot, i) => <option value={(slot)} key={i} selected>{slot}</option>)
                            }
                        </select>

                        <input name='name' type="text" defaultValue={user?.displayName} placeholder="Full name" readOnly className="input input-bordered input-success w-full " />
                        <input name='phnNumber' type="text" placeholder="Phone number" className="input input-bordered input-success w-full " />
                        <input name='email' type="email" defaultValue={user?.email} placeholder="Email" readOnly className="input input-bordered input-success w-full" />
                        <button className="btn btn-active btn-primary w-full">Button</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;