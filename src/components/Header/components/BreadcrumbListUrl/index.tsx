import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { firstLettlerUper } from '@/utils/stringFormatter';

const BreadcrumbListUrl: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pages = pathname.split('/').filter((page) => page !== '');

  const goTo = (url: string) => navigate(url);

  if (pathname === '/') {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Inicio</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pages.map((item, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem className="cursor-pointer">
              {index + 1 === pages.length ? (
                <BreadcrumbPage className="capitalize">
                  {firstLettlerUper(item!)}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink onClick={() => goTo(item)}>
                  {firstLettlerUper(item!)}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!(index + 1 === pages.length) && (
              <BreadcrumbSeparator className="ml-2" />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbListUrl;
