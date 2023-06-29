import Cliente from "@/core/Cliente"
import ClienteRepositorio from "@/core/ClienteRepositorio"
import ColecaoCliente from "@/firebase/db/ColecaoCliente"
import { useEffect, useState } from "react"
import useTabelaOuForm from "./useTabelaOuForm"

export default function useClientes() {
    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
    const [clientes, setClientes] = useState<Cliente[]>([])

    const {tabelaVisivel, exibirFormulario, exibirTabela} = useTabelaOuForm()
  
    const repo: ClienteRepositorio = new ColecaoCliente()
  
    useEffect(obterTodos, [])
  
    function obterTodos() {
      repo.obterTodos().then((clientes) => {
        setClientes(clientes)
        exibirTabela()
      })
    }
  
    function clienteSelecionado(cliente: Cliente) {
      setCliente(cliente)
      exibirFormulario()
    }
  
    async function clienteExcluido(cliente: Cliente) {
      await repo.excluir(cliente)
      obterTodos()
    }
  
    async function salvarCliente(cliente: Cliente) {
      await repo.salvar(cliente)
      obterTodos()
    }
  
    function novoCliente() {
      setCliente(Cliente.vazio())
      exibirFormulario()
    }

    return {
        salvarCliente,
        novoCliente,
        excluirCliente: clienteExcluido,
        selecionarCliente: clienteSelecionado,
        cliente,
        clientes,
        tabelaVisivel,
        exibirTabela,
    }
}
