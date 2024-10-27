import { connect } from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log(reqBody);

        const { email, password } = reqBody;
        // check if user  exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ msg: "User not found" }, { status: 404 });
        }
        // checking if password is correct.
        const validPass = await bcryptjs.compare(password, user.password);
        if (!validPass) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 500 })
        }
        // creating tokenData
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }
        // creating token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" });

        const response = NextResponse.json({
            msg: "Login Successful",
            success: true
        })
        response.cookies.set("token", token, { httpOnly: true }

        )
        return response;
    } catch (error: any) {        
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
