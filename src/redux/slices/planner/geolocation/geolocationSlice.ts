import { createSlice } from '@reduxjs/toolkit';
import { CityInterface, CountriesInterface, CountyInterface,  RegionInterface, StateInterface } from '../../../../interfaces/planner/geolocation/geolocationInterface';
import { ErrorResponse } from '../../../../interfaces/functionalInterfaces';


type InitialState = {
  //Location
  createlocationProject: boolean;
  deleteLocation: boolean;
  isLoadingLocation: boolean,
  errorLocation: ErrorResponse,
  //
  country: CountriesInterface[],
  state: StateInterface[],
  region: RegionInterface[],
  county: CountyInterface[],
  city: CityInterface[],
  loading: boolean,
  error: ErrorResponse,
}

const initialState: InitialState = {
  //*Location
  createlocationProject: false,
  deleteLocation: false,
  isLoadingLocation: false,
  errorLocation: {},
  //
  country: [{
    id: 1,
    name: "Estados Unidos"
  }],
  state: [{
    id: 1,
    name: "California",
    countryGeoId: 1
  }],
  region: [
    {
      id: 1,
      name: "West Coast",
      stateGeoId: 1
    }
  ],
  county: [
    {
      id: 1,
      name: "Los Angeles County",
      regionGeoId: 1
    }
  ],
  city: [
    {
      id: 1,
      name: "Los Angeles City",
      countyGeoId: 1
    }
  ],

  loading: false,
  error: {},
}


export const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {

    //*Create Location project

    setLocationProject: (state) => {
      state.createlocationProject = true;
      state.isLoadingLocation = false;
      state.errorLocation = {};
    },

    setResetCreateLocation: (state) => {
      state.createlocationProject = false;
    },

    //*Delete Location
    setDeleteLocation: (state) => {
      state.deleteLocation = true;
      state.isLoadingLocation = false;
      state.errorLocation = {};
    },

    setResetDeleteLocation: (state) => {
      state.deleteLocation = false;
    },


    //* Location Loading
    setIsLoadingLocation: (state) => {
      state.isLoadingLocation = true;
    },

    setErrorLocation: (state, action) => {
      state.errorLocation = action.payload;
      state.isLoadingLocation = false;
    },

    setResetError: (state) => {
      state.errorLocation = {};
    },

    //*Country
    setCountry: (state, action) => {
      state.country = action.payload;
      state.loading = false;
      state.error = {};
    },
    setState: (state, action) => {
      state.state = action.payload;
      state.loading = false;
      state.error = {};
    },
    setRegion: (state, action) => {
      state.region = action.payload;
      state.loading = false;
      state.error = {};
    },
    setCounty: (state, action) => {
      state.county = action.payload;
      state.loading = false;
      state.error = {};
    },
    setCity: (state, action) => {
      state.city = action.payload;
      state.loading = false;
      state.error = {};
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetError: (state) => {
      state.error = {};
    },

  }
});


// Action creators are generated for each case reducer function
export const {
  //*Location
  setLocationProject,
  setResetCreateLocation,

  //
  setDeleteLocation,
  setResetDeleteLocation,
  //
  setIsLoadingLocation,
  setErrorLocation,
  setResetError,
  //
  setCountry,
  setState,
  setRegion,
  setCounty,
  setCity,
  setLoading,
  setError,
  resetError,
} = geolocationSlice.actions;
export const geolocationReducer = geolocationSlice.reducer;