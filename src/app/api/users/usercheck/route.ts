import { NextRequest, NextResponse } from "next/server";
import connect from "../../../../../dbConfig/dbConfig";
import User from "@/models/userModel";


connect();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        console.log(reqBody);

        // check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({error: 'Email doesnot exist, create an account'}, {status: 400})
        }

        if(user){
            return NextResponse.json({
                message: 'Email verification successful',
                success: true,
                data: user
            });
        }
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}