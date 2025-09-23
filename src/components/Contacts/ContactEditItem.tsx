import { useState } from "react";
import { Modal } from "../Modal";
import { FaUser } from "react-icons/fa6";
import { BsTelephoneFill, BsPencilFill } from "react-icons/bs";

import { Input } from "../Input";
import { Button } from "../Button";
import type { Contact } from "@/core/interfaces/Contact";
import { useContact } from "@/core/hooks/useContact";
import useSWRMutation from "swr/mutation";
import { useAlert } from "@/core/hooks/useAlert";
import { Alert } from "../Alert";

interface ContactEditItemProps{
    contact: Contact
    onSuccess?: () => void
}

const sendUpdate = async (
  url: string,
  { arg }: { arg: { contatoId: string; nome: string; telefone: string } }
) => {
  const response = await fetch(`${url}/${arg.contatoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: arg.nome,
      telefone: arg.telefone,
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar contato");
  }

  return response.json();
}

export const ContactEditItem = ({contact, onSuccess}:ContactEditItemProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const [nome, setNome] = useState(contact.nome);
    const [telefone, setTelefone] = useState(contact.telefone);
    const { show, message, type, showAlert, hideAlert } = useAlert();
    

    const { trigger, isMutating } = useSWRMutation(`http://localhost:8080/contatos`, sendUpdate);
    const handleUpdate = async () => {
      try{
        await trigger({
                  contatoId: contact.id,
                  nome: nome,
                  telefone: telefone,
          });

      onSuccess?.();
      showAlert(`Contato Editado com sucesso :)`, "success")
      setOpen(false)
      }catch(e:any){
          showAlert(`Erro ao editar contato ${contact.nome}. :(`, "error")
        }
  };
    return(
        <>
        <Alert message={message} type={type} show={show} onClose={hideAlert} />
        <button 
        onClick={() => setOpen(true)} 
        className=" 
                 w-8 px-0 py-0 bg-transparent rounded-none cursor-pointer hover:scale-95 b-0 shadow-none ">
                 <BsPencilFill className="text-blue-800" size={28}/></button>
        <Modal.Root open={open} onOpenChange={setOpen} className="bg-white border-blue-600 border-3">
            <Modal.Header  onClose={() => setOpen(false)}></Modal.Header>
            
            <Modal.Content className="min-w-108 min-h-32 items-center gap-8 px-10">
                <h1 className="text-3xl">Editando o contato de {contact.nome}!</h1>
                <div className="flex w-full gap-8 items-center">
                    <FaUser size={40} color="blue"/>
                <Input placeholder="Nome" onChange={(e) => setNome(e.target.value)} value={nome} className="bg-yellow-50 font-medium text-2xl text-gray-700 border-2 w-full py-0 px-6"></Input>
                </div>
                  <div className="flex w-full items-center gap-8">
                    <BsTelephoneFill size={40} color="blue"/>
                <Input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} className=" bg-yellow-50 font-medium text-2xl text-gray-700 border-2 w-full py-0 px-6"></Input>
                </div>
            </Modal.Content>
            <Modal.Actions className="text-white w-full flex justify-around p-4 mb-6">
                <Button className="px-10 py-2">Cancelar</Button>
                    <Button className="px-10 py-2" variant="secondary" onClick={handleUpdate} disabled={isMutating}>
                                {isMutating ? "Salvando..." : "Confirmar"}
                    </Button>           
         </Modal.Actions>
        </Modal.Root>
        </>
    )
}