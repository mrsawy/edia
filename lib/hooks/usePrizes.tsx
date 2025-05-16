import axios from "axios";
import { WithId } from "../types/WithId";

import { useQuery} from '@tanstack/react-query';
import { PrizeSchemaType } from "../schema";

const fetchPrizes = async () => {
    const response = await axios.get('/api/prize');
    console.log(response.data)
    return response.data;
};
export const usePrizes = () => {
    return useQuery<{ success: boolean, data: WithId<PrizeSchemaType>[] }>({ queryKey: ['prizes'], queryFn: fetchPrizes });

}