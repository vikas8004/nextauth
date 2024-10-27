"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignUp = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const onSignup = async () => {
        try {
            setLoading(true);
            const res = await axios.post("/api/signup", user);
            console.log(res.data);
            toast.success('User created successfully.')
            router.push("/login")
        } catch (error: any) {
            console.log("sign up failed", error.message);
            toast.error(error.message,{
                position:"top-right",
                duration:3000
            })

        }
        finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="font-bold mb-4 tracking-widest text-3xl">{loading ? "processing.." : "Signup"}</h1>

            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="username"
                    />

                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="email" />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="password" id="password" name="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="password" />
                </div>
                <div>
                    <button onClick={onSignup}
                        type="button"
                        className="border border-black  cursor-pointer"
                        disabled={buttonDisabled}
                    >Sign Up</button>
                    <Link href={"/login"}>Already have account?SignIn</Link>
                </div>
            </form>
        </div>
    )
}

export default SignUp

