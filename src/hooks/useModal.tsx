import { useState } from 'react';

import { useBodyFix } from '@/hooks/useBodyFix';
import { InputModal } from "@/features/rhythm/components/inputModal";
import { IsModalOpen } from '@/stores/ModalState';
import { useRecoilState } from 'recoil';

type ModalType = 'dramsTone' | 'help';

export const useModal = () => {
  const { onFixOn, onFixOff } = useBodyFix();
  const [isOpen, setIsOpen] = useRecoilState<boolean>(IsModalOpen);
  const [modalType , setModalType] = useState<ModalType>()
  const [modalNumber,setModalNumber] = useState<number>(0)
  
  // TODO: openModalにわたす値で開くものを変える
  const openModal = (type:ModalType,index:number) => {
    setModalType(type);
    setModalNumber(index);
    onFixOn()
    setIsOpen(true);
  };

  const closeModal = () => {
    onFixOff();
    setIsOpen(false);
  };

  const Modal = () => {
      return (!isOpen ? null :
            modalType === 'dramsTone' ?  <InputModal selectIndex={modalNumber}/>
            :null
             )
  }

  return { Modal, openModal, closeModal }
}