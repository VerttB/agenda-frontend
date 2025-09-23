import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import useSWRMutation from 'swr/mutation'
import { Alert } from '@/components/Alert'
import { useAlert } from '@/core/hooks/useAlert'
export const Route = createFileRoute('/')({
  component: App,
})

const sendAgenda = async (url: string, { arg }: { arg: { nome: string} }) => {
  const response = await fetch(`${url}`, {
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

const sendEnter = async (url: string, { arg }: { arg: { nomeAgenda: string} }) => {
  const response = await fetch(`${url}?nomeAgenda=${arg.nomeAgenda}`, {
    method: "GET",
  });

  if (response.status < 199 || response.status > 300) {
    throw new Error("Erro ao entrar na agenda");
  }
  return response.json();
}

function App() {
  const [erro,setError ] = useState("");
  const [name,setName] = useState("") 
  const navigate = useNavigate({from: "/"})
  const { trigger, isMutating } = useSWRMutation(`http://localhost:8080/agenda`, sendAgenda);
  const { trigger: triggerEnter } = useSWRMutation(`http://localhost:8080/agenda/entrar`, sendEnter);
  const { show, message, type, showAlert, hideAlert } = useAlert();
  
  const handleSave = async () => {
    try{
      const res = await trigger({nome: name});
      showAlert(`Agenda ${name} criada :)`, "success" )
      setError("");
      const { id } = res;
      navigate({to: "/agenda/$username", params:{username: id}})
    }catch(e:any){
      showAlert(` Erro ai criar agenda ${name} :(`, "error" , 10000)
      setError("Nome já existe")
    }
  };

  const handleEnter = async () => {
    try{
      const res = await triggerEnter({nomeAgenda: name});
      showAlert(`Entrou na agenda ${name} :)`, "success" )
      setError("");
      const { id } = res;
      navigate({to: "/agenda/$username", params:{username: id}})
    }catch(e:any){
      showAlert(` Erro ao entrar na agenda ${e} :(`, "error" , 10000)
      setError("Nome não encontrado")
    }
  };

  const handleNameChange = (e:any) => {
      setError("")
      setName(e.target.value)
      console.log(e.target.value)
  }

  return (
    <>
    <Alert message={message} type={type} show={show} onClose={hideAlert} />
    <div className="text-center h-full bg-black px-4 py-6 font-all ">
      <div className='flex flex-col h-full items-center w-full  justify-evenly p-8 max-md:justify-normal max-md:mt-4 text-white'>
        <h1 className='text-5xl l max-md:text-3xl max-lg:w-full font-bold w-3/7'>Adicione o seu nome para ter acesso a Agenda virtual!</h1>
        <div className='flex flex-col w-full gap-12 items-center max-lg:gap-6 max-md:gap-4  max-md:justify-normal max-md:mt-4'>
        <Input
         onChange={handleNameChange}
         placeholder='Nome' 
         className='p-4 text-gray-900 w-1/3 max-xl:w-3/5 max-lg:w-2/3 max-md:w-full max-md:p-2 text-xl bg-amber-100 border-4 border-blue-700 rounded-full'  type="text" />
        {erro && <p className='text-red-500'>{erro}</p>}
      
        <div className="flex flex-col gap-4 max-2xl:w-1/5 max-xl:w-1/3 max-lg:w-2/3 max-md:w-full max-md:px-4 max-md:gap-2 w-1/8">
          <Button 
          onClick={() => handleSave()}
          disabled={isMutating || !name.trim()}
          className='py-3'
          variant='third'>
            Criar Nova Agenda
          </Button>
          <Button 
          onClick={() => handleEnter()}
          className='py-3'
          variant='secondary'
          disabled={isMutating || !name.trim()}
>
              Já tenho Agenda
          </Button>
        </div>
        </div>

        </div>
    </div>
    </>
  )
}
