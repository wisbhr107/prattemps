import { useState } from 'react';
import { OWM_KEY } from './config/claus';
import { CIUTATS, type Ciutat } from './dades/ciutats';
import { useApi } from './hooks/useApi';
import type { Temps } from './tipus';
import { missatgeError } from './utils/missatgeError';
import LlistaCiutats from './components/LlistaCiutats';
import TargetaTemps from './components/TargetaTemps';
import estils from './App.module.css';

export default function App() {
  const [ciutatTriada, setCiutatTriada] = useState<Ciutat>(
    CIUTATS.find((ciutat) => ciutat.id === 'prat') ?? CIUTATS[0],
  );

  const url = OWM_KEY
    ? `https://api.openweathermap.org/data/2.5/weather?${new URLSearchParams({
        lat: String(ciutatTriada.lat),
        lon: String(ciutatTriada.lon),
        appid: OWM_KEY,
        units: 'metric',
        lang: 'ca',
      }).toString()}`
    : null;

  const { data, loading, error } = useApi<Temps>(url);

  return (
    <div className={estils.pagina}>
      <header className={estils.capcalera}>
        <div className={estils.logo} aria-hidden="true">☀️</div>
        <div>
          <h1>PratTemps</h1>
          <p>El temps ara mateix a vuit ciutats de Catalunya</p>
        </div>
      </header>

      <main className={estils.contingut}>
        <LlistaCiutats
          ciutats={CIUTATS}
          triadaId={ciutatTriada.id}
          alTriar={setCiutatTriada}
        />

        <section className={estils.resultat} aria-live="polite">
          {!OWM_KEY && <p className={estils.avís}>Falta la clau d'OpenWeather</p>}
          {OWM_KEY && loading && (
            <p className={estils.carregant}>
              <span className={estils.spinner} aria-hidden="true" />
              Carregant el temps: {ciutatTriada.nom}…
            </p>
          )}
          {OWM_KEY && error !== null && (
            <p className={estils.error} role="alert">
              {missatgeError(error)}
            </p>
          )}
          {OWM_KEY && !loading && error === null && data && (
            <TargetaTemps ciutat={ciutatTriada} temps={data} />
          )}
        </section>
      </main>

      <footer className={estils.peu}>
        Dades: OpenWeather · Prat FP · 0488 Desenvolupament d'interfícies
      </footer>
    </div>
  );
}
