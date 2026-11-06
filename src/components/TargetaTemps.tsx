import type { Ciutat } from '../dades/ciutats';
import type { Temps } from '../tipus';
import {
  formatDescripcio,
  formatHoraLocal,
  formatHumitat,
  formatMaximMinim,
  formatPressio,
  formatTemperatura,
  formatVent,
} from '../utils/format';
import DadaTemps from './DadaTemps';
import estils from './TargetaTemps.module.css';

type PropsTargetaTemps = {
  ciutat: Ciutat;
  temps: Temps;
};

export default function TargetaTemps({ ciutat, temps }: PropsTargetaTemps) {
  const condicio = temps.weather[0];

  if (!condicio) {
    return null;
  }

  return (
    <article className={estils.targeta} aria-label={`Temps a ${ciutat.nom}`}>
      <div className={estils.capcalera}>
        <div>
          <h2 className={estils.ciutat}>
            {ciutat.nom}<span className={estils.pais}>, {temps.sys.country}</span>
          </h2>
          <p className={estils.actualitzat}>
            Actualitzat a les {formatHoraLocal(temps.dt, temps.timezone)}
          </p>
        </div>
      </div>

      <div className={estils.resum}>
        <div className={estils.iconoTemps}>
          <img
            src={`https://openweathermap.org/img/wn/${condicio.icon}@2x.png`}
            alt={formatDescripcio(condicio.description)}
            width="100"
            height="100"
          />
        </div>
        <div className={estils.dadesPrincipals}>
          <p className={estils.temperatura}>{formatTemperatura(temps.main.temp)}</p>
          <p className={estils.descripcio}>{formatDescripcio(condicio.description)}</p>
          <p className={estils.maximMinim}>
            {formatMaximMinim(temps.main.temp_max, temps.main.temp_min)}
          </p>
        </div>
      </div>

      <div className={estils.rejilla}>
        <DadaTemps icona="🌡️" etiqueta="Sensació" valor={formatTemperatura(temps.main.feels_like)} />
        <DadaTemps icona="💧" etiqueta="Humitat" valor={formatHumitat(temps.main.humidity)} />
        <DadaTemps icona="💨" etiqueta="Vent" valor={formatVent(temps.wind.speed)} />
        <DadaTemps icona="⏱️" etiqueta="Pressió" valor={formatPressio(temps.main.pressure)} />
        <DadaTemps icona="🌅" etiqueta="Sortida del sol" valor={formatHoraLocal(temps.sys.sunrise, temps.timezone)} />
        <DadaTemps icona="🌇" etiqueta="Posta del sol" valor={formatHoraLocal(temps.sys.sunset, temps.timezone)} />
      </div>
    </article>
  );
}
