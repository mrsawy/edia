"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios"

import ar from "@/lib/translation/ar.json"


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PrizeSchema, PrizeSchemaType } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useQueryClient } from '@tanstack/react-query';
import { PrizeEnum } from "@/lib/types/PrizeType.enum";
import useGeneralStore from "@/lib/stores/generalStore";

type Props = {
    className?: string
    id?: string
    content?: string
    prizeType?: string
}

export default function PrizeForm({ className, id, content = "", prizeType = "" }: Props) {

    const queryClient = useQueryClient()

    const form = useForm<PrizeSchemaType>({
        resolver: yupResolver(PrizeSchema),
        defaultValues: { content, prizeType },
    })

    async function onSubmit(values: PrizeSchemaType) {
        let response;
        try {
            useGeneralStore.getState().setIsLoading(true)

            if (id) {
                response = await axios.put('/api/prize/' + id, values);
                toast.success(ar.prize_updated_successfully);

            } else {
                response = await axios.post('/api/prize', values);
                toast.success(ar.prize_added_successfully);

            }
            console.log({ response })
            queryClient.invalidateQueries({ queryKey: ['prizes'] });

        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || ar.something_went_wrong;
                toast.error(message);
            } else {
                toast.error(ar.something_went_wrong);
            }
        } finally {
            useGeneralStore.getState().setIsLoading(false)
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}

                className={cn("space-y-8", className)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{ar.prize_name}</FormLabel>
                            <FormControl>
                                <Input placeholder={ar.prize_placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="prizeType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{ar.prize_type}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} >
                                <FormControl className="w-full">
                                    <SelectTrigger className="w-full">
                                        <SelectValue className="w-full" placeholder={ar.prize_type_placeholder} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="w-full">
                                    <SelectItem value={PrizeEnum.correct}>عجلة الإجابات الصحيحة</SelectItem>
                                    <SelectItem value={PrizeEnum.wrong}>عجلة الإجابات الخاطئة</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="cursor-pointer">{ar.submit}</Button>
            </form>
        </Form>
    )
}
