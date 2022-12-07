import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheckOut from './CheckOut';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
    const booking = useLoaderData();
    // const navigation=useNavigation();
    // console.log('booking payment data', booking);
    const { treatment, appointmentDate, slot, price } = booking;
    // if(navigation.state === 'loading'){
    //     return <progress className="progress w-56"></progress>
    // }
    return (
        <div>
            <h2 className='text-4xl'>Payment For {treatment}</h2>
            <p className='text-xl'>Please pay <strong>$ {price} </strong> for your appointment on {appointmentDate} at {slot}</p>
            <div className='w-96 my-10'>
                <Elements stripe={stripePromise}>
                <CheckOut 
                booking={booking}
                ></CheckOut>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;