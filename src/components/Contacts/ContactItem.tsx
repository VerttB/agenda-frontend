export default function ContatcItem(){
    return(
        <div className="flex gap-1  px-1 items-center text-black w-1/5 rounded-full border-2 ">
            <div className="w-1/3 py-2 flex justify-center  border-r-2 border-blue-500 ">Icone teste</div>
            <div className="flex justify-evenly w-full">
                <p>Telefone</p>
                <p>Lixeira</p>
            </div>
        </div>
    )
}