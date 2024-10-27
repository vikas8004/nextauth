import { connect } from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        const foundUser = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
        if (!foundUser) {
            return NextResponse.json({ error: "Invalid token", }, { status: 400 })
        }
        console.log(foundUser);
        foundUser.isVerified = true;
        foundUser.verifyToken = undefined;
        foundUser.verifyTokenExpiry = undefined;
        await foundUser.save();
        return NextResponse.json({ msg: "email verified", status: "success" }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}