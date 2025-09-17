import { BsFillTrash3Fill } from "react-icons/bs"
import { ContactRemoveItem } from "./ContactRemoveItem"
import { ContactEditItem } from "./ContactEditItem"
import type { Contact } from "@/core/interfaces/Contact"

interface ContactItemProps{
    contact:Contact
    onSuccess: () => void
}
export default function ContatcItem({contact,onSuccess}: ContactItemProps){
    return(
        <div className="flex gap-1 text-2xl font-all relative bg-white px-1 items-center  text-black w-full border-2 not-last:border-b-blue-700  first:rounded-t-3xl last:rounded-b-3xl ">
            <div className="w-2/3 p-2 flex  items-center gap-4 border-r-3 border-blue-700 ">
                <span className="rounded-full p-1 w-2/7 text-white font-bold bg-amber-500 text-center">{contact.nome.charAt(0)}</span>
                <span className="font-medium w-full">{contact.nome}</span>
            </div>
            <div className="flex justify-evenly gap-2 items-center w-full px-2 ">
                <span className="w-3/4">{contact.telefone}</span>
                <ContactEditItem contact={contact} onSuccess={onSuccess}/>
                <ContactRemoveItem contact={contact} onSuccess={onSuccess}/>
            </div>
        </div>
    )
}