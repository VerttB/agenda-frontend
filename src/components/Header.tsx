import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="p-2 font-all bg-header flex gap-2  text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 text-white text-2xl font-bold flex w-full justify-center">
          <p>Agenda! </p>
        </div>
      </nav>
    </header>
  )
}
