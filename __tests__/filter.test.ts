import { filterStations } from '../lib/filter';

const stations = [
  { id: 1, name: 'A', city: 'Berlin', lat: 0, lng: 0 },
  { id: 2, name: 'B', city: 'Munich', lat: 0, lng: 0 },
  { id: 3, name: 'C', city: 'Berlin', lat: 0, lng: 0 }
];

test('filterStations returns all when empty filter', () => {
  expect(filterStations(stations as any, '')).toHaveLength(3);
});

test('filterStations filters case-insensitive', () => {
  expect(filterStations(stations as any, 'ber')).toHaveLength(2);
  expect(filterStations(stations as any, 'MUNICH')).toHaveLength(1);
});
