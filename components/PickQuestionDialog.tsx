import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { pickRandomQuestion } from '@/actions/pickRandomQuestion.action';
import { WithId } from '@/lib/types/WithId';
import { QuestionSchemaType } from '@/lib/schema';
import axios from 'axios';
import { toast } from 'react-toastify';
import { celebrate, cn, playSound, shuffleArray } from '@/lib/utils';
import Swal from 'sweetalert2';
import confetti from "canvas-confetti"
// import loseSound from "@/public/mp3/1.mp3"

export enum modeEnum {
    single = "single",
    list = "list"
}
export enum answerEnum {
    correct = "correct",
    wrong = "wrong"
}

type Props = {
    className?: string
    id?: string
}
type Answer = { answer: string, type: answerEnum, key: number }

const PickQuestionDialog: React.FC<Props> = ({ className, id }) => {
    const [question, setQuestion] = useState<WithId<QuestionSchemaType> | undefined>();
    const [allQuestions, setAllQuestions] = useState<WithId<QuestionSchemaType>[] | undefined>();
    const [mode, setMode] = useState<modeEnum>(modeEnum.single);
    const [answers, setAnswers] = useState<Answer[]>();
    const [selectedAnswer, setSelectedAnswer] = useState<Answer>()
    const [isOpen, setIsOpen] = useState(false);

    const openQuestionDialog = () => setIsOpen(true);
    const closeQuestionsDialog = () => setIsOpen(false);
    // const [questionDialogOpen, setQuestionDialogpen] = useState(true)
    const checkAnswer = ({ answer }: { answer: Answer }) => {
        if (answer.type == answerEnum.correct) {
            setTimeout(() => {
                closeQuestionsDialog()
            }, 1000)
            playSound("/mp3/w2.mp3")

            celebrate();


        } else {
            closeQuestionsDialog();
            playSound("/mp3/3.mp3")
            Swal.fire({
                title: "للأسف !",
                text: "إجابة خاطئة",
                imageUrl: "/R.gif",
                imageWidth: 400,
                imageHeight: 400,
                imageAlt: "Custom image",
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: "إغلاق"
            });
        }
    }

    const setSelectedQuestion = (question: WithId<QuestionSchemaType>) => {
        setSelectedAnswer(undefined)
        const answers = shuffleArray([{ answer: question.correct_answer, type: answerEnum.correct, Key: 1 }, { answer: question.wrong_answer_1, type: answerEnum.wrong, key: 2 },
        { answer: question.wrong_answer_2, type: answerEnum.wrong, key: 3 }, { answer: question.wrong_answer_3, type: answerEnum.wrong, key: 4 }]) as Array<Answer>;
        setAnswers(answers)
        setQuestion(question)

    }
    const getRandomQuestion = async () => {
        try {
            setMode(modeEnum.single)
            const randomQuestion = (await pickRandomQuestion()) as WithId<QuestionSchemaType>
            setSelectedQuestion(randomQuestion)
            console.log({ randomQuestion })
        } catch (err) {
            toast.error("حدث خطأ ما")
        }
    }

    const getAllQuestions = async () => {
        try {
            setMode(modeEnum.list);
            setQuestion(undefined)
            const response = await axios.get("/api/question");
            const questions = response.data.data;
            setAllQuestions(questions)

            console.log({ allQuestions })
        } catch (err) {
            toast.error("حدث خطأ ما")
        }
    }

    return (<Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger >
            <div className="bg-zinc-200 cursor-pointer hover:bg-zinc-400 text-4xl rounded-lg text-zinc-800 border-2 duration-200 p-4 flex items-center max-w-md m-auto text-center  justify-center mt-14">
                عرض سؤال جديد            </div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className='px-5 !text-center'>الأسئلة</DialogTitle>

                <div className='flex flex-row'>
                    <div className=' m-auto border bg-zinc-950 text-zinc-50 hover:bg-zinc-700 p-4 rounded-md cursor-pointer' onClick={() => { getRandomQuestion() }}>إختر سؤال عشوائي</div>
                    <div className=' m-auto border bg-zinc-950 text-zinc-50 hover:bg-zinc-700 p-4 rounded-md cursor-pointer' onClick={() => { getAllQuestions() }}>إختر من قائمة الأسئلة</div>
                </div>


                {allQuestions && allQuestions.length > 0 && mode == modeEnum.list && <div className='w-full border border-zinc-800'>
                    {allQuestions.map(q => (<div className='p-3 border-b-2 border-zinc-800 cursor-pointer hover:bg-zinc-200' onClick={() => { setSelectedQuestion(q); setMode(modeEnum.single); }}>{q.question}</div>))}
                </div>}



                {question && mode == modeEnum.single && (
                    <div className='w-full border border-zinc-800'>
                        <div className='p-3 border-b-2 border-zinc-800 bg-neutral-800 text-zinc-50'>{question.question}</div>
                        {answers && answers.map(answer => {
                            return <div onClick={() => { setSelectedAnswer(answer) }}
                                className={cn('p-3 border-b-2 border-zinc-800 hover:bg-zinc-200 cursor-pointer',
                                    selectedAnswer && selectedAnswer.answer == answer.answer && selectedAnswer.key == answer.key && "!bg-zinc-400",

                                )}>{answer.answer}</div>
                        })}
                    </div>)}


                {selectedAnswer && <div className='flex justify-center'>
                    <Button className='px-12 py-4 m-auto text-lg cursor-pointer' type='button' onClick={() => { checkAnswer({ answer: selectedAnswer }) }}>تأكيد</Button>
                </div>
                }
            </DialogHeader>
        </DialogContent>
    </Dialog>
    );
};

export default PickQuestionDialog;