"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios"

import ar from "@/lib/translation/ar.json"


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { QuestionSchema, QuestionSchemaType } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";


import { useQueryClient } from '@tanstack/react-query';

type Props = {
    className?: string
    id?: string
    question?: string
    correct_answer?: string
    wrong_answer_1?: string
    wrong_answer_2?: string
    wrong_answer_3?: string
}

export default function QuestionForm({ className, id, question = "", correct_answer = "", wrong_answer_1 = "", wrong_answer_2 = "", wrong_answer_3 = "" }: Props) {

    const queryClient = useQueryClient()

    const form = useForm<QuestionSchemaType>({
        resolver: yupResolver(QuestionSchema),
        defaultValues: { question, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, },
    })

    async function onSubmit(values: QuestionSchemaType) {
        let response;
        try {
            if (id) {
                response = await axios.put('/api/question/' + id, values);
                toast.success(ar.question_updated_successfully);

            } else {
                response = await axios.post('/api/question', values);
                toast.success(ar.question_added_successfully);

            }
            console.log({ response })
            queryClient.invalidateQueries({ queryKey: ['questions'] });

        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || ar.something_went_wrong;
                toast.error(message);
            } else {
                toast.error(ar.something_went_wrong);
            }
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}

                className={cn("space-y-8", className)}>
                <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{ar.question_title}</FormLabel>
                            <FormControl>
                                <Input placeholder={ar.question_placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="correct_answer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{ar.correct_answer}</FormLabel>
                            <FormControl>
                                <Input placeholder={ar.answer_placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />



                <FormField
                    control={form.control}
                    name="wrong_answer_1"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{ar.first_incorrect_answer}</FormLabel>
                            <FormControl>
                                <Input placeholder={ar.answer_placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />



                <FormField
                    control={form.control}
                    name="wrong_answer_2"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{ar.second_incorrect_answer}</FormLabel>
                            <FormControl>
                                <Input placeholder={ar.answer_placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="wrong_answer_3"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{ar.third_incorrect_answer}</FormLabel>
                            <FormControl>
                                <Input placeholder={ar.answer_placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="cursor-pointer">{ar.submit}</Button>
            </form>
        </Form>
    )
}
