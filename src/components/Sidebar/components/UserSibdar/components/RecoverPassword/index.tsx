import React, { useState } from 'react';
import { KeyRound } from 'lucide-react';
import ChangePasswordDialog from '@/components/ChangePasswordDialog';

const RecoverPassword: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-neutral-100 dark:hover:bg-stone-800"
      >
        <KeyRound />
        Mudar senha
      </div>
      <ChangePasswordDialog isOpen={open} setIsOpen={setOpen} />
    </>
  );
};

export default RecoverPassword;
