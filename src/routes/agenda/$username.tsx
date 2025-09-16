import ContatcItem from '@/components/Contacts/ContactItem'
import { createFileRoute } from '@tanstack/react-router'
import { Input } from '@/components/Input'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { ContactAddItem } from '@/components/Contacts/ContactAddItem'
import type { Contact } from '@/core/interfaces/Contact'
import { useEffect } from 'react'
export const Route = createFileRoute('/agenda/$username')({
  component: RouteComponent,
})

const labelContact = (contact: Contact[]) => {
  const labelsAndValues = new Map()
  contact.forEach((value,index) => {
    const firstLetter =  value.nome.charAt(0).toLowerCase()

    const hashExists = labelsAndValues.get(firstLetter)
    if(hashExists){
      hashExists.push(value)
      labelsAndValues.set(firstLetter, hashExists)
    }else{
      labelsAndValues.set(firstLetter, [value])
    }

    

  })
  return labelsAndValues
}
const contactList = [
  {
    "id": "1",
    "nome": "Maria Silva",
    "telefone": "11987654321"
  },
  {
    "id": "2",
    "nome": "João Santos",
    "telefone": "21998765432"
  },
  {
    "id": "3",
    "nome": "Ana Oliveira",
    "telefone": "31976543210"
  },
  {
    "id": "4",
    "nome": "Pedro Costa",
    "telefone": "41965432109"
  },
  {
    "id": "5",
    "nome": "Juliana Lima",
    "telefone": "51954321098"
  },
   {
    "id": "6",
    "nome": "Gustavo Almeida",
    "telefone": "61987654321"
  },
  {
    "id": "7",
    "nome": "Gabriel Barbosa",
    "telefone": "62998765432"
  },
  {
    "id": "8",
    "nome": "Guilherme Costa",
    "telefone": "63976543210"
  },
  {
    "id": "9",
    "nome": "Isabela Dias",
    "telefone": "64965432109"
  },
  {
    "id": "10",
    "nome": "Igor Eduardo",
    "telefone": "65954321098"
  },
  {
    "id": "11",
    "nome": "Isadora Fernandes",
    "telefone": "66954321098"
  }
]

function RouteComponent() {
  const { username } = Route.useParams()
  const full =  Array.from(labelContact(contactList))

  console.log(full)

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
      {full.map(hash => 
              hash.map((contact, index) => {
                console.log(contact)
                return <p></p>
              }
            )}
    </div>
    <ContactAddItem/>
    </div>
    </div>
  )
}
