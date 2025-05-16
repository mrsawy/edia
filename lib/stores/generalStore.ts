
import { create } from "zustand"
// import { persist } from "zustand/middleware"

type GeneralStore = {
    isLoading: boolean
    setIsLoading: (isWin: boolean) => void
}
const useGeneralStore = create<GeneralStore>()((set, get) => ({
    isLoading: false,
    setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
})
)


export default useGeneralStore
