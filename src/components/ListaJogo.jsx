// Fiz alterações em toda a estrutura do código, usando o princípio de YAGNI, para simplificar o código e torná-lo mais limpo e legível.

import './ListaJogo.css';
import { FaCheck } from "react-icons/fa";
import { toast } from 'sonner';

function ListaJogo({ jogo, jogos, setJogos }) {

  function avaliaJogo() {
    const email = prompt("Digite seu email aqui para votar em " + jogo.nome + ":");
    if (email === null) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Email inválido!");
      return;
    }

    if (jogo.email.includes(email)) {
      toast.error("Email já votou nesse jogo!");
      return;
    }

    const votoConfirmacao = Number(prompt(`Digite 1 para confirmar o voto em ${jogo.nome} ou 0 para cancelar: `));
    if (votoConfirmacao !== 1) {
      toast.error(`Voto cancelado em ${jogo.nome}!`);
      return;
    }

    const jogosAtualizados = jogos.map((j) => {
      if (j.nome === jogo.nome) {
        return {
          ...j,
          votoConfirmacao: 1,
          voto: j.voto + 1,
          email: [...j.email, email],
        };
      }
      return j;
    });

    setJogos(jogosAtualizados);
    localStorage.setItem("jogos", JSON.stringify(jogosAtualizados));
    toast.success(`Voto confirmado em ${jogo.nome}!`);
  }

  return (
    <div className="grid-item">
      <img src={jogo.foto} alt="jogo" className='foto'/>
      <div className='lista_descricao'>
        <h3>{jogo.nome}</h3>
        <p className='desenvolvedora'>{jogo.desenvolvedora}</p>
        <p className='genero'>{jogo.genero}</p>
        <p className='anoLancamento'>Ano de Lançamento: {jogo.anoLancamento}</p>
        <p><button onClick={avaliaJogo}>Votar em {jogo.nome} <FaCheck /></button></p>
        {jogo.votoConfirmacao === 0 ?
          <img src="./novo.png" alt="Novidade" className='novidade'/>
          :
          <div className='votacao_detalhes'>
            <p className='botaoemai'><button className='botao_ver-emails' onClick={() => alert(`Emails que votaram em ${jogo.nome}:\n${jogo.email.join(", ")}`)}>Ver detalhes...</button></p>
            <p className='votos'>{jogo.voto} votos </p>
          </div>  
        }        
      </div>
    </div>
  )
}

export default ListaJogo;
