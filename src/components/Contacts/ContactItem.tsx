import { BsFillTrash3Fill } from "react-icons/bs"
export default function ContatcItem(){
    return(
        <div className="flex gap-1 text-2xl font-all relative bg-white px-1 items-center  text-black w-full border-2 not-last:border-b-blue-700  first:rounded-t-3xl last:rounded-b-3xl ">
            <div className="w-1/2 p-2 flex  items-center gap-4 border-r-3 border-blue-700 ">
                <span className="rounded-full p-1 w-2/7 text-white font-bold bg-amber-500 text-center">P</span>
                <span className="font-bold">Pedro</span>
            </div>
            <div className="flex justify-evenly items-center w-full ">
                <span className="w-3/4">(71) 9 9699-0000</span>
                <BsFillTrash3Fill fontSize={32} color="#b41919"/>
            </div>
        </div>
    )
}