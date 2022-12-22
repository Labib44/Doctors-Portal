import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../Hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { login } = useContext(AuthContext);
    const [loginError, setloginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathName || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = (data) => {
        console.log(data);
        setloginError('');

        login(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email)
                // navigate(from, {replace:true});
            })
            .catch(error => {
                console.log(error.message)
                setloginError(error.message);
            });
    }

    return (
        <div className='flex justify-center '>
            <div className='w-96'>
                <h1 className='text-center text-2xl font-bold'>login</h1>

                <form onSubmit={handleSubmit(handleLogin)}>


                    <div className="form-control w-full m-3">
                        <label className="label">
                            <span className="label-text">Your Email</span>
                        </label>
                        <input type="email" {...register("email", { required: "Email Address is required" })} className="input input-primary input-bordered w-full" />
                        {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full m-3">
                        <label className="label">
                            <span className="label-text">Your Password</span>
                        </label>
                        <input type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: 'Password must be 6 charecters long' } })} className="input input-primary input-bordered w-full" />
                        {errors.password && <p role="alert" className='text-red-600'>{errors.password?.message}</p>}

                        <label className="label">
                            <span className="label-text">Forgot Password</span>
                        </label>
                        <div>
                            {loginError && <p className='text-red-700'>{loginError}</p>}
                        </div>
                    </div>

                    <input type="submit" className='btn btn-accent w-full m-3' />
                    <p className='p-3'>New to Doctor portal ?<Link to='/signup' className='text-primary'>Create an account</Link></p>

                </form>
                <div className="divider">OR</div>
                <button className="btn btn-outline w-full btn-accent m-3">Sign In with Google</button>
            </div>
        </div>
    );
};

export default Login;