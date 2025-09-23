import { ContactRemoveItem } from "./ContactRemoveItem";
import { ContactEditItem } from "./ContactEditItem";
import type { Contact } from "@/core/interfaces/Contact";
import { formatTel } from "@/core/utils/formatTel";

interface ContactItemProps {
  contact: Contact;
  onSuccess: () => void;
}

export default function ContactItem({ contact, onSuccess }: ContactItemProps) {
  return (
    <div
      className="flex flex-row items-center w-full bg-white border-b-2 border-blue-700 last:rounded-b-3xl first:rounded-t-3xl shadow-sm px-2 py-2 transition hover:bg-blue-50"
      aria-label={`Contato: ${contact.nome}`}
    >
      <div className="flex items-center gap-3 min-w-[140px] max-w-[180px] border-r-2 border-blue-700 pr-3">
        <span
          className="rounded-full w-10 h-10 flex items-center justify-center text-white font-bold bg-amber-500 text-lg"
          aria-label={`Inicial do nome: ${contact.nome.charAt(0)}`}
        >
          {contact.nome.charAt(0)}
        </span>
        <span className="font-medium truncate" title={contact.nome}>
          {contact.nome}
        </span>
      </div>
      <div className="flex flex-1 items-center gap-2 justify-between pl-3 min-w-0">
        <span className="font-bold text-base sm:text-lg text-gray-700 truncate" title={contact.telefone}>
          {formatTel(contact.telefone)}
        </span>
        <div className="flex gap-2 sm:gap-4 pl-2">
          <ContactEditItem contact={contact} onSuccess={onSuccess} />
          <ContactRemoveItem contact={contact} onSuccess={onSuccess} />
        </div>
      </div>
    </div>
  );
}