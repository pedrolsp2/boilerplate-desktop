import { Input } from '@/components/ui/input';
import { Eye, EyeOff, KeyRound, UserCircle2 } from 'lucide-react';
import React, { forwardRef, ReactNode, useState } from 'react';

type VariantInput = 'user' | 'password';

interface ContainerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: VariantInput;
}

const Container = forwardRef<HTMLInputElement, ContainerProps>(
  ({ variant, ...props }, ref) => {
    const [visible, setVisible] = useState<boolean>(false);

    const type: { [key in VariantInput]: React.HTMLInputTypeAttribute } = {
      user: 'text',
      password: visible ? 'text' : 'password',
    };

    const Icon: { [key in VariantInput]: ReactNode } = {
      user: <UserCircle2 className="text-primary" />,
      password: <KeyRound className="text-primary" />,
    };

    const isPassword = variant === 'password';

    return (
      <div className="relative flex items-center">
        <span className="absolute left-2">{Icon[variant]}</span>
        <Input ref={ref} type={type[variant]} {...props} className="pl-9" />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((prev) => !prev)}
            className="absolute right-2"
          >
            {visible ? (
              <EyeOff className="text-primary" />
            ) : (
              <Eye className="text-primary" />
            )}
          </button>
        )}
      </div>
    );
  }
);

Container.displayName = 'Container';

export default Container;
