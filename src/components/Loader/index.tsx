import { LoaderCircle } from 'lucide-react';
import React from 'react';

type LoaderProps =
  | {
      condition: boolean;
      title?: never;
      children?: React.ReactNode;
    }
  | {
      condition: boolean;
      title: string;
      children?: never;
    };

const Loading: React.FC = () => {
  return <LoaderCircle className="animate-spin" />;
};

const Loader: React.FC<LoaderProps> = ({
  children = <></>,
  condition,
  title = '',
}) => {
  if (condition) return <Loading />;

  return (
    <div>
      <span>{title}</span>
      <span>{children}</span>
    </div>
  );
};

export default Loader;
