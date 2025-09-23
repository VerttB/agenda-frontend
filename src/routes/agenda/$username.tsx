import ContactItem from '@/components/Contacts/ContactItem'
import { createFileRoute } from '@tanstack/react-router'
import { Input } from '@/components/Input'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { ContactAddItem } from '@/components/Contacts/ContactAddItem'
import useSWR, { mutate } from 'swr'
import type { Contact } from '@/core/interfaces/Contact'
import { useEffect, useState } from 'react'
export const Route = createFileRoute('/agenda/$username')({
  component: RouteComponent,
})

const fetcher = (url: string) => fetch(url).then(res => res.json());

function RouteComponent() {
  const { username } = Route.useParams()
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
console.log("Render")
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
      <div className="flex flex-col gap-12 w-full max-w-2xl  rounded-xl p-4 mt-8 sm:p-8 items-center">
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
        <div className="xl:w-3/4 w-full flex flex-col gap-2">
          {data?.map((d: Contact, i: number) => (
            <ContactItem contact={d} key={i} onSuccess={() => mutate(endpoint)} />
          ))}
        </div>
        <ContactAddItem agendaId={username} onSuccess={() => mutate(endpoint)} />
      </div>
    </div>
  )
}
