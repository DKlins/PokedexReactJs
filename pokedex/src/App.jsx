import { useState, useEffect } from 'react';
import BarraBusca from './components/Busca';
import FiltroTipo from './components/FiltroTipo';
import './App.css';
import Paginacao from './components/Paginacao';
import ListaPokemons from './components/ListaPokemons';
import DetalhesPokemon from './components/DetalhesPokemon';

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [busca, setBusca] = useState("")
  const [tipo, setTipo] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null);
  const itensPorPagina = 20;
  const [carregando, setCarregando] = useState(true);

  // filtra a lista de pokemon, adicionando apenas aqueles que contem as letras que o usuário digitou na busca
  const pokemonFiltrados = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(busca.toLowerCase())
  );

  //delimita o index dos primeiros e ultimos itens
  const UltimoItem = paginaAtual * itensPorPagina;
  const PrimeiroItem = UltimoItem - itensPorPagina;

  //corta a lista completa filtrada anteriormente, guardando somente os que serão exibidos nessa página
  const pokemonsExibidos = pokemonFiltrados.slice(PrimeiroItem, UltimoItem);


  useEffect(() => {
    setCarregando(true);

    //analisa se algum tipo foi selecionado, se não foi seguirá por aqui
    if (tipo === "") {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
        .then((resposta) => resposta.json())
        .then((dados) => {
          setPokemonList(dados.results);
          setCarregando(false);
        })
        .catch((erro) => console.error("Erro na requisição:", erro));
    }
    //selecionando algum tipo, seguirá por aqui
    else {
      fetch(`https://pokeapi.co/api/v2/type/${tipo}`)
        .then((resposta) => resposta.json())
        .then((dados) => {
          console.log(dados)
          // já que a consulta por tipo entrega os dados de maneira um pouco diferente, o map abaixo serve para "desempacotar" e deixar no formato que o Card já entende.
          const pokemonsDesempacotados = dados.pokemon.map((item) => item.pokemon);

          //consulta se o id presente na url do pokemon é menor ou igual a 1025, se for ele é adicionado na lista
          const pokemonsOriginais = pokemonsDesempacotados.filter(
            (item) => item.url.split('/').at(-2) <= 1025
          );
          setPokemonList(pokemonsOriginais);
          setCarregando(false);
        })
        .catch((erro) => console.error("Erro:", erro));
    }
  }, [tipo]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [busca, tipo])


  return (
    <div>
      <h1>Pokedex</h1>

      {/*se tiver algum pokemon selecionado, mostra os detalhes*/}
      {pokemonSelecionado ? (
      <DetalhesPokemon url={pokemonSelecionado.url} 
      voltar={() => setPokemonSelecionado(null)} />
      ) : (

      //se não, mostra a tela principal
      <>
      <p> Mostrando {pokemonFiltrados.length} pokémons </p>

      <BarraBusca busca={busca} setBusca={setBusca} />
      <FiltroTipo tipo={tipo} setTipoSelec={setTipo} />

      <ListaPokemons carregando={carregando} pokemonsExibidos={pokemonsExibidos} setPokemonSelecionado={setPokemonSelecionado} />

      <Paginacao paginaAtual={paginaAtual} setPaginaAtual={setPaginaAtual}
      //faz a divisão do total de paginas, se o numero for 0, retorna 1. "Math ceil" força que o numero de paginas sejam arredondados para maior
      TotalPaginas={Math.max(1, Math.ceil(pokemonFiltrados.length / itensPorPagina))} />
      </>
      )}
    </div>
  );
}