import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import next, { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {

    try{
        const { email, password } = req.body;
        if(!email || !password) {
            return NextResponse.json({status: 400, message: "Email and password are required"});
        }
        connectToDatabase();
        const user = await User.findOne({email});
        if(user) {
            return NextResponse.json({status: 400, message: "User already exists"});
        }
        const newUser = await User.create({email, password});
        return NextResponse.json({status: 201, message: "User created successfully"});

    }
    catch(error) {
        console.error(error);
        return {status: 500, message: "Internal Server Error"};
    }

}