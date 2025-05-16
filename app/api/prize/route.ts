import { dbConnect } from "@/lib/dbConnect";
import Prize from "@/lib/Models/Prize";
import { PrizeSchema, PrizeSchemaType, QuestionSchema, QuestionSchemaType } from "@/lib/schema";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json() as PrizeSchemaType

        await PrizeSchema.validate(body)
        const foundedPrize = await Prize.findOne({ content: body.content, prizeType: body.prizeType })
        if (foundedPrize) throw Error("prize already exist")

        const prize = new Prize({
            content: body.content,
            prizeType: body.prizeType
        });

        await prize.save();
        return NextResponse.json({
            success: true,
            message: "prize added successfully .",
        });

    } catch (err: unknown) {
        if (err instanceof yup.ValidationError) {
            return NextResponse.json({
                success: false,
                message: err?.errors[0] || 'An unexpected error occurred.',
            }, { status: 400 });
        }
        if (err instanceof Error) {
            return NextResponse.json({
                success: false,
                message: err?.message || 'An unexpected error occurred.',
            }, { status: 400 });
        }

        return NextResponse.json({
            success: false,
            message: "An unknown error occurred.",
        }, { status: 400 });
    }
}


export async function GET() {
    try {
        await dbConnect();
        const prizes = (await Prize.find({}).sort({ createdAt: -1 }))
            .map(prize => ({
                ...prize.toObject(),
                label: prize.content, // your logic here
            }))
        return NextResponse.json({
            success: true,
            data: prizes,
        });
    } catch (error) {
        console.log({ error })
        return NextResponse.json({
            success: false,
            message: "An unknown error occurred.",
        }, { status: 400 });
    }
}
