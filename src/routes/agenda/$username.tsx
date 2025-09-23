import ContactItem from '@/components/Contacts/ContactItem'
import { createFileRoute } from '@tanstack/react-router'
import { Input } from '@/components/Input'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { ContactAddItem } from '@/components/Contacts/ContactAddItem'
import useSWR, { mutate } from 'swr'
import type { Contact } from '@/core/interfaces/Contact'
import { memo, useEffect, useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import type { ContactItemProps } from '@/core/interfaces/ContactItemProps'

const labelContacts = (contacts: Contact[]) => {
  const contactMap = new Map<string, Contact[]>();
  contacts.forEach(contact => {
    const firstLetter = contact.nome.charAt(0).toUpperCase();
    if (!contactMap.has(firstLetter)) {
      contactMap.set(firstLetter, []);
    }
    contactMap.get(firstLetter)!.push(contact);
  });

  const contactSorted = Array.from(contactMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  console.log(contactSorted)
  const contactMapSorted = new Map<string, Contact[]>(contactSorted);
  return contactMapSorted;
}


export const Route = createFileRoute('/agenda/$username')({
  component: RouteComponent,
})

const fetcher = (url: string) => fetch(url).then(res => res.json());

function RouteComponent() {
  const { username } = Route.useParams()
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);
    return () => clearTimeout(handler);
  }, [search]);

   const endpoint =
    debouncedSearch.trim().length > 0
      ? `http://localhost:8080/agenda/${username}/contatos?nome=${encodeURIComponent(debouncedSearch)}&telefone=${encodeURIComponent(debouncedSearch)}`
      : `http://localhost:8080/agenda/${username}/contatos`;

  const { data, error, isLoading } = useSWR(endpoint, fetcher);

  if (error) return <div>Erro ao carregar</div>;

  return (
    <div className="w-full min-h-screen bg-black flex justify-center  px-2 py-4">
      <div className="flex flex-col gap-12 w-full max-w-2xl rounded-xl p-4 mt-8 sm:p-8 items-center">
        <div className=" xl:w-2/3 w-full flex justify-center">
          <Input
            placeholder="Pesquise por um nome ou número de telefone"
            leftIcon={<FaMagnifyingGlass className="ml-1" color="gray" size={20} />}
            className="py-2 text-gray-900 w-full bg-white border-none font-all rounded-full text-lg"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="xl:w-4/5 w-full flex items-center overflow-y-auto flex-col gap-2">
        {isLoading && <div className='flex justify-center'><CgSpinner className='animate-spin' size={48} color='white'/></div>}
          {data && (
            
            Array.from(labelContacts(data)).map(([letter, contacts]) => (
            <div key={letter} className="flex flex-col w-full gap-2">
              <h2 className="text-white font-bold text-2xl">{letter}</h2>
              {contacts.map(contact => (
                <ContactItem contact={contact} key={contact.id} onSuccess={() => mutate(endpoint)} />
              ))}
            </div>
          )))}
        <ContactAddItem agendaId={username} onSuccess={() => mutate(endpoint)} />
      </div>
    </div>
    </div>
  )
}
