import { Loader } from 'lucide-react';
import Card from './Card';
import './ListaPokemons.css';

export default function ListaPokemons({ carregando, pokemonsExibidos, setPokemonSelecionado }) {

  // se estiver carregando, exibe uma mensagem
  if (carregando) {
    return (
      <div className="tela-carregamento">
        <Loader className="icone-girando" />
        <p>Buscando Pokémons...</p>
      </div>
    );
  }

  // Se não estiver carregando, mostra a lista
  return (
    <div className="grid-pokemons">
      {pokemonsExibidos.map((pokemon) => (
        <Card key={pokemon.name} nome={pokemon.name} url={pokemon.url}
        onClick= {() => setPokemonSelecionado(pokemon)} />
      ))}
    </div>
  );
}