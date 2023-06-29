import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";
import firebase from "../config";

export default class ColecaoCliente implements ClienteRepositorio {
    // existe o conversor no firebase que tem dois metodos
    // um dos o toFirestore ele devolve um objeto que pode ser salvo no banco de dados

    #conversor = {
        toFirestore(cliente: Cliente) {
            return {
                nome: cliente.nome,
                idade: cliente.idade,
            }
        },
        // este outro devolve um snapshot, aqui eu recebo o dados do firebase e quero retornar um objeto que aqui no caso é um cliente
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Cliente {
            const dados = snapshot.data(options)
            return new Cliente(dados.nome, dados.idade, snapshot.id)
        }
        }

    async salvar(cliente: Cliente): Promise<Cliente> {
        if(cliente?.id) {
            await this.colecao().doc(cliente.id).set(cliente)
            return cliente
        } else {
            const docRef = await this.colecao().add(cliente)
            const doc = await docRef.get()
            const abc = doc.data()
            if (abc !== undefined) return abc
            return new Cliente('', 0, '')
        }
    }
    async excluir(cliente: Cliente): Promise<void> {
        return this.colecao().doc(cliente.id).delete()
    }
    async obterTodos(): Promise<Cliente[]> {
        const query = await this.colecao().get()
        return query.docs.map(doc => doc.data()) ?? []
    }

    private colecao() {
        return firebase.firestore().collection('clientes').withConverter(this.#conversor)
    }
    
}