import { useState, useEffect } from 'react';
import { Image } from '@chakra-ui/react';
import BadgeTipo from './BadgeTipo';
import { coresDosTipos } from '../utils/cores';
import './Card.css';
import './BadgeTipo.css';

export default function Card({ nome, url, onClick}) {
  const [detalhes, setDetalhes] = useState(null);

  //faz a consulta na API, com base na URL de cada pokemon retornada da consulta na lista principal.
  useEffect(() => {
    fetch(url)
      .then((resposta) => resposta.json())
      .then((dados) => setDetalhes(dados))
  }, [url]);

  if (!detalhes) {
    return <li className="card" >Carregando {nome}...</li>;
  }
    //captura o tipo principal do pokemon para exibir a cor posteriormente
    const tipoPrincipal = detalhes.types[0].type.name;
    //formata o id do pokemon, para manter o padrão de 3 numeros. Por exemplo: 
    const idFormatado = String(detalhes.id).padStart(3, '0');

  return (
    
    <div className='card' onClick={onClick}>
      
      {/*imagem do card*/}
      <div className="fundo" style={{backgroundColor: coresDosTipos[tipoPrincipal]}}>
      <Image
        src={detalhes.sprites.other['official-artwork'].front_default}
        fallbackSrc='https://via.placeholder.com/150?text=Sem+Imagem'
        alt={`${nome} sprite`}
        className='sprite'/>
      </div>
      
      {/*nome e id formatado do pokemon*/}
      <p className='id'>#{idFormatado}</p>
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