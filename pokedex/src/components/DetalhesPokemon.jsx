import { useState, useEffect } from 'react';
import { ArrowLeft, WeightIcon, Ruler, Loader } from 'lucide-react';
import { Progress, Button, Image } from '@chakra-ui/react';
import BadgeTipo from './BadgeTipo';
import { coresDosTipos } from '../utils/cores';
import './BadgeTipo.css'
import './DetalhesPokemon.css'

export default function DetalhesPokemon({ url, voltar }) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);

  //faz a consulta de detalhes do pokemon, com base na URL do pokemon que foi selecionado
  useEffect(() => {
    setCarregando(true);

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setDados(data))
      .finally(() => {
        setCarregando(false);
      })
  }, [url]);

  //se estiver carregando, mostra uma mensagem amigável 
  if (carregando) return <p className='carregando-detalhes'> <Loader /> Carregando detalhes...</p>;

  //captura o tipo principal do pokemon para exibir a cor posteriormente
  const tipoPrincipal = dados.types[0].type.name;

  return (
    <div className='detalhes'>
      {/*botão voltar, para que o usuário possa retornar a lista principal*/}
      <Button className='botao' onClick={voltar}> <ArrowLeft /> Voltar </Button>

      {/*nome e imagem do pokemon*/}
      <h2 className='name'>{dados.name}</h2>
      <div className='fundo' style={{ backgroundColor: coresDosTipos[tipoPrincipal] }}>
        <Image className='imagem' fallbackSrc='https://via.placeholder.com/150?text=Sem+Imagem' src={dados.sprites.other['official-artwork'].front_default} alt={dados.name} />
      </div>

      {/*utiliza o componente BadgeTipo, para exibir os tipos na página de detalhes*/}
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

      {/*habilidades do pokemon*/}
      <div className='habilidades'>
        {dados.abilities.map((habilidade) => (
          <button className='ability' style={{ backgroundColor: coresDosTipos[tipoPrincipal] }}>{habilidade.ability.name}
          </button>
        ))}
      </div>

    </div>
  );
}