import { Input } from "@chakra-ui/react";
import './Busca.css'

//Após cada alteração na barra de pesquisa, 'busca' será atualizado.

export default function Busca({ busca, setBusca }) {
  //barra de busca comum, que vai atualizar o valor de busca toda vez que o usuário digitar algo
  return (
    <div className="barra">
      <Input placeholder="Buscar Pokémon..." variant="outline"
        value={busca}
        onChange={(evento) => setBusca(evento.target.value)}
      />
    </div>
  );
}