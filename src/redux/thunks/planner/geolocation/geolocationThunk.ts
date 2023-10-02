import { Dispatch } from "redux";
import axios from 'axios';
import { LocationCreate } from "../../../../interfaces/planner/geolocation/geolocationInterface";
import { setCity, setCountry, setCounty, setDeleteLocation, setError, setErrorLocation, setIsLoadingLocation, setLoading, setLocationProject, setRegion, setResetError, setState } from "../../../slices/planner/geolocation/geolocationSlice";
import { resetError } from "../../../slices/planner/projects/projectsSlice";


//get the url from the .env file
const url: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_PROJECTS;

//get the token from the local storage
const token: string = localStorage.getItem("Authorization")!






//*Location Create:
export const locationCreateThunk = (body: LocationCreate[]) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };


  try {

    dispatch(setIsLoadingLocation())
    let { data } = await axios.post(`${url}/ProjectsLocations`, body, { headers });

    dispatch(setLocationProject(data));
  } catch (err: any) {
    dispatch(setErrorLocation(err?.response?.data));
    setTimeout(() =>
      dispatch(setResetError())
      , 3000);
    return;
  }
}


//*Location Create:
export const locationDeleteThunk = (locationId: number) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };


  try {

    dispatch(setIsLoadingLocation())
    let { data } = await axios.delete(`${url}/ProjectsLocations?locationId=${locationId}`, { headers });

    dispatch(setDeleteLocation(data));
  } catch (err: any) {
    dispatch(setErrorLocation(err?.response?.data));
    setTimeout(() =>
      dispatch(setResetError())
      , 3000);
    return;
  }
}



export const fetchCountryThunk = () => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(setLoading())
    let { data } = await axios.get(`${url}/Geolocation/GetCountries`, { headers });

    dispatch(setCountry(data));
  } catch (err: any) {
    dispatch(setError(err?.response?.data));
    setTimeout(() => {
      dispatch(resetError())
    }, 3000)
    return;
  }
}


export const fetchStateThunk = (CountryId: number) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(setLoading())
    let { data } = await axios.get(`${url}/Geolocation/GetStatesByCountryId${CountryId}`, { headers });

    dispatch(setState(data));
  } catch (err: any) {
    dispatch(setError(err?.response?.data));
    setTimeout(() => {
      dispatch(resetError())
    }, 3000)
    return;
  }
}

export const fetchRegionThunk = (stateId: number) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(setLoading())
    let { data } = await axios.get(`${url}/Geolocation/RegionsByStateId${stateId}`, { headers });

    dispatch(setRegion(data));
  } catch (err: any) {
    dispatch(setError(err?.response?.data));
    setTimeout(() => {
      dispatch(resetError())
    }, 3000)
    return;
  }
}

export const fetchCountiesThunk = (regionId: number) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(setLoading())
    let { data } = await axios.get(`${url}/Geolocation/CountiesByRegionId${regionId}`, { headers });

    dispatch(setCounty(data));
  } catch (err: any) {
    dispatch(setError(err?.response?.data));
    setTimeout(() => {
      dispatch(resetError())
    }, 3000)
    return;
  }
}


export const fetchCityThunk = (countyId: number) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(setLoading())
    let { data } = await axios.get(`${url}/Geolocation/CitiesByCountyId${countyId}`, { headers });

    dispatch(setCity(data));
  } catch (err: any) {
    dispatch(setError(err?.response?.data));
    setTimeout(() => {
      dispatch(resetError())
    }, 3000)
    return;
  }
}









