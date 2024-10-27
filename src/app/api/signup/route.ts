import { connect } from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";



export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);

        // check if user already exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ msg: "User already exist" }, { status: 400 });
        }

        // hash password

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });


        const savedUser = await newUser.save();
        console.log(savedUser);

        // sending email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })
        const { password: pass, ...res } = savedUser._doc;
        return NextResponse.json({
            msg: "User created successfully",
            success: true,
            res
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}