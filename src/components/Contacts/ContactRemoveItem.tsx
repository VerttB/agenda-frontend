import { useState } from "react";
import { Modal } from "../Modal";
import { BsFillTrash3Fill } from "react-icons/bs"

import { Button } from "../Button";
import type { Contact } from "@/core/interfaces/Contact";

interface ContactRemoveItemProps{
    contact: Contact
}

export const ContactRemoveItem = ({contact}: ContactRemoveItemProps) => {
    const [open, setOpen] = useState<boolean>(false)
    

    return(
        <>
        <Button 
        onClick={() => setOpen(true)} 
        className="bg-white flex justify-center 
                  items-center p-2 shadow-none
                hover:bg-gray-100"><BsFillTrash3Fill size={32} color="red"/></Button>
        <Modal.Root open={open} onOpenChange={setOpen} className="bg-white border-red-600 border-3">
            <Modal.Header  onClose={() => setOpen(false)}></Modal.Header>
            
            <Modal.Content className="w-112 min-h-32 items-center gap-8 px-10">
                <BsFillTrash3Fill className="text-red-700" size={64}/>
                <h2 className="text-3xl text-center">Tem certeza que deseja excluir {contact.nome} da sua lista de contatos?</h2>
            </Modal.Content>
            <Modal.Actions className="text-white w-full flex justify-around p-4 mb-6">
                <Button className="px-12 py-2.5" variant="danger">Não</Button>
                <Button className="px-12 py-2"variant="primary">Sim</Button>
            </Modal.Actions>
        </Modal.Root>
        </>
    )
}