import { useState } from "react"
import type { Contact } from "../interfaces/Contact"

interface useContactProps {
    initialValues?:Contact
}

export const useContact = (data?:useContactProps) => {
    const [nome, setNome] = useState<string>(data?.initialValues?.nome || "")
    const [telefone, setTelefone] = useState<string>(data?.initialValues?.telefone || "")
    console.log(telefone)
    const onNomeChange = (e: React.ChangeEvent<HTMLInputElement> ) =>{
        setNome(_ => e.target.value)
    }

    const onTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTelefone(_ => e.target.value)
        console.log(e.target.value)
    }

    

    return {
            nome:{value:nome,onNomeChange},
            telefone:{value: telefone,onTelefoneChange}
           }
}