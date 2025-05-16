"use server"

import { dbConnect } from "@/lib/dbConnect";
import Question from "@/lib/Models/Question";
import { QuestionSchemaType } from "@/lib/schema";
import { WithId } from "@/lib/types/WithId";

export const pickRandomQuestion = async () => {
    await dbConnect();
    try {
        const randomEntry = await Question.aggregate([
            { $sample: { size: 1 } }
        ]);

        if (!randomEntry[0]) return null;
        const question = {
            ...randomEntry[0],
            _id: randomEntry[0]._id.toString()
        } as WithId<QuestionSchemaType>
        
        console.log({ question })
        return question;
    } catch (err) {
        console.error('Error fetching random entry:', err);
        return null;
    }
};
