'use client';

import AppSideBar from '@/components/AppSideBar';
import Loader1 from '@/components/loaders/Loader1';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import useGeneralStore from '@/lib/stores/generalStore';
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function initQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
      },
    },
  });
}
export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Instead do this, which ensures each request has its own cache:
  // const [queryClient] = useState(initQueryClient);
  const queryClient = new QueryClient()

  const { isLoading } = useGeneralStore()

  return (
    <SidebarProvider style={{ direction: "ltr" }} defaultOpen={false}>

      <AppSideBar />
      <QueryClientProvider client={queryClient}>
        <SidebarTrigger className=' text-zinc-50' />
        {isLoading && <Loader1 />}
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SidebarProvider>
  );
}
