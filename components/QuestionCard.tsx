import { Question } from '@/lib/types/Question';
import { WithId } from '@/lib/types/WithId';
import Swal from 'sweetalert2'
import React from 'react';
import ar from "@/lib/translation/ar.json"
import Icons from './ui/icons';
import axios, { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import QuestionDialog, { Emode } from './QuestionDialog';
import useGeneralStore from '@/lib/stores/generalStore';

const QuestionCard: React.FC<{ question: WithId<Question> }> = ({ question }) => {


    const queryClient = useQueryClient()


    const deleteHandler = async (_id: string) => {

        const result = await Swal.fire({
            title: " هل أنت متأكد ?",
            text: "لا يمكن العودة !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "إلغاء",
            confirmButtonText: " نعم متأكد !"
        })
        if (result.isConfirmed) {
            try {
                useGeneralStore.getState().setIsLoading(true)

                const response = await axios.delete(`/api/question/${_id}`);
                console.log({ response })
                if (response.status === 200) {
                    queryClient.invalidateQueries({ queryKey: ['questions'] });
                    Swal.fire({
                        title: "تم المسح !",
                        text: "تم مسح السؤال بنجاح",
                        icon: "success"
                    });
                }
            }
            catch (error: unknown) {
                console.error("Error deleting word:", error);
                if (error instanceof AxiosError) {
                    Swal.fire({
                        title: "خطأ!",
                        text: "حدث خطأ أثناء الحذف. " + (error?.response?.data?.message ?? error.message),
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "خطأ!",
                        text: "حدث خطأ أثناء الحذف. ",
                        icon: "error"
                    });
                }
            } finally {
                useGeneralStore.getState().setIsLoading(false)
            }
        }
    }
    return (
        <div key={question._id} className='bg-zinc-600 text-zinc-300 p-4 rounded-lg mb-4 sm:w-3xl'>
            <div className='flex justify-between'>

                <div>

                    <h2 className='text-3xl'>{question.question}</h2>
                    <p>{ar.correct_answer} : {question.correct_answer}</p>
                    <p>{ar.first_incorrect_answer} :{question.wrong_answer_1}</p>
                    <p>{ar.second_incorrect_answer} :{question.wrong_answer_2}</p>
                    <p>{ar.third_incorrect_answer} :{question.wrong_answer_3}</p>
                </div>



                <div className='flex gap-2'>
                    <div className='h-full flex items-center'>
                        <Icons.delete onClick={() => deleteHandler(question._id)} className="mr-2 !h-7 w-7! cursor-pointer" />
                    </div>

                    <QuestionDialog
                        question={question.question}
                        correct_answer={question.correct_answer}
                        wrong_answer_1={question.wrong_answer_1}
                        wrong_answer_2={question.wrong_answer_2}
                        wrong_answer_3={question.wrong_answer_3}
                        id={question._id}
                        mode={Emode.Edit} />

                </div>
            </div>
        </div >
    );
};

export default QuestionCard;