import { useState } from "react";
import { Modal } from "../Modal";
import { FaUser } from "react-icons/fa6";
import { BsTelephoneFill, BsPencilFill } from "react-icons/bs";

import { Input } from "../Input";
import { Button } from "../Button";
import type { Contact } from "@/core/interfaces/Contact";
import { useContact } from "@/core/hooks/useContact";


interface ContactEditItemProps{
    contact: Contact
}

export const ContactEditItem = ({contact}:ContactEditItemProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const {nome, telefone} = useContact({initialValues: contact})
    
    
    return(
        <>
        <Button 
        onClick={() => setOpen(true)} 
        className="bg-white flex justify-center 
                  items-center p-2 b-0 shadow-none
                hover:bg-gray-100"><span><BsPencilFill className="text-blue-800" size={28}/></span></Button>
        <Modal.Root open={open} onOpenChange={setOpen} className="bg-white border-blue-600 border-3">
            <Modal.Header  onClose={() => setOpen(false)}></Modal.Header>
            
            <Modal.Content className="min-w-108 min-h-32 items-center gap-8 px-10">
                <h1 className="text-3xl">Editando o contato de {contact.nome}!</h1>
                <div className="flex w-full gap-8 items-center">
                    <FaUser size={40} color="blue"/>
                <Input placeholder="Nome" onChange={nome.onNomeChange} value={nome.value} className="bg-yellow-50 font-medium text-2xl text-gray-700 border-2 w-full py-0 px-6"></Input>
                </div>
                  <div className="flex w-full items-center gap-8">
                    <BsTelephoneFill size={40} color="blue"/>
                <Input placeholder="Telefone" value={telefone.value} onChange={telefone.onTelefoneChange} className=" bg-yellow-50 font-medium text-2xl text-gray-700 border-2 w-full py-0 px-6"></Input>
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