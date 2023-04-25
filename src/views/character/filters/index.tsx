import React, { ReactElement } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  MenuList,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import "./styles.css";

type FilterProps = {
  status: string;
  gender: string;
  species: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  setSpecies: React.Dispatch<React.SetStateAction<string>>;
};

export default function Filters(props: FilterProps): ReactElement {
  const { status, setStatus, gender, setGender, species, setSpecies } = props;

  const style = {
    maxWidth: 150,
    width: 1 / 3,
  };
  const genderList = ["Male", "Female", "Genderless", "Unknown"];
  const statusList = ["Alive", "Dead", "Unknown"];
  const speciesList = [
    "Human",
    "Humanoid",
    "Alien",
    "Poopybutthole",
    "Mythological",
    "Unknown",
    "Animal",
    "Disease",
    "Robot",
    "Cronenberg",
  ];

  const handleGenderChange = (event: SelectChangeEvent) => {
    if (event.target.value === null) event.target.value = "";
    setGender(event.target.value);
  };
  const handleSpeciesChange = (event: SelectChangeEvent) => {
    if (event.target.value === null) event.target.value = "";
    setSpecies(event.target.value);
  };
  const handleStatusChange = (event: SelectChangeEvent) => {
    if (event.target.value === null) event.target.value = "";
    setStatus(event.target.value);
  };

  return (
    <div className="filter-container">
      <FormControl sx={{ marginRight: "0.75rem" }} variant="filled">
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          value={gender}
          onChange={handleGenderChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {genderList.map((gender) => (
            <MenuItem key={gender} value={gender}>
              {gender}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{ marginLeft: "0.25rem", marginRight: "0.25rem" }}
        variant="filled"
      >
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          id="status"
          value={status}
          onChange={handleStatusChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {statusList.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ marginLeft: "0.5rem" }} variant="filled">
        <InputLabel id="species-label">Specie</InputLabel>
        <Select
          labelId="species-label"
          id="species"
          value={species}
          onChange={handleSpeciesChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {speciesList.map((specie) => (
            <MenuItem key={specie} value={specie}>
              {specie}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
