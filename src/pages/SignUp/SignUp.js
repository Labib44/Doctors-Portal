import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../Hooks/useToken';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const [createUserEmail, setCreateUserEmail] = useState('')
    const [token] = useToken(createUserEmail);
    const navigate = useNavigate();
    if (token) {
        navigate('/');
    }

    const handleSignUp = (data) => {
        console.log(data);
        setSignUpError('');

        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('Sign Up seccessfully')
                // update profile
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email);
                    })
                    .catch(error => console.log());
            })
            .catch(error => {
                console.log(error)
                setSignUpError(error.message);
            });
    }

    const saveUser = (name, email) => {
        const user = { name, email }
        fetch('https://doctors-portal-server-ten-vert.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCreateUserEmail(email);
            })
    }



    return (
        <div className='flex justify-center '>
            <div className='w-96'>
                <h1 className='text-center text-2xl font-bold'>Sign Up</h1>

                <form onSubmit={handleSubmit(handleSignUp)}>
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
                            <span className="label-text">Your Password</span>
                        </label>
                        <input type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: 'Password must be 6 charecters long' } })} className="input input-primary input-bordered w-full" />
                        {errors.password && <p role="alert" className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    {signUpError && <p className='text-red-700'>{signUpError}</p>}
                    <input type="submit" className='btn btn-accent w-full m-3' />
                    <p className='p-3'>Already have an account ?<Link to='/login' className='text-primary'>Login</Link></p>
                </form>
                <div className="divider">OR</div>
                <button className="btn btn-outline w-full btn-accent m-3">Sign In with Google</button>
            </div>
        </div>
    );
};

export default SignUp;