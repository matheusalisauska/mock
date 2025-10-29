"use client";

import { authClient } from "@/lib/auth-client";


export function SignInForm() {
    const signIn = async () => {
        const data = await authClient.signIn.social({
            provider: "github"
        });
    };
    return (
        <button onClick={signIn}> Sign in</button>
    );
}