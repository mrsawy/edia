import mongoose, { Schema } from 'mongoose';
import { PrizeEnum } from '../types/PrizeType.enum';

const PrizeSchema: Schema = new Schema(
    {
        content: { type: String, required: true },
        prizeType: { type: String, required: true }
    },
    { timestamps: true }
);


export default mongoose.models.Prize || mongoose.model('Prize', PrizeSchema);
