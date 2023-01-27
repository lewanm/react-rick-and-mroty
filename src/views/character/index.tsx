//TODO MODIFICAR CURRENT PAGE; PARA QUE SEA UN NUMERO Y NO UNA PAGINA. --- LITO
//TODO MODIFICAR FUNCION PREV/NEXT PAGE PARA QUE UPDATE EL NUMERO Y NO TODA LA PAGINA.
//TODO CREAR FUNCION UPDATE PAGE (URL) PARA SIMPLEMENTE MODIFICAR LA PAGINA (el numero)
//MANDAR POR PROPS Y MODIFICAR COMO LO MANDA.

import React, { ReactElement, useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import "./styles.css";
import filterList from "../../helpers/filter";
import promiseHelper from "../../helpers/promise";
import CharacterCard from "./character-card";
import Pagination from "./pagination";
import { Info, Character } from "../../types/character";

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
  /* const [currentPageIndex, setCurrentIndex] = useState<number>(1); */
  const [currentPage, setCurrentPage] = useState<number>(FIRST_PAGE);
  //const [pageNumber,setageNumber]
  const [status, setStatus] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [species, setSpecies] = useState<string>("");

  //let api = `https://rickandmortyapi.com/api/character/?page=${page}`
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
    /*     getCharacters()
      .then(chars => setCharacters(filterList(chars.results, charFilter)))
      .catch(err => console.error("Error al obtener personajes", err)) */
    getCharacters().then((characters) => {
      setCharacters(characters.results);
      setInfo(characters.info);
    });
  };

  const onCharacterFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setCharFilter(event.target.value);
    setCurrentPage(1);
  };

  const getPageIndex = (url: string): number => {
    const regex = /(\d+)/g;
    const index = url.match(regex);
    if (index !== null) {
      return parseInt(index[0]);
    }
    //TODO VER COMO CAMBIAR ESTO :(
    return 1;
  };

  const paginate = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (info.next !== null) {
      const index = getPageIndex(info.next);
      setCurrentPage(index);
    }
  };

  const prevPage = () => {
    if (info.prev !== null) {
      const index = getPageIndex(info.prev);
      setCurrentPage(index);
    }
  };

  const updatePageUrl = () => {};

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = characters.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    updateCharacters();
    //updatePageIndex();
  }, [charFilter, currentPage]);

  return (
    <>
      <h1>MAS PRUEBAS: </h1>
      <h1>{indexOfLastPost}</h1>
      <h1>{indexOfFirstPost}</h1>

      <h1>Pages: {info.pages}</h1>
      <span className="return" onClick={parentFunction}>
        Volver al menu anterior
      </span>
      <div className="filter-container">
        <span>Buscar por personaje </span>
        <input
          className="filter-input"
          type="text"
          name="filter"
          value={charFilter}
          id=""
          onChange={onCharacterFilter}
        />

        <Pagination
          totalPost={info.count}
          postPerPage={postPerPage}
          nextPage={nextPage}
          prevPage={prevPage}
          paginate={paginate}
        />

        <h2>Pagina actual: </h2>
        <h2>{currentPage}</h2>
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
