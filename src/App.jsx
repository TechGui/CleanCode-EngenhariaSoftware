import React, { useEffect, useState } from 'react';
import Titulo from "./components/Titulo";
import ListaJogo from "./components/ListaJogo";
import NovoJogo from "./components/NovoJogo";
import './App.css';
import 'react-responsive-modal/styles.css';
import { Toaster } from "sonner";
import { Modal } from 'react-responsive-modal';

function App() {
  const [jogos, setJogos] = useState([]);
  const [openNovoJogo, setOpenNovoJogo] = useState(false);
  const [openRanking, setOpenRanking] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jogos")) {
      const jogos2 = JSON.parse(localStorage.getItem("jogos"));
      setJogos(jogos2);
    }
  }, []);

  const ordenarJogosPorVotos = (jogos) => {
    return jogos.sort((a, b) => b.voto - a.voto);
  }

  const listaJogos = ordenarJogosPorVotos(jogos).map(jogo => (
    <ListaJogo key={jogo.nome} jogo={jogo} jogos={jogos} setJogos={setJogos} />
  ));

  const jogosOrdenados = [...jogos].sort((a, b) => b.voto - a.voto);

  return (
    <>
      <Titulo />
      <div className="container">
        <div className="lista-novo">
          <h1>Jogos Disponíveis para Votação</h1>
          <button className="bt-novo" onClick={() => setOpenNovoJogo(true)}>Cadastrar Jogo</button>
          <button className="bt-ranking" onClick={() => setOpenRanking(true)}>Ver Ranking</button>
        </div>
        <Modal open={openNovoJogo} onClose={() => setOpenNovoJogo(false)} center>
          <NovoJogo jogos={jogos} setJogos={setJogos} />
        </Modal>
        
    
        <Modal open={openRanking} onClose={() => setOpenRanking(false)} center>
          <h2 className ="titulo-ranking">Ranking dos Jogos</h2>
          <div className="ranking-container">
            {jogosOrdenados.map((jogo, index) => (
              <div key={jogo.nome} className="ranking-item">
                <span>{index + 1}. {jogo.nome} - {jogo.voto} votos</span>
              </div>
            ))}
          </div>
        </Modal>
        <div className="grid-container">
          {listaJogos}
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
