import React from 'react';
import { SidebarProvider, SidebarInset } from '../ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import Header from '../Header';

interface SidebarContentProps {
  children: React.ReactElement | null;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarContent;
