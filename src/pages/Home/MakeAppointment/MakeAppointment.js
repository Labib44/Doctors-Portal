import React from 'react';
import appointment from '../../../assets/images/appointment.png'
import doctor from '../../../assets/images/doctor.png'

const MakeAppointment = () => {
    return (
        <section>

            <div className="hero mt-20 ">
                <img src={appointment} style={{height:'550px'}} alt="" className='w-full'/>
                <div className="hero-content flex-col lg:flex-row">
                    <img src={doctor} className="w-1/2 -mt-40 rounded-lg hidden md:block" alt='' />
                    <div className='m-5'>
                        <h1 className='py-5 text-primary font-bold text-2xl'>Appointment</h1>
                        <h1 className="text-5xl font-bold text-white">Make an appointment Today</h1>
                        <p className="py-3 text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary">Get Started</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppointment;