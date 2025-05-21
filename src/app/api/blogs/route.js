import dbConnect from "@/dbConnect/dbConnect";
import Blog from "@/models/blogs";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await dbConnect();

        const blogs = await Blog.find();

        return NextResponse.json({data: blogs});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}

export async function POST(req){
    try {
        await dbConnect();
        
        const {title, description} = await req.json();

        await Blog.create({title, description});

        return NextResponse.json({message: 'Blog uploaded...!'});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}