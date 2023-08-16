'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';


export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: '',
        password: '',
        username: ''
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log('success:', response.data)
            router.push('/login');
        } catch (error: any) {
            console.log('Signup failed', error.response.data.error);
            
            toast.error(error.response.data.error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
     }, [user]);


    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-black'>
            <div className='signup'>
                <h1 className='text-3xl pb-4 text-center'>{loading ? 'Processing' : 'Signup'}</h1>
                <hr />
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id='username'
                    value={user.username}
                    onChange={(event) => setUser({ ...user, username: event.target.value })}
                    placeholder='Enter your username...'
                />
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
                <button onClick={onSignUp} className='bg-black text-white mt-2 mx-auto hover:bg-red-500' type='submit'>
                    {buttonDisabled ? 'Sign up' : 'Fields are empty'}
                </button>
                <Link href={'/login'} className='text-center block py-2 underline text-red-700 hover:text-white'>Visit login page</Link>
            </div>
            <Toaster position='top-center' />
        </div>
    )
}