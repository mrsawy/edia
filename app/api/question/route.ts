import { dbConnect } from "@/lib/dbConnect";
import Question from "@/lib/Models/Question";
import QuestionModel from "@/lib/Models/Question";
import { QuestionSchema, QuestionSchemaType } from "@/lib/schema";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json() as QuestionSchemaType

        await QuestionSchema.validate(body)
        const foundedQuestion = await QuestionModel.findOne({ question: body.question })
        if (foundedQuestion) throw Error("Question already exist")

        const question = new QuestionModel({
            question: body.question, // ✅ lowercase
            correct_answer: body.correct_answer,
            wrong_answer_1: body.wrong_answer_1,
            wrong_answer_2: body.wrong_answer_2,
            wrong_answer_3: body.wrong_answer_3,
        });

        await question.save();
        return NextResponse.json({
            success: true,
            message: "Question added successfully .",
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
        const questions = await Question.find({}).sort({ createdAt: -1 })
        return NextResponse.json({
            success: true,
            data: questions,
        });
    } catch (error) {
        console.log({ error })
        return NextResponse.json({
            success: false,
            message: "An unknown error occurred.",
        }, { status: 400 });
    }
}

