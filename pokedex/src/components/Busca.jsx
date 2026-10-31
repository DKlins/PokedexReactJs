import { Input } from "@chakra-ui/react";
import './Busca.css'

//Após cada alteração na barra de pesquisa, 'busca' será atualizado.

export default function BarraBusca({ busca, setBusca }) {
  return (
    <div className="barra">
      <Input placeholder="Buscar Pokémon" variant="outline"
        value={busca}
        onChange={(evento) => setBusca(evento.target.value)}
      />
    </div>
  );
}