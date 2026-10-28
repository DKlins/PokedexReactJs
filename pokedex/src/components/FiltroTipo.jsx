import { useState, useEffect } from "react";
import './FiltroTipo.css'

export default function FiltroTipo({ tipo, setTipoSelec}) {
    const [tipos, setTipo] = useState([]);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/type?limit=19`)
            .then((resposta) => resposta.json())
            .then((dados) => setTipo(dados.results))
            .catch((erro) => console.error("Erro ao buscar os tipos:", erro));
  },[]);

  return(
    <div className="filtro-container">
    <select value={tipo} onChange={(evento) => setTipoSelec(evento.target.value)}>
    <option value="">Todos os tipos</option>
    
    {tipos.map((type, index) => (
        <option className="tipos" key={index} value={type.name}>
        {type.name}
        </option>
    ))}
    </select>
    </div>  
  );
}
