import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // imgbb
    const imgHostKey = process.env.REACT_APP_IMGBB_KEY;
    // console.log(imgHostKey); 
    const navigate=useNavigate()

    const { data: specialtys, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-ten-vert.vercel.app/appointmentSpecialty');
            const data = await res.json();
            return data;
        }
    });

    const handleAddDoctor = (data) => {
        // console.log(data.img[0])
        const img = data.img[0];
        const formData = new FormData();
        
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData);
                if (imgData.success) {
                    // console.log(imgData.data.url);

                    const doctor={
                        name:data.name,
                        email:data.email,
                        specialty:data.specialty,
                        img:imgData.data.url
                    }
                    // save the doctors informetion to the database
                    fetch('https://doctors-portal-server-ten-vert.vercel.app/doctors',{
                        method:'POST',
                        headers:{
                            'content-type':'application/json',
                            authorization:`bearer ${localStorage.getItem('accessToken')}`
                        },
                        body:JSON.stringify(doctor)
                    })
                    .then(res=>res.json())
                    .then(result=>{
                        console.log(result);
                        toast.success(`${data.name} is Added Successfully`)
                        navigate('/dashboard/managedoctors')
                    })
            
                }
            })
    }

    if (isLoading) {
        return <progress className="progress w-56"></progress>
    }
    return (
        <div className=''>
            <div className='w-96'>
                <h1 className='text-center text-2xl font-bold'>Add A Doctors</h1>

                <form onSubmit={handleSubmit(handleAddDoctor)}>
                    <div className="form-control w-full m-3">
                        <label className="label">
                            <span className="label-text">Your Name</span>
                        </label>
                        <input type="name" {...register("name", { required: 'Name is required' })} className="input input-primary input-bordered w-full" />
                        {errors.name && <p role="alert" className='text-red-600'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full m-3">
                        <label className="label">
                            <span className="label-text">Your Email</span>
                        </label>
                        <input type="email" {...register("email", { required: 'Email is required' })} className="input input-primary input-bordered w-full" />
                        {errors.email && <p role="alert" className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full m-3">
                        <label className="label">
                            <span className="label-text">Specialty</span>
                        </label>
                        <select {...register("specialty", { required: 'Specialty is required' })} className="select select-primary select-bordered w-full ">
                            <option disabled selected>Please select a Specialty</option>
                            {
                                specialtys.map(specialty => <option
                                    key={specialty._id}
                                    value={specialty.name}
                                >{specialty.name}</option>)
                            }
                        </select>
                    </div>

                    <div className="form-control w-full m-3">
                        <label className="label">
                            <span className="label-text">Your Email</span>
                        </label>
                        <input type="file" {...register("img", { required: 'Photo is required' })} className="input input-primary input-bordered w-full" />
                        {errors.img && <p role="alert" className='text-red-600'>{errors.img?.message}</p>}
                    </div>

                    <input type="submit" className='btn btn-accent w-full m-3' />

                </form>

            </div>
        </div>
    );
};

export default AddDoctor;