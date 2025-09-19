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

function App() {
  const [erro,setError ] = useState(null);
  const [name,setName] = useState("") 
  const navigate = useNavigate({from: "/"})
  const { trigger, isMutating } = useSWRMutation(`http://localhost:8080/agenda/criar`, sendAgenda);
  const { show, message, type, showAlert, hideAlert } = useAlert();
  
  // const handleSave =  async () => {
  //   try{
  //     const res = await fetch("http://localhost:8080/agenda/criar", {
  //       method: "POST",
  //       headers: {
  //           "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({nome: name})
  //     })

  //     if(!res.ok){
  //       throw new Error("Erro ao requisitar api")
  //     }
  //     setError(null);
  //     const { id } = await res.json();
      
  //     navigate({to: "/agenda/$username", params:{username: id}})
  //   }catch(e:any){
  //     console.log(e)
  //     setError(e?.message)
  //   }
  // }

  const handleSave = async () => {
    try{
      const res = await trigger({nome: name});
      showAlert(`Agenda ${name} criada :)`, "success" )
      setError(null);
      const { id } = res;
      navigate({to: "/agenda/$username", params:{username: id}})
    }catch(e:any){
      showAlert(` Erro ai criar agenda ${name} :(`, "error" , 10000)
    }

  };

  const handleNameChange = (e:any) => {
      setError(null)
      setName(n => e.target.value)
      console.log(e.target.value)
  }

  return (
    <>
    <Alert message={message} type={type} show={show} onClose={hideAlert} />
    <div className="text-center h-lvh bg-black px-4 py-6 font-all ">
      <div className='flex flex-col h-full items-center gap-16 justify-center text-white'>
        <h1 className='text-5xl font-extrabold w-2/3'>Adicione o seu nome para ter acesso a Agenda virtual!</h1>
        <Input
         onChange={handleNameChange}
         placeholder='Nome' 
         className='p-4 text-gray-900 w-1/3 bg-white border-4 border-blue-700 rounded-full'  type="text" />
        {erro && <p className='text-red-500'>{erro}</p>}
        <Button 
        onClick={() => handleSave()}
        className=' bg-green-500  '>
          Salvar
        </Button>
        <Button>
            Entrar
        </Button>
        </div>
    </div>
    </>
  )
}
