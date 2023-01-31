import React, { ReactElement, useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import "./styles.css";
import promiseHelper from "../../helpers/promise";
import CharacterCard from "./character-card";
import Filters from "./filters";
import { theme } from "../../themes/MUI";
import {
  Button,
  Pagination,
  Stack,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { Info, Character } from "../../types/character";

//TODO CAMBIAR NOMRE A ESTA FUNCION QUE TRAIGO DE APP.TSX
type Props = {
  parentFunction: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const FIRST_PAGE = 1;

export default function Characters(props: Props): ReactElement {
  const { parentFunction } = props;
  //TODO mejorar esto, ver como destrcuturar los datos en vez de pedirlo asi
  const [info, setInfo] = useState<Info>({
    pages: 0,
    next: "",
    prev: "",
    count: 0,
  });
  const [characters, setCharacters] = useState<Character[]>([]);
  const [charFilter, setCharFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(FIRST_PAGE);
  const [status, setStatus] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [species, setSpecies] = useState<string>("");

  let api = `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${charFilter}&status=${status}&gender=${gender}&species=${species}`;

  const getCharacters = async () => {
    const [characters, error] = await promiseHelper(axios.get(api));
    //TODO ver como corregir el tema del error al no encontrar algo por nombre.
    if (error) {
      console.log(error);
      return characters.data;
    }

    return characters.data;
  };

  const resetFilters = () => {
    setCharFilter("");
    setCurrentPage(FIRST_PAGE);
    setStatus("");
    setGender("");
    setSpecies("");
  };

  const updateCharacters = () => {
    getCharacters().then((characters) => {
      setCharacters(characters.results);
      setInfo(characters.info);
    });
  };

  const onCharacterFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setCharFilter(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    updateCharacters();
  }, [charFilter, currentPage, status, gender, species]);

  return (
    <div className="general-container">
      <div className="prueba">
        <div className="return-container">
          <span className="return" onClick={parentFunction}>
            Volver al menu anterior
          </span>
        </div>
        <ThemeProvider theme={theme}>
          <div className="search-clear-container">
            <TextField
              id="character-filter"
              label="Buscar por nombre"
              variant="outlined"
              value={charFilter}
              onChange={onCharacterFilter}
            />
            <Button onClick={resetFilters} variant="contained">
              Clear
            </Button>
          </div>
          <Filters
            setStatus={setStatus}
            setSpecies={setSpecies}
            setGender={setGender}
            gender={gender}
            status={status}
            species={species}
          />
          <div className="pagination-container">
            <Pagination
              sx={{ width: 1 / 1 }}
              count={info.pages}
              shape="rounded"
              variant="outlined"
              onChange={handlePageChange}
            />
          </div>
          <div className="cards-container">
            {characters.map((character) => (
              <CharacterCard character={character} key={character.id} />
            ))}
          </div>
        </ThemeProvider>

        <span onClick={parentFunction}>Volver al menu anterior</span>
      </div>
    </div>
  );
}
