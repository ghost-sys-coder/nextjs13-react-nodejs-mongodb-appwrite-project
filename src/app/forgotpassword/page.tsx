"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function ForgotPassword() {
    const router = useRouter();
    const [userPassword, setUserPassword] = useState({
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handlePasswordReset = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/user/forgotpassword', userPassword);
            console.log(response.data)
            toast.success('Password reset successful');
            router.push('/login');
        } catch (error: any) {
            console.log(error.response.data.error);
            toast.error(error.response.data.error)
        } finally {
            setLoading(false);
        }
    }


    return (
        <main>
            <h1 className="text-3xl">{loading ? 'Processing' : "Reset your password"}</h1>
            <form className="max-w-[600px] w-[90%] p-4 my-4" onSubmit={handlePasswordReset}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter new password..."
                    value={userPassword.password}
                    onChange={event => setUserPassword({...userPassword, password: event.target.value})}
                />
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="Confirm password..."
                    value={userPassword.confirmPassword}
                    onChange={event => setUserPassword({...userPassword, confirmPassword: event.target.value})}
                />
                <button className="bg-white text-xl py-1 px-6 rounded-md cursor-pointer font-bold my-3 mx-auto hover:bg-red-700 hover:text-white" type="submit">Reset</button>
            </form>
            <Toaster position="top-center" />
        </main>
    )
}