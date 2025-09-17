import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [erro,setError ] = useState(null);
  const [name,setName] = useState("") 
  const navigate = useNavigate({from: "/"})
  const handleSave =  async () => {
    try{
      const res = await fetch("http://localhost:8080/agenda/criar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: name
      })

      if(!res.ok){
        throw new Error("Erro ao requisitar api")
      }
      setError(null);
      const { id } = await res.json();
      
      navigate({to: "/agenda/$username", params:{username: id}})
    }catch(e:any){
      console.log(e)
      setError(e?.message)
    }
  }

  const handleNameChange = (e:any) => {
      setError(null)
      setName(n => e.target.value)
      console.log(e.target.value)
  }

  return (
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
        </div>
    </div>
  )
}
