import Titulo from "./components/Titulo"
import ListaJogo from "./components/ListaJogo"
import NovoJogo from "./components/NovoJogo"
import './App.css'

import { useEffect, useState } from "react"
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import { Toaster } from "sonner"

function App() {
  const [jogos, setJogos] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jogos")) {
      const jogos2 = JSON.parse(localStorage.getItem("jogos"))
      setJogos(jogos2)
    }
  }, [])

  const listaJogos = jogos.map(jogo => (
    <ListaJogo key={jogo.titulo} jogo={jogo} jogos={jogos} setJogos={setJogos} />
  ))

  return (
    <>
      <Titulo />
      <div className="container">
        <div className="lista-novo">
        <h1>Jogos Disponíveis para Votação</h1>
        <button className="bt-novo" onClick={()=> setOpen(true)}>Cadastrar Jogo</button>
        </div>
        <Modal open={open} onClose={() => setOpen(false)} center>
        <NovoJogo jogos={jogos} setJogos={setJogos} />
        </Modal>
        <div className="grid-container">
          {listaJogos}
        </div>
      </div>
      <Toaster richColors position="top-right" />

    </>
  )
}

export default App
