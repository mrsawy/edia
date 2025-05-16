import { object, string, InferType } from 'yup';
import ar from "@/lib/translation/ar.json"

export const QuestionSchema = object({
    question: string().required(ar.question_is_required),
    correct_answer: string().required(ar.answer_is_required),
    wrong_answer_1: string().required(ar.answer_is_required),
    wrong_answer_2: string().required(ar.answer_is_required),
    wrong_answer_3: string().required(ar.answer_is_required)
});
export type QuestionSchemaType = InferType<typeof QuestionSchema>;




export const PrizeSchema = object({
    content: string().required(ar.prize_name_is_required),
    prizeType: string().required(ar.prize_type_is_required),
});
export type PrizeSchemaType = InferType<typeof PrizeSchema>;