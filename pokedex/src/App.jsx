import { useState, useEffect } from 'react';

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((resposta) => resposta.json())
      .then((dados) => {
        setPokemonList(dados.results);
        setCarregando(false);
      })
      .catch((erro) => console.error("Erro na requisição:", erro));
  }, []);

  if (carregando) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Lista de Pokémon</h1>
      <ul className='lista'>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}