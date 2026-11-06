export function formatHoraLocal(segons: number, timezone: number): string {
  const data = new Date((segons + timezone) * 1000);
  const hores = String(data.getUTCHours()).padStart(2, '0');
  const minuts = String(data.getUTCMinutes()).padStart(2, '0');
  return `${hores}:${minuts}`;
}

export function formatTemperatura(valor: number): string {
  return `${Math.round(valor)} °C`;
}

export function formatGraus(valor: number): string {
  return `${Math.round(valor)}°`;
}

export function formatDescripcio(descripcio: string): string {
  return descripcio.charAt(0).toUpperCase() + descripcio.slice(1);
}

export function formatHumitat(valor: number): string {
  return `${valor} %`;
}

export function formatVent(metresPerSegon: number): string {
  return `${Math.round(metresPerSegon * 3.6)} km/h`;
}

export function formatPressio(valor: number): string {
  return `${valor} hPa`;
}

export function formatMaximMinim(maxim: number, minim: number): string {
  return `Màx. ${formatGraus(maxim)} · Mín. ${formatGraus(minim)}`;
}
