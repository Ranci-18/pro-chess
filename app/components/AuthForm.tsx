"use client";

import * as Tabs from '@radix-ui/react-tabs';
import { Mail, Lock, User } from 'lucide-react';

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
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Mail />
                <input type="text" placeholder='Email/Username' required />
            </div>
            <div>
                <Lock />
                <input type="password" placeholder="Password" name="" id="" required />
            </div>
            <button type='submit'>
                CONTINUE
            </button>
            <div>
                <a href="#">Sign in with Google</a>
            </div>
        </form>
    );
};

const SignupForm = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <User />
                <input type="text" placeholder='Username' required />
            </div>

            <div>
                <Mail />
                <input type="email" placeholder='Email Address' required />
            </div>

            <div>
                <Lock />
                <input type="password" placeholder='Password' required />
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