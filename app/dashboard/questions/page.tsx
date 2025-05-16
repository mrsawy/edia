"use client"
import ar from "@/lib/translation/ar.json"
import QuestionDialog, { Emode } from "@/components/QuestionDialog";
import { useQuestions } from "@/lib/hooks/useQuestions";
import QuestionCard from "@/components/QuestionCard";


const Dashboard: React.FC = () => {
    const { data, isSuccess } = useQuestions()


    return (
        <div className='flex flex-col items-center justify-center w-full h-full' style={{ direction: "rtl" }}>
            <h1 className='text-3xl text-zinc-300 my-12'>{ar.questions}</h1>
            <div className='mb-14'>
                <QuestionDialog mode={Emode.Add} />
            </div>
            {isSuccess && data && data.data.map((question) => <QuestionCard question={question} />)}
        </div>
    );
};

export default Dashboard;