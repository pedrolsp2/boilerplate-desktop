import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useNavigate } from 'react-router-dom';

import { Frame, GalleryVerticalEnd, SquareLibrary } from 'lucide-react';
import { AccordionSidebar } from './AccordionSidebar';
import { ItemsSidebar } from './ItemsSidebar';
import { UserSibdar } from './UserSibdar';
const data = {
  navMain: [
    {
      title: 'Rotinas',
      url: '/rotinas',
      icon: SquareLibrary,
      isActive: true,
      items: [
        {
          title: 'Recebimento',
          url: '/rotinas/recebimento',
        },
        {
          title: 'Faturamento',
          url: '/rotinas/faturamento',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Graficos',
      url: '/',
      icon: Frame,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  const goTo = (url: string) => {
    navigate(url);
  };

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="cursor-pointer" onClick={() => goTo('/')}>
                <div className="flex items-center justify-center rounded-lg aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Desktop</span>
                  <span>v{import.meta.env.VITE_VERSION}</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AccordionSidebar items={data.navMain} />
        <ItemsSidebar projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <UserSibdar />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
