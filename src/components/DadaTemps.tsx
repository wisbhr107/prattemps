import estils from './DadaTemps.module.css';

type PropsDadaTemps = {
  icona: string;
  etiqueta: string;
  valor: string;
};

export default function DadaTemps({ icona, etiqueta, valor }: PropsDadaTemps) {
  return (
    <div className={estils.dada}>
      <span className={estils.icona} aria-hidden="true">{icona}</span>
      <div className={estils.textos}>
        <span className={estils.etiqueta}>{etiqueta}</span>
        <strong className={estils.valor}>{valor}</strong>
      </div>
    </div>
  );
}
