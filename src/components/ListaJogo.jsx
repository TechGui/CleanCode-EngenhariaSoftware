import './ListaJogo.css';
import { FaCheck } from "react-icons/fa";
import { toast } from 'sonner';

function ListaJogo({ jogo, jogos, setJogos }) {
// Aplicação do princípio KISS para simplificar a função avaliaJogo().
  function avaliaJogo() {
  const email = prompt(`Digite seu email aqui para votar em ${jogo.nome}:`);
  // Um email vazio já é inválido, portanto não há necessidade da verificação de e-mail vazio.
  if (!validaEmail(email)) {
    toast.error("Email inválido ou ação cancelada!");
    return;
  }

  if (jogo.email.includes(email)) {
    toast.error("Email já votou nesse jogo!");
    return;
  }

  // Substituí o prompt de confirmação por um confirm simples, que retorna um booleano, reduzindo a complexidade e a quantidade de código.
  const confirmacao = confirm(`Confirmar voto em ${jogo.nome}?`);
  if (!confirmacao) {
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

// A função validaEmail() encapsula a lógica de validação do e-mail, deixando a função principal mais limpa.
function validaEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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
