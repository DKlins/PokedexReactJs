import { useState, useEffect } from 'react';
import './Card.css';

export default function Card({ nome, url }) {
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

  return (
    <li className="card">
      <img
        src={detalhes.sprites.other['official-artwork'].front_default}
        alt={`${nome} sprite`}
        className="sprite"
      />
      <p>{nome}</p>
    </li>
  );
}