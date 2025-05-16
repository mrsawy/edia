import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Gift, HelpCircle, HomeIcon } from "lucide-react";



const items = [{ title: "الصفحة الرئيسية", url: "/", icon: HomeIcon }, { title: "تحكم في الجوائز", url: "/dashboard/prizes", icon: Gift }, { title: "تحكم في الأسئلة", url: "/dashboard/questions", icon: HelpCircle }]

const AppSideBar: React.FC = () => {
    return (<Sidebar >
        <SidebarHeader />
        <SidebarContent style={{ direction: "rtl" }}>
            <SidebarGroup >
                <SidebarGroupLabel>الصفحات</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url}>
                                        <span>{item.title}</span>
                                        <item.icon />
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            {/* <SidebarGroup /> */}
        </SidebarContent>
        <SidebarFooter />
    </Sidebar>
    );
};

export default AppSideBar;