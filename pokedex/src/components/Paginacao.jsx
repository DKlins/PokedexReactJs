import { Button } from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Paginacao.css'

export default function Paginacao({ paginaAtual, setPaginaAtual, TotalPaginas}) {

    return (
        <div className='pagination'>
            <Button
                onClick={() => setPaginaAtual(paginaAtual - 1)}
                disabled={paginaAtual === 1}>
                <ChevronLeft />
            </Button>
            Página <strong>{paginaAtual}</strong> de <strong>{TotalPaginas}</strong>

            <Button
                onClick={() => setPaginaAtual(paginaAtual + 1)}
                disabled={paginaAtual === TotalPaginas}
            >
                <ChevronRight />
            </Button>
        </div>
    );
}