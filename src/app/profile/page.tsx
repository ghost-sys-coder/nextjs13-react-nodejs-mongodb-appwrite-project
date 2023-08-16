"use client";

import axios from 'axios';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const router = useRouter();
    const [userData, setUserData] = useState(null);

    const onLogout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error: any) {
            console.log(error.response.data.error);
            toast.error(error.response.data.error);
        }
    }

    const getUserDetails = async () => {
        const response = await axios.get('/api/users/me');
        console.log(response.data.data);
        setUserData(response.data.data._id);
    }

    useEffect(() => {
        getUserDetails();
    }, [])

    return (
        <main>
            <h1 className='text-3xl py-3'>Profile</h1>
            <hr />
            <h2 className='text-white py-2 text-2xl cursor-pointer'>
                {userData === null ? 'No User Data' : <Link href={`profile/${userData}`}>userData</Link>}
            </h2>
            <button onClick={onLogout} type="submit" className="py-3 px-6 rounded-md text-white bg-red-700 cursor-pointer hover:bg-red-500">Logout</button>
            <Toaster position='top-center' />
        </main>
    )
}