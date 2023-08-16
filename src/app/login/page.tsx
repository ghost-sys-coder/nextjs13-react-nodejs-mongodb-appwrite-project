'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


export default function LoginPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false);
        }
    }, [user])

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log('Success:', response.data);
            toast.success("Login success");
            router.push('/profile')
        } catch (error: any) {
            console.log('Login failed:', error.response.data.error);
            toast.error(error.response.data.error)
        } finally {
            setLoading(false);
        }
    };

    return (
<div className='flex flex-col items-center justify-center min-h-screen py-2 bg-black'>
            <div className='signup'>
                <h1 className='text-3xl pb-4 text-center'>{loading ? 'Processing' : 'Login'}</h1>
                <hr />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={(event) => setUser({ ...user, email: event.target.value })}
                    placeholder='Enter your email...'
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={(event) => setUser({ ...user, password: event.target.value })}
                    placeholder='Enter your password...'
                />
                <button onClick={onLogin} className='bg-black text-white mt-2 mx-auto hover:bg-red-500' type='submit'>
                    {buttonDisabled ? 'Login' : 'Empty fields'}
                </button>
                <Link className='py-2 bg-white rounded-sm text-black cursor-pointer px-2 text-center my-2 mx-auto block' href={'/usercheck'}>Forgot password? <span className='text-red-700'>Click here</span></Link>
                <Link href={'/signup'} className='text-center block py-2 underline text-red-700 hover:text-white'>Visit Signup page</Link>
            </div>
            <Toaster position='top-center' />
        </div>
    )
}