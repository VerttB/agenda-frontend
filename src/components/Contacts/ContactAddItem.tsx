import { useState } from "react";
import { Modal } from "../Modal";
import { FaUser } from "react-icons/fa6";
import { BsTelephoneFill, BsPlus } from "react-icons/bs";

import { Input } from "../Input";
import { Button } from "../Button";

export const ContactAddItem = () => {
    const [open, setOpen] = useState<boolean>(false)
    

    return(
        <>
        <button 
        onClick={() => setOpen(true)} 
        className="bg-white rounded-full flex justify-center 
                  items-center h-32 w-16 text-2xl
                  cursor-pointer transition-all hover:scale-110 hover:bg-gray-100"><BsPlus size={32}/></button>
        <Modal.Root open={open} onOpenChange={setOpen} className="bg-white border-blue-600 border-3">
            <Modal.Header  onClose={() => setOpen(false)}></Modal.Header>
            
            <Modal.Content className="min-w-108 min-h-32 items-center gap-8 px-10">
                <h1 className="text-3xl">Adicione um Contato!</h1>
                <div className="flex w-full gap-8 items-center">
                    <FaUser size={40} color="blue"/>
                <Input placeholder="Nome" className="bg-yellow-50 font-medium text-2xl text-gray-700 border-2 w-full py-0 px-6"></Input>
                </div>
                  <div className="flex w-full items-center gap-8">
                    <BsTelephoneFill size={40} color="blue"/>
                <Input placeholder="Telefone" className=" bg-yellow-50 font-medium text-2xl text-gray-700 border-2 w-full py-0 px-6"></Input>
                </div>
            </Modal.Content>
            <Modal.Actions className="text-white w-full flex justify-around p-4 mb-6">
                <Button className="px-10 py-2">Cancelar</Button>
                <Button className="px-10 py-2"variant="secondary">Confirmar</Button>
            </Modal.Actions>
        </Modal.Root>
        </>
    )
}