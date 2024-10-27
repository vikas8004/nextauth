import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = NextResponse.json({ msg: "logout successful", success: true });
        res.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
        return res;
    } catch (error: any) {
        return NextResponse.json({ msg: error.message }, { status: 500 })
    }
}