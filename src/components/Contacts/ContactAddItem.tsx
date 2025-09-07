import { useState } from "react";
import { Modal } from "../Modal";
import { FaUser } from "react-icons/fa6";
import { BsTelephoneFill, BsPlus } from "react-icons/bs";

import { Input } from "../Input";

export const ContactAddItem = () => {
    const [open, setOpen] = useState<boolean>(false)
    

    return(
        <>
        <button 
        onClick={() => setOpen(true)} 
        className="bg-white rounded-full flex justify-center 
                  items-center h-32 w-16 text-2xl
                  cursor-pointer transition-all hover:scale-110 hover:bg-gray-100"><BsPlus size={32}/></button>
        <Modal.Root open={open} onOpenChange={setOpen} className="bg-white border-blue-600 border-2">
            <Modal.Header title="Adicione Um Contato!" onClose={() => setOpen(false)}></Modal.Header>
            <Modal.Content>
                <div className="flex items-center">
                    <FaUser color="blue"/>
                <Input placeholder="Nome" className="bg-yellow-100 text-gray-400"></Input>
                </div>
                  <div className="flex items-center">
                    <BsTelephoneFill color="blue"/>
                <Input placeholder="Telefone" className="bg-br text-gray-400"></Input>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <button>Cancelar</button>
                <button>Confirmar</button>
            </Modal.Actions>
        </Modal.Root>
        </>
    )
}