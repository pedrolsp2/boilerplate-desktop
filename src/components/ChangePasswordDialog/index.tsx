import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from '@/api/auth/user';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import React from 'react';
import { Toast } from '../Toast';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePasswordDialog = ({ isOpen, setIsOpen }: Props) => {
  const schema = z
    .object({
      password: z
        .string()
        .min(4, { message: 'Senha deve ter no mínimo 4 caracteres.' }),
      confirmPassword: z
        .string()
        .min(4, { message: 'Senha deve ter no mínimo 4 caracteres.' }),
    })
    .refine(({ confirmPassword, password }) => confirmPassword === password, {
      message: 'Senhas não coincidem.',
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, status } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      Toast({ content: 'Senha alterada com sucesso.', variant: 'success' });
    },
    onError: () => {
      Toast({
        content: 'Houve um erro ao alterar a senha. Tente novamente.',
        variant: 'warning',
      });
    },
  });

  const isLoading: boolean = status === 'pending';

  const onSubmit = ({ password }: z.infer<typeof schema>) => {
    mutate(password);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Alterar Senha</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova senha</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button className="px-3 rounded-md" disabled={isLoading}>
                Confirmar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
