import mongoose, { Schema } from 'mongoose';

const QuestionSchema: Schema = new Schema(
    {
        question: { type: String, required: true },
        correct_answer: { type: String, required: true },
        wrong_answer_1: { type: String, required: true },
        wrong_answer_2: { type: String, required: true },
        wrong_answer_3: { type: String, required: true },
    },
    { timestamps: true }
);


export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);
