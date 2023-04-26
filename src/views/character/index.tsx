import React, {
  ReactElement,
  useState,
  useEffect,
  useLayoutEffect,
  ChangeEvent,
} from "react";
import axios from "axios";
import "./styles.css";
import promiseHelper from "../../helpers/promise";
import { fetching } from "../../helpers/fetching";
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
import { Episode, Page } from "../../types/episode";

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
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [charFilter, setCharFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(FIRST_PAGE);
  const [status, setStatus] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [species, setSpecies] = useState<string>("");

  let api = `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${charFilter}&status=${status}&gender=${gender}&species=${species}`;

  const getFetchedData = (api: string) => {
    /*     const [characters, error] = await promiseHelper(axios.get(api));
    //TODO ver como corregir el tema del error al no encontrar algo por nombre.
    if (error) {
      console.log(error);
      return characters.data;
    }

    return characters.data; */
    return fetching(api).then((data) => data);
  };

  const resetFilters = () => {
    setCharFilter("");
    setCurrentPage(FIRST_PAGE);
    setStatus("");
    setGender("");
    setSpecies("");
  };

  const updateCharacters = () => {
    getFetchedData(api).then((characters) => {
      setCharacters(characters.results);
      setInfo(characters.info);
    });
  };

  const getAllEpisodes = async () => {
    const url = `https://rickandmortyapi.com/api/episode?page=`;

    const firstPage = await getFetchedData(url + 1).catch((e) => {
      throw new Error(e);
    });

    const { results, info } = firstPage;
    setEpisodes((ep) => [...ep, ...results]);
    const pagesPromise: Promise<Page>[] = [];

    for (let i = 2; i <= info.pages; i++) {
      pagesPromise.push(getFetchedData(url + i));
    }

    const pages = await Promise.all(pagesPromise); //todo catch err
    pages.forEach((page) => setEpisodes((ep) => [...ep, ...page.results]));
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

  useEffect(() => {
    getAllEpisodes();
  }, []);

  return (
    <div className="general-container">
      <button onClick={() => console.log(episodes)}>VER EPISODIOS</button>
      <div className="return-container">
        <span className="return" onClick={parentFunction}>
          Volver al menu anterior
        </span>
      </div>
      <ThemeProvider theme={theme}>
        <div className="filters-container">
          <div className="search-clear-container">
            <TextField
              id="character-filter"
              label="Buscar por nombre"
              variant="outlined"
              value={charFilter}
              onChange={onCharacterFilter}
              sx={{ marginRight: "0.25rem" }}
            />
            <Button
              sx={{ marginLeft: "0.5rem" }}
              onClick={resetFilters}
              variant="contained"
            >
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
          />{" "}
          <div className="pagination-container">
            <Pagination
              sx={{ width: 1 / 1 }}
              count={info.pages}
              shape="rounded"
              variant="outlined"
              onChange={handlePageChange}
            />
          </div>
        </div>

        <div className="cards-container">
          {characters.map((character) => (
            <CharacterCard
              episodes={episodes}
              character={character}
              key={character.id}
            />
          ))}
        </div>
      </ThemeProvider>
    </div>
  );
}
