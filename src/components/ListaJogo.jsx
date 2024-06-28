import './ListaJogo.css'
import { FaCheck } from "react-icons/fa";
import { toast } from 'sonner'

function ListaJogo({jogo, jogos, setJogos}) {

  function avaliaJogo() {
    let votoConfirmacao = 0
    
    const email = prompt("Digite seu email aqui para votar em " + jogo.nome + ":");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === null) {
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Email inválido!");
      return;
    } else {

    if (jogo.email.includes(email)) {
      toast.error("Email já votou nesse jogo!");
      return;
    }

    votoConfirmacao = Number(prompt(`Digite 1 para confirmar o voto em ${jogo.nome} ou 0 para cancelar: `));

    if (votoConfirmacao !== 1) {
      toast.error(`Voto cancelado em ${jogo.nome}!`)
      return;
    }

    votoConfirmacao === 1 

    const jogos2 = [...jogos];

    const indice = jogos2.findIndex((x) => x.nome === jogo.nome);

    jogos2[indice].votoConfirmacao = votoConfirmacao;
    jogos2[indice].voto += 1;
    jogos2[indice].email.push(email);

    setJogos(jogos2);

    localStorage.setItem("jogos", JSON.stringify(jogos2));

    toast.success(`Voto confirmado em ${jogo.nome}!`)

  }
  }

  function mostraEmails() {
    const espacamentoEmails = jogo.email.join(", ");
    alert(`Emails que votaram em ${jogo.nome}:\n${espacamentoEmails}`);

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
            <p className='botaoemai'><button className='botao_ver-emails' onClick={mostraEmails}>Ver detalhes...</button></p>
            <p className='votos'>{jogo.voto} votos </p>
          </div>  
        }        
      </div>
    </div>
  )
}

export default ListaJogo