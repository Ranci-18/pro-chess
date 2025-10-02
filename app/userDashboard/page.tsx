"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function page() {
    const router = useRouter();
    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: "POST" });
        router.push("/")
    }
  return (
    <div>
        welcome to your dashbaord
        <button onClick={handleLogout}>logout</button>
    </div>
  )
}
