import { useState, useEffect } from 'react';
import BarraBusca from './components/Busca';
import Card from './components/Card';
import FiltroTipo from './components/FiltroTipo';
import './App.css';


export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [busca, setBusca] = useState("")
  const [tipo, setTipo] = useState("");
  const [carregando, setCarregando] = useState(true);

  const pokemonFiltrados = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(busca.toLowerCase())
  );

  useEffect(() => {
    setCarregando(true);

    if (tipo === "") {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((resposta) => resposta.json())
      .then((dados) => {
        setPokemonList(dados.results);
        setCarregando(false);
      })
      .catch((erro) => console.error("Erro na requisição:", erro));
  }
    else{
      fetch(`https://pokeapi.co/api/v2/type/${tipo}`)
          .then((resposta) => resposta.json())
          .then((dados) => {
            // O map abaixo serve para "desempacotar" e deixar no formato que o Card já entende.
            const pokemonsDesempacotados = dados.pokemon.map((item) => item.pokemon);
            setPokemonList(pokemonsDesempacotados);
            setCarregando(false);
          })
          .catch((erro) => console.error("Erro:", erro));
      }
  },[tipo]);

    

  if (carregando) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Pokedex</h1>

      <BarraBusca busca={busca} setBusca={setBusca} />
      <FiltroTipo tipo={tipo} setTipoSelec={setTipo}/>

      <ul className='grid-pokemon'>
        {pokemonFiltrados.map((pokemon, index) => (
        <Card key={index} nome={pokemon.name} url={pokemon.url}/>
        ))}
      </ul>
    </div>
  );
}