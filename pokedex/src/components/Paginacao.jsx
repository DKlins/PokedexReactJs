import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Paginacao({ paginaAtual, setPaginaAtual, TotalPaginas}) {

    return (
        <div>
            Página <strong>{paginaAtual}</strong> de <strong>{TotalPaginas}</strong>
            <button
                onClick={() => setPaginaAtual(paginaAtual - 1)}
                disabled={paginaAtual === 1}
            >
                <ChevronLeft />
            </button>

            <button
                onClick={() => setPaginaAtual(paginaAtual + 1)}
                disabled={paginaAtual === TotalPaginas}
            >
                <ChevronRight />
            </button>
        </div>
    );
}