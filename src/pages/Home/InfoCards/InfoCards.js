import React from 'react';
import InfoCard from './InfoCard';
import clock from '../../../assets/icons/clock.svg'
import marker from '../../../assets/icons/marker.svg'
import phone from '../../../assets/icons/phone.svg'

const InfoCards = () => {
   const cardData=[
        {
            id:1,
            name:'Opening Hours',
            discription:'Lorem Ipsum is simply dummy text of the pri',
            icon:clock,
            bgClass:'bg-gradient-to-r from-primary to-secondary'

        },
        {
            id:2,
            name:'Visit our location',
            discription:'Brooklyn, NY 10036, United States',
            icon:marker,
            bgClass:'bg-accent'

        },
        {
            id:3,
            name:'Contact us now',
            discription:'+000 123 456789',
            icon:phone,
            bgClass:'bg-gradient-to-r from-primary to-secondary'

        }
    ];
    return (
        <div className='grid mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                cardData.map(card=> <InfoCard
                key={card.id}
                card={card}
                >

                </InfoCard>)
            }
        </div>
    );
};

export default InfoCards;