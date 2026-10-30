import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function DetalhesPokemon({ url, voltar }) {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setDados(data));
  }, [url]);

  if (!dados) return <p>Carregando detalhes...</p>;

  return (
    <div>
      <button onClick={voltar}> <ArrowLeft /> Voltar </button>
      
      <h2>{dados.name}</h2>
      <img src={dados.sprites.other['official-artwork'].front_default} alt={dados.name} />
      
      {/* mapear dados.types, dados.stats, etc */}
    </div>
  );
}