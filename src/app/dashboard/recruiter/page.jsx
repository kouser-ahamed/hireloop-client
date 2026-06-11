"use client";
import React from 'react';
import { useSession } from '@/lib/auth-client';


const RecruiterDashboardHomePage = () => {

    const {data: session, isPending} = useSession();

    if (isPending) {
        return <div>Loading...</div>;
    }

    const user = session?.user;
    console.log('User session data:', user);

    return (
        <div>
            <h2 className="text-3xl">Welcome Back, {user?.name}</h2>
        </div>
    );
};

export default RecruiterDashboardHomePage;