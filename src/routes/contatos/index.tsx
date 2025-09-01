import ContatcItem from '@/components/Contacts/ContactItem'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contatos/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
    <ContatcItem/>
    </div>
  )
}
