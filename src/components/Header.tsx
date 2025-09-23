  import { useTheme } from "@/core/providers/ThemeProvider";
import { Link } from "@tanstack/react-router"
  import { TbColorFilter } from "react-icons/tb"
  export default function Header() {
  const {theme, toggle} = useTheme();
  return (
    <header className="p-2 font-all bg-secondary flex gap-2  text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 text-white text-2xl font-bold flex w-full justify-center">
          <Link to="/">Agenda! </Link>
        </div>
        <div className="absolute right-2 top-2">
        <button
          onClick={toggle}
          aria-label={`Alternar tema (atual: ${theme})`}
          className="p-2 rounded bg-white/10 hover:bg-white/20"
          title={`Tema: ${theme}`}
        >
          <TbColorFilter size={20} color="white" />
        </button>
      </div>
      </nav>
    </header>
  )
}
