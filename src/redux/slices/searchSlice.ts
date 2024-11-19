import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchValue: string;
  selectedApartment: any | null;
}

const initialState: SearchState = {
  searchValue: "",
  selectedApartment: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSelectedApartment(state, action: PayloadAction<any>) {
      state.selectedApartment = action.payload;
    },
  },
});

export const { setSearchValue, setSelectedApartment } = searchSlice.actions;
export default searchSlice.reducer;
