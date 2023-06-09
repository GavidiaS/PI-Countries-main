import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getCountries = createAsyncThunk("country/getCountries", async () => {
  const { data } = await axios("http://localhost:3001/spa-countries/countries");
  return data;
});
export const getCountriesByName = createAsyncThunk("country/getCountriesByName", async (name) => {
  const { data } = await axios(`http://localhost:3001/spa-countries/countries?name=${name}`);
  return data;
});
export const getCountryById = createAsyncThunk("country/getCountryById", async (id) => {
  const { data } = await axios(`http://localhost:3001/spa-countries/countries/${id}`);
  return data;
});
export const getActivities = createAsyncThunk("country/getActivities", async () => {
  const { data } = await axios("http://localhost:3001/spa-countries/activities");
  return data;
});
export const postActivity = createAsyncThunk("country/postActivity", async (activity) => {
  const { data } = await axios.post("http://localhost:3001/spa-countries/activities", activity);
  return data;
});

const countrySlice = createSlice({
  name: "country",
  initialState: {
    page: 1,
    country: {},
    countries: [],
    countriesOrigin: [],
    activities: []
  },
  reducers: {
    resetPage: (state) => {
      state.page = 1;
    },
    handlePage: (state, action) => {
      state.page = action.payload;
    },
    resetCountry: (state) => {
      state.country = {};
    },
    resetCountries: (state) => {
      state.countries = state.countriesOrigin;
    },
    filterContinent: (state, action) => {
      if (state.countries.length === 0) {
        state.countries = state.countriesOrigin.filter(cn => cn.continent === action.payload);
      } else {
        state.countries = state.countries.filter(cn => cn.continent === action.payload);
      }
    },
    filterActivity: (state, action) => {
      const activity = state.activities.find(act => act.name === action.payload);
      if (activity) {
        state.countries = activity.Countries;
      } else {
        state.countries = [];
      }
    },
    orderName: (state, action) => {
      state.countries = state.countries.sort((a,b) => {
        if (action.payload === "A-Z") return a.name?.localeCompare(b.name);
        if (action.payload === "Z-A") return b.name?.localeCompare(a.name);
        return 0;
      });
    },
    orderPopulation: (state, action) => {
      state.countries = state.countries.sort((a,b) => {
        if (action.payload === "Asc") return a.population - b.population;
        if (action.payload === "Desc") return b.population - a.population;
        return 0;
      });
    },
    orderArea: (state, action) => {
      state.countries = state.countries.sort((a,b) => {
        if (action.payload === "Asc") return a.area - b.area;
        if (action.payload === "Desc") return b.area - a.area;
        return 0;
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.countriesOrigin = action.payload;
      })
      .addCase(getCountries.rejected, (state, action) => {
        alert("Countries not found");
      })
      .addCase(getCountriesByName.fulfilled, (state, action) => {
        state.countries = action.payload;
      })
      .addCase(getCountriesByName.rejected, (state, action) => {
        alert("Countries not found");
      })
      .addCase(getCountryById.fulfilled, (state, action) => {
        state.country = action.payload;
      })
      .addCase(getCountryById.rejected, (state, action) => {
        alert("Country not found");
      })
      .addCase(getActivities.fulfilled, (state, action) => {
        state.activities = action.payload;
      })
      .addCase(getActivities.rejected, (state, action) => {
        alert("Activities not found");
      })
      .addCase(postActivity.fulfilled, (state, action) => {
        state.activities = action.payload;
      })
      .addCase(postActivity.rejected, (state, action) => {
        alert("Activities not found");
      })
  }
});
export const { resetPage, handlePage, resetCountry, resetCountries, filterContinent, filterActivity, orderName, orderPopulation, orderArea } = countrySlice.actions;
export default countrySlice.reducer;