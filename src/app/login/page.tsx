"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LogIn = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",

    });
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const onLogin = async () => {
        try {
            setLoading(true);
            const res = await axios.post("/api/login", user);
            console.log(res);

            if (res) {
                toast.success("login success");
                setUser({ ...user, email: "", password: " " })
                router.push("/profile");

            }
        } catch (error: any) {
            console.log("login failed", error);
            toast.error(error.response.data.error)

        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true);
        }
    }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="font-bold mb-4 tracking-widest text-3xl">{loading ? "processing.." : "Signin"}</h1>

            <form>
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
                    <button onClick={onLogin}
                        type="button"
                        disabled={buttonDisabled}
                    >Submit</button>
                    <Link href={"/signup"}>Don't have account?SignUp</Link>
                </div>
            </form>
        </div>
    )
}

export default LogIn

