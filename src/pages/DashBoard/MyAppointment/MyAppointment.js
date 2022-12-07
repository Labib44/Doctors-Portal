import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const MyAppointment = () => {
    const {user}=useContext(AuthContext);
    const url=`https://doctors-portal-server-ten-vert.vercel.app/bookings?email=${user?.email}`;

    const {data:bookings=[] }=useQuery({
        queryKey:['bookings', user?.email],
        queryFn: async()=>{
            const res= await fetch(url,{
                headers:{
                    authorization:`bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data=await res.json();
            return data;
        }
    })
    return (
        <div>
            <h2 className='text-2xl'>My Appointment</h2>

            <div className="overflow-x-auto p-5">
                <table className="table w-full">
            
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                   {
                    bookings.map((booking, i )=> <tr key={user._id}>
                        <th>{i+1}</th>
                        <td>{booking.patient}</td>
                        <td>{booking.treatment}</td>
                        <td>{booking.appointmentDate}</td>
                        <td>{booking.slot}</td>
                        <td>
                            {
                               booking.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}><button className="btn btn-ghost btn-xs">Pay</button></Link> 
                            }
                            {
                                booking.price && booking.paid && <span className='text-primary'>Paid</span>
                            }
                        </td>
                    </tr>)
                   }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;