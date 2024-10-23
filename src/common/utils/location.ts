export function haversineDistance({
  lat1,
  lon1,
  lat2,
  lon2,
}: {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}): number {
  const R = 6371; // raio da Terra em quilômetros

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // distância em quilômetros

  return distance * 1000;
}
// Exemplo de uso:
// const distance = haversineDistance(37.7749, -122.4194, 34.0522, -118.2437);
// console.log(Distância: ${distance.toFixed(2)} km);
