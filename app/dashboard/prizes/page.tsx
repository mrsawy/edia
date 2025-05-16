"use client"

import PrizeDialog from "@/components/PrizesDialog";
import Icons from "@/components/ui/icons";
import { usePrizes } from "@/lib/hooks/usePrizes";
import { PrizeSchemaType } from "@/lib/schema";
import { PrizeEnum } from "@/lib/types/PrizeType.enum";
import { WithId } from "@/lib/types/WithId";
import { useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";

const Prizes: React.FC = () => {
    const { data, isSuccess } = usePrizes()
    return (
        < div className="w-full" style={{ direction: "rtl" }}>
            <div className="flex items-center w-full justify-center p-9">
                <PrizeDialog />
            </div>
            <div className="flex justify-around">
                <div className="flex flex-col">
                    <h1 className="my-4 text-zinc-100 border-2 rounded-md p-5 text-xl">جوائز عجلة الإجابات الصحيحة</h1>
                    {data && isSuccess && data.data.filter(p => p.prizeType == PrizeEnum.correct).map((prize, i) => (<PrizeCard key={i} prize={prize} />))}
                </div>
                <div className="flex flex-col">
                    <h1 className="my-4 text-zinc-100 border-2 rounded-md p-5 text-xl">جوائز عجلة الإجابات الخاطئة</h1>
                    {data && isSuccess && data.data.filter(p => p.prizeType == PrizeEnum.wrong).map((prize, i) => (<PrizeCard key={i} prize={prize} />))}
                </div>
            </div>
        </div>
    );
};


const PrizeCard = ({ prize }: { prize: WithId<PrizeSchemaType> }) => {

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
                const response = await axios.delete(`/api/prize/${_id}`);
                console.log({ response })
                if (response.status === 200) {
                    queryClient.invalidateQueries({ queryKey: ['prizes'] });
                    Swal.fire({
                        title: "تم المسح !",
                        text: "تم مسح الجائزة بنجاح",
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
            }
        }
    }
    return <div className="w-full flex justify-between" style={{ direction: "rtl" }}>

        <div className="text-zinc-50 text-2xl max-w-xs w-full">{prize.content}</div>
        <Icons.delete onClick={() => deleteHandler(prize._id)} className="mr-2 !h-7 w-7! cursor-pointer" />
    </div>
}

export default Prizes;