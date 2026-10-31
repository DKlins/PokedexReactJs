import { coresDosTipos } from "../utils/cores"
import './BadgeTipo.css'

export default function BadgeTipo({ tipo }) {

    return (
        <span className='badge-tipo' style={{ backgroundColor: coresDosTipos[tipo] }}>
            {tipo}
        </span>
    )
}