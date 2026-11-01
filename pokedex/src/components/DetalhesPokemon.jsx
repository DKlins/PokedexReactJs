import { useState, useEffect } from 'react';
import { ArrowLeft, WeightIcon, Ruler } from 'lucide-react';
import { Progress, Button } from '@chakra-ui/react';
import BadgeTipo from './BadgeTipo';
import { coresDosTipos } from '../utils/cores';
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

  //captura o tipo principal do pokemon para exibir a cor posteriormente
  const tipoPrincipal = dados.types[0].type.name;

  return (
    <div className='detalhes'>
      <Button className='botao' onClick={voltar}> <ArrowLeft /> Voltar </Button>

      <h2 className='name'>{dados.name}</h2>
      <div className='fundo' style={{ backgroundColor: coresDosTipos[tipoPrincipal] }}>
        <img className='imagem' src={dados.sprites.other['official-artwork'].front_default} alt={dados.name} />
      </div>

      <div className='tipos' >
        {dados.types.map((pokemon) => (
          <BadgeTipo key={pokemon.type.name} tipo={pokemon.type.name}></BadgeTipo>
        ))}

      </div>
      {/*dados de peso e altura*/}
      <div className='fisico'>
        <div className='peso-altura'>
        <Ruler color='gray' />{dados.height / 10}m
        </div>
        <div className='peso-altura'>
        <WeightIcon color='gray' />{dados.weight / 10}kg
        </div>
      </div>

      {/*barras de status*/}
      <div className='status'>
        {dados.stats.map((pokemon) => (

          <div key={pokemon.stat.name}>

            <div className='nome-status'>
              <strong>{pokemon.stat.name}</strong>
            </div>

            <Progress value={pokemon.base_stat} max={255} borderRadius="md" size="sm" sx={{
              '& > div': {
                backgroundColor: coresDosTipos[tipoPrincipal]
              }
            }} />

            <div className='valor'>
              {pokemon.base_stat}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}