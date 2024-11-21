import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import BadgeUser from './components/BadgeUser';
import BreadcrumbListUrl from './components/BreadcrumbListUrl';

const Header: React.FC = () => {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background border-b border-sidebar-border px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="h-4 mr-2 bg-primary-foreground/20"
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <BreadcrumbListUrl />
        <BadgeUser />
      </div>
    </header>
  );
};

export default Header;
