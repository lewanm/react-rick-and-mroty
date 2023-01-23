import React, { ReactElement, useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import './styles.css';
import filterList from '../../helpers/filter';
import promiseHelper from '../../helpers/promise'
import CharacterCard from "./character-card";
import {Info, Character} from '../../types/character';

type Props = {
  parentFunction: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const PRIMERA_PAGINA = "https://rickandmortyapi.com/api/character/?page=1"

export default function Characters(props: Props): ReactElement {
  const {parentFunction} = props
  //no se como hacer bien esto :(
  const [info, setInfo] = useState<Info>({
    pages:0,
    next:"",
    prev:""
  })
  const [characters, setCharacters] = useState<Character[]>([])
  const [charFilter, setCharFilter] = useState<string>("")
  //const [currentPage,setCurrentPage] = useState<number>(1)
  const [currentPage,setCurrentPage] = useState<string>(PRIMERA_PAGINA)
  //const [pageNumber,setageNumber]

  //let api = `https://rickandmortyapi.com/api/character/?page=${page}`
  let api = `${currentPage}&name=${charFilter}`

  const getCharacters = async () => {
    const [characters, error] = await promiseHelper((axios.get(api)))
    //ver como corregir el tema del error al no encontrar algo por nombre.
    if (error) 
      throw new Error(error)

    return characters.data
  }

  const updateCharacters = () =>{
/*     getCharacters()
      .then(chars => setCharacters(filterList(chars.results, charFilter)))
      .catch(err => console.error("Error al obtener personajes", err)) */
      getCharacters()
        .then(characters => {
          setCharacters(characters.results)
          setInfo(characters.info)
        })
  }

  const onCharacterFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setCharFilter(event.target.value)
  }


  const nextPage = () => {
    if(info.next !== null) setCurrentPage(info.next)
  }

  const prevPage = () => {
    if(info.prev !== null) setCurrentPage(info.prev)
  }

  useEffect(() => {
    updateCharacters()
  }, [charFilter,currentPage])

  return (
    <>
      <h1>Pages: {info.pages}</h1>
      <span className="return" onClick={parentFunction}>Volver al menu anterior</span>
      <div className="filter-container">
        <span>Buscar por personaje </span>
        <input className="filter-input" type="text" name="filter" value={charFilter} id="" onChange={onCharacterFilter} />
        <button onClick = {nextPage}>[+]</button>
        <button onClick = {prevPage}>[-]</button>
        <h2>Pagina actual: </h2>
        <h2>{currentPage}</h2>
      </div>
      <div className="general-container">

        {
          characters.map(character => (
            <CharacterCard character={character} key={character.id} />
          ))
        }
        
      </div>
      <span onClick={parentFunction}>Volver al menu anterior</span>
    </>
    
  );
}

