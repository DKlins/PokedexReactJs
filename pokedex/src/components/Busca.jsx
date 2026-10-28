export default function BarraBusca({ busca, setBusca }) {
  return (
    <div className="busca-container">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={busca}
        onChange={(evento) => setBusca(evento.target.value)}
      />
    </div>
  );
}