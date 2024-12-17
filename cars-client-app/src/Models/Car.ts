export enum FuelType {
  Petrol = 'Petrol',
  Hybrid = 'Hybrid',
  Diesel = 'Diesel',
  LPG = 'LPG',
}

export enum BodyType {
  Hatchback = 'Hatchback',
  Kombi = 'Kombi',
  Roadster = 'Roadster',
  SUV = 'SUV',
  Sedan = 'Sedan',
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  doorsNumber: number;
  luggageCapacity: number;
  engineCapacity: number;
  fuelType: FuelType;
  productionDate: string;
  carFuelConsumption: number;
  bodyType: BodyType;
}