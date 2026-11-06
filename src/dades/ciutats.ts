export type Ciutat = {
  id: string;
  nom: string;
  lat: number;
  lon: number;
};

// Les vuit ciutats de la prova (coordenades fixades a l'enunciat)
export const CIUTATS: Ciutat[] = [
  { id: 'barcelona', nom: 'Barcelona', lat: 41.3874, lon: 2.1686 },
  { id: 'prat', nom: 'El Prat de Llobregat', lat: 41.3264, lon: 2.0947 },
  { id: 'girona', nom: 'Girona', lat: 41.9794, lon: 2.8214 },
  { id: 'lleida', nom: 'Lleida', lat: 41.6176, lon: 0.62 },
  { id: 'tarragona', nom: 'Tarragona', lat: 41.1189, lon: 1.2445 },
  { id: 'manresa', nom: 'Manresa', lat: 41.7251, lon: 1.8266 },
  { id: 'figueres', nom: 'Figueres', lat: 42.2654, lon: 2.9581 },
  { id: 'tortosa', nom: 'Tortosa', lat: 40.8125, lon: 0.5216 },
];
