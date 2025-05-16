import { dbConnect } from "@/lib/dbConnect";
import Question from "@/lib/Models/Question";
import { QuestionSchemaType } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function DELETE(_: any, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params

        await dbConnect();
        const question = await Question.findOne({ _id: id });

        if (!question) throw new Error("no question with that id")

        await Question.deleteOne({ _id: id })

        return NextResponse.json({ success: true });

    } catch (error) {
        console.log({ error })
        return NextResponse.json({
            success: false,
            message: "An unknown error occurred.",
        }, { status: 400 });
    }
}



export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params

        const body = await request.json() as QuestionSchemaType

        await dbConnect();
        const question = await Question.findOne({ _id: id });

        if (!question) throw new Error("no question with that id")

        await Question.updateOne({ _id: id }, body)

        return NextResponse.json({ success: true });

    } catch (error) {
        console.log({ error })
        return NextResponse.json({
            success: false,
            message: "An unknown error occurred.",
        }, { status: 400 });
    }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        await dbConnect();
        const question = await Question.findOne({ _id: id });

        if (!question) throw new Error("no question with that id")

        return NextResponse.json({ success: true, data: question });

    } catch (error) {
        console.log({ error })
        return NextResponse.json({
            success: false,
            message: "An unknown error occurred.",
        }, { status: 400 });
    }
}