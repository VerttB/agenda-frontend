import ContatcItem from '@/components/Contacts/ContactItem'
import { createFileRoute } from '@tanstack/react-router'
import { Input } from '@/components/Input'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { ContactAddItem } from '@/components/Contacts/ContactAddItem'
export const Route = createFileRoute('/agenda/$username')({
  component: RouteComponent,
})


function RouteComponent() {
  const { username } = Route.useParams()
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
    <div className='flex w-2/7 flex-col p-0 m-0 content-start justify-start align-top gap-0 overflow-y-scroll'>
      {Array.from({length: 15}).map((_,i) =>  <ContatcItem key={i}/>)}
    </div>
    <ContactAddItem/>
    </div>
    </div>
  )
}
