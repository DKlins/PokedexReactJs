import { coresDosTipos } from "../utils/cores"
import './BadgeTipo.css'

export default function BadgeTipo({ tipo }) {
    //criação do badge de tipo, o mesmo é utilizado no card e nos detalhes do pokemon.
    return (
        <span className='badge-tipo' style={{ backgroundColor: coresDosTipos[tipo] }}>
            {tipo}
        </span>
    )
}