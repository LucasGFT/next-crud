import Cliente from "../core/Cliente"
import { IconeEdicao, IconeLixo } from "./Icones"

interface TabelaProps {
    clientes: Cliente[]
    clienteSelecionado?: (cliente: Cliente) => void
    clienteExcluido?: (cliente: Cliente) => void
}

export default function Tabela(props: TabelaProps) {

    const exibirAcoes = props.clienteExcluido || props.clienteSelecionado


    function renderizarCabecalho() {
        return (
            <tr>
                <th className="text-left p-4">Código</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Idade</th>
                {exibirAcoes && <th className="p-4">Ações</th>}
            </tr>
        )
    }

    function renderizarAcoes(cliente: Cliente) {
        return (
            <td className="flex justify-center">
                {props.clienteSelecionado ? (
                    <button onClick={() => props.clienteSelecionado?.(cliente)} className={
                        `flex justify-center items-center
                        text-green-600 rounded-full p-2 m-1 hover:bg-purple-50`
                    }>{IconeEdicao}</button>
                ) : false}
                {props.clienteExcluido ? (
                    <button onClick={() => props.clienteExcluido?.(cliente)} className={
                        `flex justify-center items-center
                        text-red-500 rounded-full p-2 m-1 hover:bg-purple-50`
                    }>{IconeLixo}</button>
                ) : false}
            </td>
        )
    }

    function renderizarDados() {
        return props.clientes?.map((element, index) => {
            return (
                <tr key={`${element.id}${index}`} className={`${index % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
                    <td className="text-left p-4">{element.id}</td>
                    <td className="text-left p-4">{element.nome}</td>
                    <td className="text-left p-4">{element.idade}</td>
                    {exibirAcoes && renderizarAcoes(element)}
                </tr>
            )
        })
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`
                text-gray-100
                bg-gradient-to-r from-purple-500 to-purple-800
            `}>
                {renderizarCabecalho()}
            </thead>
            <tbody>
                {renderizarDados()}
            </tbody>
        </table>
    )
}
