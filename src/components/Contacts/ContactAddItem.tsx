import { useState } from "react";
import { Modal } from "../Modal";
import { FaUser } from "react-icons/fa6";
import { BsTelephoneFill, BsPlus } from "react-icons/bs";

import { Input } from "../Input";
import { Button } from "../Button";
import useSWRMutation from "swr/mutation";
import { useAlert } from "@/core/hooks/useAlert";
import { Alert } from "../Alert";

interface ContactAddItemProps {
  agendaId: string;
  onSuccess?: () => void;
}

const sendContact = async (url: string, { arg }: { arg: { nome: string; telefone: string, agendaId:string } }) => {
  const response = await fetch(`${url}/${arg.agendaId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    throw new Error("Erro ao adicionar contato");
  }

  return response.json();
}

export const ContactAddItem = ({ onSuccess,agendaId }: { onSuccess?: () => void, agendaId:string }) => {
    const [open, setOpen] = useState<boolean>(false)
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");    
    const { show, message, type, showAlert, hideAlert } = useAlert();
    
    const { trigger, isMutating } = useSWRMutation("http://localhost:8080/contatos", sendContact);

    const handleAdd = async () => {
      try{
        await trigger({agendaId, nome, telefone });
        onSuccess?.();
        setOpen(false);
        setNome("");
        setTelefone("");
        showAlert("Contato Adicionado Com Sucesso :)", "success")

      }catch(e:any){
        showAlert("Erro ao adicionar contato :(", "error")
      }
  };

    return(
        <>
        <Alert show={show} message={message} type={type} onClose={hideAlert}/>
        <Button 
        onClick={() => setOpen(true)} 
        className="bg-white flex justify-center 
                  items-center h-16 p-0 w-16 text-2xl
                hover:bg-gray-100"><span><BsPlus color="black"size={32}/></span></Button>
        <Modal.Root open={open} onOpenChange={setOpen} className="bg-white border-blue-600 border-3">
            <Modal.Header  onClose={() => setOpen(false)}></Modal.Header>
            
            <Modal.Content className="min-w-108 min-h-32 items-center gap-8 px-10">
                <h1 className="text-3xl">Adicione um Contato!</h1>
                <div className="flex w-full gap-8 items-center">
                    <FaUser size={40} color="blue"/>
                <Input placeholder="Nome" onChange={(e) => setNome(e.target.value)} className="bg-yellow-50 font-medium text-2xl text-gray-700 border-2 w-full py-0 px-6"></Input>
                </div>
                  <div className="flex w-full items-center gap-8">
                    <BsTelephoneFill size={40} color="blue"/>
                <Input placeholder="Telefone" onChange={(e) => setTelefone(e.target.value)} className=" bg-yellow-50 font-medium text-2xl text-gray-700 border-2 w-full py-0 px-6"></Input>
                </div>
            </Modal.Content>
            <Modal.Actions className="text-white w-full flex justify-around p-4 mb-6">
                <Button className="px-10 py-2">Cancelar</Button>
                <Button
                    className="px-10 py-2"
                    variant="secondary"
                    onClick={handleAdd}
                    disabled={isMutating}
                >
                    {isMutating ? "Adicionando..." : "Confirmar"}
          </Button>            </Modal.Actions>
        </Modal.Root>
        </>
    )
}