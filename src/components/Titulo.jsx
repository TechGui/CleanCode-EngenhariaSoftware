import './Titulo.css'

function Titulo() {
  return (
    <div className="titulo">
      <img src="./logo.png" alt="Logo" className='logo' />
      <div>
        <h1>Gerenciador de Games</h1>
        <h2>Sistema de Votação para Lançamentos de 2024</h2>
      </div>
    </div>
  )
}

export default Titulo