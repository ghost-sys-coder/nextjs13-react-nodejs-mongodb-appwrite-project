"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function VerifyUser() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const handleEmailCheck = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            setLoading(true);
            const response = await axios.post('/api/users/usercheck', email,
                {
                method: "post",
                headers: {
                    "Content-Type" : "application/json"
                }
                }
            );
            console.log("Success", response.data);
            toast.success(response.data);
            router.push('/forgotpassword');
        } catch (error: any) {
            console.log(error.response.data.error);
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <main>
            <h1 className="text-2xl font-bold">{loading ? "Processing Email" : "Provide Email"}</h1>
            <form className="w-[90%] max-w-[600px] p-3 my-3 rounded-md" onSubmit={handleEmailCheck}>
                <label htmlFor="email">Provide Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <button className='bg-white text-black mt-2 mx-auto hover:bg-red-500 hover:text-white' type="submit">Submit</button>
            </form>
            <Toaster position="top-center" />
        </main>
    )
}