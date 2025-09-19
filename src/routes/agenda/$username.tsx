import ContatcItem from '@/components/Contacts/ContactItem'
import { createFileRoute } from '@tanstack/react-router'
import { Input } from '@/components/Input'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { ContactAddItem } from '@/components/Contacts/ContactAddItem'
import useSWR, { mutate } from 'swr'
import type { Contact } from '@/core/interfaces/Contact'
export const Route = createFileRoute('/agenda/$username')({
  component: RouteComponent,
})

const fetcher = (url: string) => fetch(url).then(res => res.json());

function RouteComponent() {
  const { username } = Route.useParams()
  const endpoint =`http://localhost:8080/agenda/${username}/contatos`
  const { data, error, isLoading} = useSWR(endpoint, fetcher)

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar</div>;

  return (
    <div className='w-full h-screen bg-black flex justify-center items-center '>
      <div className='flex flex-col h-2/3  gap-12 justify-between items-center w-full '>
        <div className='w-3/11 flex justify-center'>
      <Input
      placeholder='Pesquise por um nome ou número de telefone'
      leftIcon={<FaMagnifyingGlass className='ml-1' color='gray' size={24}/>} 
      className='py-2  text-gray-900 w-full bg-white border-none font-all rounded-full text-lg'  type="text" 
       />
       </div>
    <div className="w-1/4">
      {data?.map((d: Contact, i:number) => (
        <ContatcItem contact={d} key={i} onSuccess={() => mutate(endpoint)} />
      ))}
    </div>
    <ContactAddItem agendaId={username} onSuccess={() => mutate(endpoint)}/>
    </div>
    </div>
  )
}
