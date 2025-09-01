import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center h-lvh bg-black px-4 py-6 font-all ">
      <div className='flex flex-col h-full items-center gap-16 justify-center text-white'>
        <h1 className='text-5xl font-extrabold w-2/3'>Adicione o seu nome para ter acesso a Agenda virtual!</h1>
        <input placeholder='Nome' className='p-4 text-gray-900 w-1/3 bg-white border-4 border-blue-700 rounded-full'  type="text" />
        <button className=' cursor-pointer bg-green-500 hover:bg-green-400 text-2xl w-1/6 rounded-full p-4'>Salvar</button>
        </div>
    </div>
  )
}
