import { useState, useEffect } from 'react';
import Busca from './components/Busca';
import FiltroTipo from './components/FiltroTipo';
import Paginacao from './components/Paginacao';
import ListaPokemons from './components/ListaPokemons';
import DetalhesPokemon from './components/DetalhesPokemon';
import IconePokebola from './assets/pokebola-preta.png'
import './App.css';

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [busca, setBusca] = useState("")
  const [tipo, setTipo] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erroConexao, setErroConexao] = useState(false);
  const itensPorPagina = 20;

  // filtra a lista de pokemon, adicionando apenas aqueles que contem as letras que o usuário digitou na busca
  const pokemonFiltrados = pokemonList.filter((pokemon) =>
    pokemon.name.includes(busca.toLowerCase())
  );

  //delimita o index dos primeiros e ultimos itens
  const UltimoItem = paginaAtual * itensPorPagina;
  const PrimeiroItem = UltimoItem - itensPorPagina;

  //corta a lista completa filtrada anteriormente, guardando somente os que serão exibidos nessa página
  const pokemonsExibidos = pokemonFiltrados.slice(PrimeiroItem, UltimoItem);


  useEffect(() => {
    setCarregando(true);
    setErroConexao(false);

    //analisa se algum tipo foi selecionado, se não foi seguirá por aqui
    if (tipo === "") {

      fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
        .then((resposta) => resposta.json())
        .then((dados) => {
          setPokemonList(dados.results);
        })
        .catch(() => {
          setErroConexao(true);
        })
        .finally(() => {
          setCarregando(false);
        });
    }
    //selecionando algum tipo, seguirá por aqui
    else {
      fetch(`https://pokeapi.co/api/v2/type/${tipo}`)
        .then((resposta) => resposta.json())
        .then((dados) => {
          // já que a consulta por tipo entrega os dados de maneira um pouco diferente, o map abaixo serve para "desempacotar" e deixar no formato que o Card já entende.
          const pokemonsDesempacotados = dados.pokemon.map((item) => item.pokemon);

          //consulta se o id presente na url do pokemon é menor ou igual a 1025, se for ele é adicionado na lista
          const pokemonsOriginais = pokemonsDesempacotados.filter(
            (item) => item.url.split('/').at(-2) <= 1025
          );
          setPokemonList(pokemonsOriginais);
        })
        .catch(() => {
          setErroConexao(true);
        })
        .finally(() => {
          setCarregando(false);
        });
    }
  }, [tipo]);

  //toda vez que tiver uma mudança na barra de busca, ou na seleção do tipo, a página atual será atualizada para 1.
  useEffect(() => {
    setPaginaAtual(1);
  }, [busca, tipo])


  return (
    <div>
      {/*cabeçalho da aplicação*/}
      <div className='cabecalho'>
        <img className='icon' src={IconePokebola} alt="pokebola" />
        <strong className='titulo'>Pokédex</strong>
      </div>

      {/*se tiver algum pokemon selecionado, mostra os detalhes*/}
      {pokemonSelecionado ? (
        <DetalhesPokemon url={pokemonSelecionado.url}
          voltar={() => setPokemonSelecionado(null)} />
      ) : (

        //se não, mostra a tela principal
        <>
          {/*aqui fica o container de buscar e de seleção de tipo*/}
          <div className='container-busca'>
            <Busca busca={busca} setBusca={setBusca} />
            <FiltroTipo tipo={tipo} setTipoSelec={setTipo} />
          </div>

          {/*mensagem amigavel que mostra a quantidade pokemons na pesquisa*/}
          <p className='info'>
            Mostrando {pokemonFiltrados.length} pokémons
            {tipo !== "" && (<span> do tipo <span className="texto-maiusculo">{tipo}</span></span>)}
          </p>

          {/*tratamento de erro caso o pokemon digitado na busca, não se encontre na lista*/}
          {busca.length > 0 && pokemonFiltrados.length === 0 && (
            <div className="alerta">
              ⚠️ Ops! Nenhum Pokémon encontrado com o nome "{busca}"
              {tipo !== "" && (<span> do tipo <strong className="texto-maiusculo">{tipo}</strong></span>)}
            </div>
          )}

          {/*tratamento de erro caso o usuário fique sem conexão a internet*/}
          {erroConexao && (
            <div className="alerta">
              📡 Ops! Parece que você está sem internet. Verifique sua conexão.
            </div>
          )}

          {/*aqui existe a lista de pokemons*/}
          <ListaPokemons carregando={carregando} pokemonsExibidos={pokemonsExibidos} setPokemonSelecionado={setPokemonSelecionado} />

          {/*exibe os elementos de paginação, na parte inferior da lista*/}
          <Paginacao paginaAtual={paginaAtual} setPaginaAtual={setPaginaAtual}
            //faz a divisão do total de paginas, se o numero for 0, retorna 1. "Math ceil" força que o numero de paginas sejam arredondados para maior
            TotalPaginas={Math.max(1, Math.ceil(pokemonFiltrados.length / itensPorPagina))} />
        </>
      )}
    </div>
  );
}