"use client";

import * as Tabs from '@radix-ui/react-tabs';
import { Mail, Lock, User } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const AuthForm = () => {
    return (
        <div>
            <div>
                <Tabs.Root defaultValue='login'>
                    <Tabs.List aria-label='Login or Sign Up'>
                        <Tabs.Trigger value='login'>
                            Log In
                        </Tabs.Trigger>
                        <Tabs.Trigger value='signup'>
                            Sign Up
                        </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value='login'>
                        <LoginForm />
                    </Tabs.Content>

                    <Tabs.Content value='signup'>
                        <SignupForm />
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    )
}

const LoginForm = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier, password})
            })

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || 'login failed!');
                return;
            }

            router.push("/userDashboard");
        }catch(error) {
            console.log("login error:", error);
            alert("something went wrong!");
        }
        setIdentifier('');
        setPassword('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Mail />
                <input type="text" placeholder='Email/Username' value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
            </div>
            <div>
                <Lock />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} name="" id="" required />
            </div>
            <button type='submit'>
                CONTINUE
            </button>
           {/* <div>
                <a href="#">Sign in with Google</a>
            </div>*/}
        </form>
    );
};

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password

            })
        });
        if (!response.ok) {
            const error = await response.json();
            alert(error.error);
            return;
        }
        const data = await response.json();
        alert(`signup successful: ${data.user.username}`);
        setEmail('');
        setUsername('');
        setPassword('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <User />
                <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>

            <div>
                <Mail />
                <input type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div>
                <Lock />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type='submit'>
                CREATE ACCOUNT
            </button>

            <div>
                <p>Already have an account? <span>Log In</span></p>
            </div>
        </form>
    )
}