import { dbConnect } from "@/lib/dbConnect";
import Prize from "@/lib/Models/Prize";
import { PrizeSchemaType } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params

        await dbConnect();
        const prize = await Prize.findOne({ _id: id });

        if (!prize) throw new Error("no prize with that id")

        await Prize.deleteOne({ _id: id })

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

        const body = await request.json() as PrizeSchemaType

        await dbConnect();
        const prize = await Prize.findOne({ _id: id });

        if (!prize) throw new Error("no question with that id")

        await Prize.updateOne({ _id: id }, body)

        return NextResponse.json({ success: true });

    } catch (error) {
        console.log({ error })
        return NextResponse.json({
            success: false,
            message: "An unknown error occurred.",
        }, { status: 400 });
    }
}