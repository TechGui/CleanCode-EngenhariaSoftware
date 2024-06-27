import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

import './NovoJogo.css'

function NovoJogo({jogos, setJogos}) {
  const { register, handleSubmit, reset, setFocus } = useForm()

  function cadastraJogo(dados) {
    const jogos2 = [...jogos]
    jogos2.push({
      nome: dados.nome,
      desenvolvedora: dados.desenvolvedora,
      genero: dados.genero,
      anoLancamento: dados.anoLancamento,
      foto: dados.foto,
      voto: 0,
      votoConfirmacao: 0,
      email: []
    })

    setJogos(jogos2)
    toast.success(`Ok! O Jogo ${dados.nome} foi Cadastrado com Sucesso!`)

    setFocus("nome")
    reset()

    localStorage.setItem("jogos", JSON.stringify(jogos2))
  }

  useEffect(() => {
    setFocus("nome")
  }, [])

  return (
    <>
      <div className="cadastra__jogo">
      <h3>Formulário para Inclusão de Jogos</h3>
      <form onSubmit={handleSubmit(cadastraJogo)}>
        <p>
          <label htmlFor="nome">Nome do Jogo:</label>
          <input type="text" id="nome" size={40}  required
            {...register("nome")} />
        </p>
        <p>
          <label htmlFor="desenvolvedora">Desenvolvedora:</label>
          <input type="text" id="desenvolvedora" required
            {...register("desenvolvedora")} size={30} step={0.01} min={0.01} />
        </p>
        <p>
          <label htmlFor="genero">Gênero do Jogo:</label>
          <input type="text" id="genero" required
            {...register("genero")} size={30} step={0.01} min={0.01} />
        </p>
        <p>
        <label htmlFor="anoLancamento">Ano de Lançamento:</label>
        <input type="number" id="anoLancamento" required
        {...register("anoLancamento")} min={1900} />
        </p>
        <p>
          <label htmlFor="foto">URL da Foto:</label>
          <input type="text" id="foto" size={60} required
            {...register("foto")} />
        </p>
        <input type="submit" value="Cadastrar" />
      </form>
      </div>
    </>
  )
}

export default NovoJogo