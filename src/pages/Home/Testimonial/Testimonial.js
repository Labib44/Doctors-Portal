import React from 'react';
import quote from '../../../assets/icons/quote.svg'
import people1 from '../../../assets/images/people1.png'
import people2 from '../../../assets/images/people2.png'
import people3 from '../../../assets/images/people3.png'
import TestimonialCard from './TestimonialCard';



const Testimonial = () => {
    const testimonialData=[
        {
            id:1,
            name:'Winson Herry',
            review:'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img:people1,
            location:'California'
        },
        {
            id:2,
            name:'Winson Herry',
            review:'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img:people2, 
            location:'California'
        },
        {
            id:3,
            name:'Winson Herry',
            review:'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img:people3,
            location:'California'
        }
    ];
    return (
        <section className='my-16'>
            <div className='flex justify-between'>
                <div>
                    <h4 className='text-lg text-primary font-bold p-3'>Testimonial</h4>
                    <h2 className='text-4xl font-bold p-3'>What Our Patients Says</h2>
                </div>
                <div>
                    <img src={quote} alt="" className='lg:w-48 w-24'/>
                </div>
            </div>

            <div className='grid mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    testimonialData.map(tsmData=> <TestimonialCard
                    key={tsmData.id}
                    tsmData={tsmData}
                    ></TestimonialCard>)
                }
            </div>
        </section>
    );
};

export default Testimonial;