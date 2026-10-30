import { useState, useEffect } from "react";
import './FiltroTipo.css'

export default function FiltroTipo({ tipo, setTipoSelec }) {
    const [tipos, setTipo] = useState([]);

    //consulta os dados de tipos na API
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/type?limit=18`)
            .then((resposta) => resposta.json())
            .then((dados) => setTipo(dados.results))
            .catch((erro) => console.error("Erro ao buscar os tipos:", erro));
    }, []);

    return (
        <div>
            {/* após cada alteração na seleção, o valor é alterado na variável*/}
            <select value={tipo} onChange={(evento) => setTipoSelec(evento.target.value)}>
                <option value="">Todos os tipos</option>

                {/* cria as opções de seleção, de acordo com os tipos retornados da API */}
                {tipos.map((type, index) => (
                    <option className="tipos" key={index} value={type.name}>
                        {type.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
