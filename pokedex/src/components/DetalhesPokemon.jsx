import { useState, useEffect } from 'react';
import { ArrowLeft, WeightIcon, Ruler } from 'lucide-react';
import { Progress } from '@chakra-ui/react';
import BadgeTipo from './BadgeTipo';
import './BadgeTipo.css'
import './DetalhesPokemon.css'

export default function DetalhesPokemon({ url, voltar }) {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setDados(data));
  }, [url]);

  if (!dados) return <p>Carregando detalhes...</p>;

  return (
    <div className='detalhes'>
      <button className='botao' onClick={voltar}> <ArrowLeft /> Voltar </button>

      <h2 className='name'>{dados.name}</h2>
      <img className='imagem' src={dados.sprites.other['official-artwork'].front_default} alt={dados.name} />

      <div className='tipos'>
        {dados.types.map((pokemon) => (
          <BadgeTipo key={pokemon.type.name} tipo={pokemon.type.name}></BadgeTipo>
        ))}

      </div>
      {/*dados de peso e altura*/}
      <div className='fisico'>
        <Ruler color='gray' />{dados.height / 10}m
        <WeightIcon color='gray' />{dados.weight / 10}kg
      </div>

      {/*barras de status*/}
      <div className='status'>
        {dados.stats.map((pokemon) => (
          <div key={pokemon.stat.name}>
            <strong>{pokemon.stat.name}</strong>
            <Progress value={pokemon.base_stat} max={255} borderRadius="md" size="sm"/>
          </div>
        ))}
      </div>

    </div>
  );
}