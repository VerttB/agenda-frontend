import type { Contact } from "./Contact";

export interface ContactItemProps {
  contact: Contact;
  onSuccess: () => void;
}