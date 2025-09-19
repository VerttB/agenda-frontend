import { useState } from "react";
import { Modal } from "../Modal";
import { BsFillTrash3Fill } from "react-icons/bs"

import { Button } from "../Button";
import type { Contact } from "@/core/interfaces/Contact";
import useSWRMutation from "swr/mutation";
import { Alert } from "../Alert";
import { useAlert } from "@/core/hooks/useAlert";
interface ContactRemoveItemProps{
    contact: Contact
    onSuccess?: () => void

}

const deleteContact = async (url: string, { arg }: { arg: { contatoId: string } }) => {
  console.log(arg.contatoId)
  const response = await fetch(`${url}/${arg.contatoId}`, {
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
    const { trigger, isMutating } = useSWRMutation(`http://localhost:8080/contatos`, deleteContact);
    const { show, message, type, showAlert, hideAlert } = useAlert();
 

  const handleDelete = async () => {
    try{
      await trigger({ contatoId: contact.id  });
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
                <Button
                    className="px-10 py-2 bg-red-600 hover:bg-red-700"
                    onClick={handleDelete}
                    disabled={isMutating}>
                        {isMutating ? "Excluindo..." : "Confirmar"}
                </Button>            
          </Modal.Actions>
        </Modal.Root>
        </>
    )
}