import { recoverPassword } from '@/api/auth/user';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ResetPasswordProps {
  ghost?: boolean;
  state?: boolean;
  setState?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPassword = ({ ghost, setState, state }: ResetPasswordProps) => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const [focusInputUser, setFocusInputUser] = useState(false);

  const { mutate, status } = useMutation({
    mutationFn: recoverPassword,
    onSuccess: () => {
      toast.success(`Nova senha enviada para o email ${email}`, {
        style: { color: '#fff', background: '#3DA861' },
      });
      navigate('/login');
    },
    onError: () => {
      toast.warning(
        `Houve um erro ao recuperar a senha. Verifique os dados e tente novamente`,
        {
          style: { color: '#fff', background: '#AE0303' },
        }
      );
    },
  });

  const isLoading = status === 'pending';

  return (
    <Dialog open={state && state} onOpenChange={setState}>
      {!ghost && (
        <DialogTrigger asChild>
          <span className="text-sm text-right cursor-pointer text-neutral-400">
            Esqueci minha senha
          </span>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Recuperação de senha</DialogTitle>
          <DialogDescription>
            Digite seu e-mail, e enviaremos uma nova senha para você.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <form
            className="w-full"
            onSubmit={(e) => {
              if (isLoading) return;

              e.preventDefault();
              mutate(email);
            }}
          >
            <div className="flex items-center w-full gap-2 rounded">
              <div
                className={`w-full border-b-2 py-1 bg-[#fafafa] px-2 ${
                  focusInputUser
                    ? 'border-b-primary-500'
                    : 'border-b-primary-200'
                } transition-all`}
              >
                <input
                  id="email"
                  type="text"
                  placeholder="Digite seu e-mail"
                  className={` w-full rounded-md p-2 outline-none bg-transparent placeholder:text-primary-300`}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusInputUser(!focusInputUser)}
                  onBlur={() => setFocusInputUser(!focusInputUser)}
                />
              </div>
              <Button
                className="w-[100px] ml-auto rounded-md"
                disabled={!email}
              >
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ResetPassword;
