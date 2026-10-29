import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Paginacao({ paginaAtual, setPaginaAtual, totalItens, itensPorPagina }) {
    //faz o calculo do total de páginas 
    const totalPaginas = Math.ceil(totalItens / itensPorPagina);

    //se não tiver nenhum pokemon, o total é 1 para não bugar.
    const paginasReais = totalPaginas === 0 ? 1 : totalPaginas;

    return (
        <div className="paginacao">
            Página <strong>{paginaAtual}</strong> de <strong>{paginasReais}</strong>
            <button
                onClick={() => setPaginaAtual(paginaAtual - 1)}
                disabled={paginaAtual === 1}
            >
                <ChevronLeft />
            </button>

            <button
                onClick={() => setPaginaAtual(paginaAtual + 1)}
                disabled={paginaAtual === paginasReais}
            >
                <ChevronRight />
            </button>
        </div>
    );
}