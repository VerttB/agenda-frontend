import { useState } from "react";
import { Modal } from "../Modal";
import { BsFillTrash3Fill } from "react-icons/bs"

import { Button } from "../Button";
import type { Contact } from "@/core/interfaces/Contact";
import useSWRMutation from "swr/mutation";
import { Alert } from "../Alert";
import { useAlert } from "@/core/hooks/useAlert";
import { Route, useParams } from "@tanstack/react-router";
interface ContactRemoveItemProps{
    contact: Contact
    onSuccess?: () => void

}

const deleteContact = async (url: string, { arg }: { arg: {agendaId:string, contatoId: string } }) => {
  
  const response = await fetch(`${url}/${arg.agendaId}/${arg.contatoId}`, {
    method: "DELETE",
  });
  
  console.log(response.status, typeof response.status);
  if (response.status < 199 || response.status > 300) {
    throw new Error("Erro ao excluir contato");
  }

  if(response.status == 204) return null
  return response.json();
};

export const ContactRemoveItem = ({contact,onSuccess}: ContactRemoveItemProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const { trigger, isMutating } = useSWRMutation(`http://localhost:8080/agenda`, deleteContact);
    const { show, message, type, showAlert, hideAlert } = useAlert();
    const username = useParams({
      from: '/agenda/$username',
      select: (params) => params.username,
  });

  const handleDelete = async () => {
    try{
      await trigger({agendaId: username, contatoId: contact.id  });
      onSuccess?.();
      showAlert(`Contato${contact.nome} removido :)`, "success" )
      setOpen(false)
    }catch(e:any){
      showAlert(`Erro ao deletar contato ${e} :(`, "error" , 10000)
    }

  };
    

    return(
        <>
        <Alert message={message} type={type} show={show} onClose={hideAlert}/>
        <button
        onClick={() => setOpen(true)} 
        className="flex justify-center 
                  items-center cursor-pointer p-0 bg-transparent rounded-none hover:scale-95 b-0 shadow-none"><BsFillTrash3Fill size={32} color="red"/>
                  </button>
        <Modal.Root open={open} onOpenChange={setOpen} className="bg-white border-red-600 border-3">
            <Modal.Header  onClose={() => setOpen(false)}></Modal.Header>
            
            <Modal.Content className="w-112 min-h-32 items-center gap-8 px-10">
                <BsFillTrash3Fill className="text-red-700" size={64}/>
                <h2 className="text-3xl text-center">Tem certeza que deseja excluir {contact.nome} da sua lista de contatos?</h2>
            </Modal.Content>
            <Modal.Actions className="text-white w-full flex justify-around p-4 mb-6">
                <Button className="px-12 py-2.5" variant="danger">Não</Button>
                <Button
                    className="px-12 py-2.5"
                    variant="disabled"
                    onClick={handleDelete}
                    disabled={isMutating}>
                        {isMutating ? "Excluindo..." : "Confirmar"}
                </Button>            
          </Modal.Actions>
        </Modal.Root>
        </>
    )
}