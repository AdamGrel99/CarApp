export enum FuelType {
  Petrol = 'Petrol',
  Hybrid = 'Hybrid',
  Diesel = 'Diesel',
  LPG = 'LPG',
}

export enum BodyType {
  Hatchback = 'Hatchback',
  Sedan = 'Sedan',
  Kombi = 'Kombi',
  SUV = 'SUV',
  Roadster = 'Roadster',
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