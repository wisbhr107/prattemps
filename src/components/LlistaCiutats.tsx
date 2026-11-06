import type { Ciutat } from '../dades/ciutats';
import estils from './LlistaCiutats.module.css';

type PropsLlistaCiutats = {
  ciutats: Ciutat[];
  triadaId: string;
  alTriar: (ciutat: Ciutat) => void;
};

export default function LlistaCiutats({ ciutats, triadaId, alTriar }: PropsLlistaCiutats) {
  return (
    <section className={estils.seccio} aria-label="Ciutats">
      <p className={estils.etiqueta}>CIUTATS</p>
      <div className={estils.llista}>
        {ciutats.map((ciutat) => (
          <button
            className={`${estils.boto} ${ciutat.id === triadaId ? estils.triada : ''}`}
            type="button"
            aria-pressed={ciutat.id === triadaId}
            key={ciutat.id}
            onClick={() => alTriar(ciutat)}
          >
            {ciutat.nom}
          </button>
        ))}
      </div>
    </section>
  );
}
