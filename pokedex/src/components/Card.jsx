import { useState, useEffect } from 'react';
import BadgeTipo from './BadgeTipo';
import './Card.css';
import './BadgeTipo.css';

export default function Card({ nome, url, onClick }) {
  const [detalhes, setDetalhes] = useState(null);

  //faz a consulta na API, com base na URL de cada pokemon retornada da primeira consulta.
  useEffect(() => {
    fetch(url)
      .then((resposta) => resposta.json())
      .then((dados) => setDetalhes(dados))
      .catch((erro) => console.error("Erro ao buscar detalhes:", erro));
  }, [url]);

  if (!detalhes) {
    return <li className="card" >Carregando {nome}...</li>;
  }

    const idFormatado = String(detalhes.id).padStart(3, '0');

  return (
    <div className="card" onClick={onClick}>
      <p className='id'>#{idFormatado}</p>
      <img
        src={detalhes.sprites.other['official-artwork'].front_default}
        alt={`${nome} sprite`}
        className="sprite"
      />
      <p className='nome'>{nome}</p>

      {/* Estrutura os badges de tipo*/}
      <div className='tipos'>
        {detalhes.types.map((pokemon) => (
         <BadgeTipo key={pokemon.type.name} tipo={pokemon.type.name}/>
        ))}
      </div>
    </div>
  );
}