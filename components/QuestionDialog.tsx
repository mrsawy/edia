import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import QuestionForm from '@/components/questionForm';
import ar from "@/lib/translation/ar.json"
import Icons from './ui/icons';

export enum Emode {
    Edit = "edit",
    Add = "add"
}

type Props = {
    className?: string
    id?: string
    question?: string
    correct_answer?: string
    wrong_answer_1?: string
    wrong_answer_2?: string
    wrong_answer_3?: string
    mode: Emode
}




const QuestionDialog: React.FC<Props> = ({ id, question = "", correct_answer = "", wrong_answer_1 = "", wrong_answer_2 = "", wrong_answer_3 = "", mode = Emode.Add }) => {
    return (<Dialog >
        <DialogTrigger >
            {mode == Emode.Add ? (<div className="bg-zinc-200 cursor-pointer hover:bg-zinc-400 text-4xl rounded-lg text-zinc-800 border-2 duration-200 p-4 flex items-center">
                {ar.add_new_question}
                <Icons.add className="mr-2 !h-10 w-10!" />
            </div>) : (<Icons.edit className="mr-2 !h-7 w-7! cursor-pointer" />)
            }

        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className='px-5 !text-center'>{ar.add_new_question}</DialogTitle>
                <QuestionForm id={id} question={question} correct_answer={correct_answer} wrong_answer_1={wrong_answer_1} wrong_answer_2={wrong_answer_2} wrong_answer_3={wrong_answer_3} className='p-4' />
            </DialogHeader>
        </DialogContent>
    </Dialog>
    );
};

export default QuestionDialog;