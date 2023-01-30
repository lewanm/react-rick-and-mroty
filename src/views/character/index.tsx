import React, { ReactElement, useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import "./styles.css";
import promiseHelper from "../../helpers/promise";
import CharacterCard from "./character-card";
import Filters from "./filters";
import { Pagination, Stack } from "@mui/material";
import { Info, Character } from "../../types/character";

//TODO CAMBIAR NOMRE A ESTA FUNCION QUE TRAIGO DE APP.TSX
type Props = {
  parentFunction: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const FIRST_PAGE = 1;
const postPerPage = 20;

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
    <>
      <span className="return" onClick={parentFunction}>
        Volver al menu anterior
      </span>
      <div className="search-container">
        <span>Buscar por nombre </span>
        <input
          className="filter-input"
          type="text"
          name="filter"
          value={charFilter}
          id=""
          onChange={onCharacterFilter}
        />

        <Filters
          setStatus={setStatus}
          setSpecies={setSpecies}
          setGender={setGender}
          gender={gender}
          status={status}
          species={species}
        />
      </div>

      <div className="pagination-container">
        <Stack spacing={2}>
          <Pagination
            count={info.pages}
            shape="rounded"
            variant="outlined"
            onChange={handlePageChange}
          />
        </Stack>
      </div>

      <div className="general-container">
        {characters.map((character) => (
          <CharacterCard character={character} key={character.id} />
        ))}
      </div>
      <span onClick={parentFunction}>Volver al menu anterior</span>
    </>
  );
}
