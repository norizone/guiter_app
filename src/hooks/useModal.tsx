import { useState } from 'react';

// import { useBodyFix } from '@/hooks/useBodyFix';

export const useModal = () => {
  // const { onFixOn, onFixOff } = useBodyFix();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    // onFixOn()
    setIsOpen(true);
  };

  const closeModal = () => {
    // onFixOff();
    setIsOpen(false);
  };

  const Modal = () => {
    return (
      !isOpen ? null : <div>Modal</div>
    )
  }

  return { Modal, openModal, closeModal }
}