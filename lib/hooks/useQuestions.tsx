import axios from "axios";
import { Question } from "../types/Question";
import { WithId } from "../types/WithId";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchQuestions = async () => {
    const response = await axios.get('/api/question');
    console.log(response.data)
    return response.data;
};
export const useQuestions = () => {
    return useQuery<{ success: boolean, data: WithId<Question>[] }>({ queryKey: ['questions'], queryFn: fetchQuestions });

}