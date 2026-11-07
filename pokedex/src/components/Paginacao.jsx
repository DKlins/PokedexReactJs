import { Button } from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Paginacao.css'

export default function Paginacao({ paginaAtual, setPaginaAtual, TotalPaginas}) {

    return (
        <div className='pagination'>
            {/*botão de voltar, diminui 1 no valor da página atual. É desabilitado quando chega no valor 1*/}
            <Button
                onClick={() => setPaginaAtual(paginaAtual - 1)}
                disabled={paginaAtual === 1}>
                <ChevronLeft />
            </Button>

            {/*mostra qual a página atual, e o total de páginas*/}
            Página <strong>{paginaAtual}</strong> de <strong>{TotalPaginas}</strong>

            {/*botão de avançar, aumenta 1 no valor da página atual. É desabilitado quando chega no valor total de páginas*/}
            <Button
                onClick={() => setPaginaAtual(paginaAtual + 1)}
                disabled={paginaAtual === TotalPaginas}>
                <ChevronRight />
            </Button>
        </div>
    );
}