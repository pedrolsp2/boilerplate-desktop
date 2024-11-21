import { useState } from 'react';

const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const onToggle = () => setIsOpen((prev) => !prev);
  const onOpenChange = (isOpen: boolean) => setIsOpen(isOpen);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    onOpenChange,
  };
};

export default useDisclosure;
