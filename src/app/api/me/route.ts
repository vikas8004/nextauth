import { connect } from "@/dbConfig/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({ msg: "user found", data: user})
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}