import dbConnect from "@/dbConnect/dbConnect";
import Blog from "@/models/blogs";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    try {
        await dbConnect();

        const {details} = await params

        const blogs = await Blog.findById({_id: details});

        return NextResponse.json({data: blogs});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}
