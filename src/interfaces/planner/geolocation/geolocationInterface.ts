
export interface CountriesInterface {
  id: number;
  name: string;
}


export interface StateInterface {
  id: number;
  name: string;
  countryGeoId: number;
}


export interface RegionInterface {
  id: number;
  name: string;
  stateGeoId: number;
}



export interface CountyInterface {
  id: number;
  name: string;
  regionGeoId: number;
}

// Generated by https://quicktype.io

export interface CityInterface {
  id: number;
  name: string;
  countyGeoId: number;
}

export interface LocationCreate {
  projectId: number;
  countryGeoId: string | number;
  stateGeoId: string | number;
  countyGeoId: string | number;
  regionGeoId: string | number;
  cityGeoId: string | number;
  zipCode: number | null | undefined;
}