import React, { ReactElement, useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import './styles.css';
import filterList from '../../helpers/filter';
import promiseHelper from '../../helpers/promise'
import CharacterCard from "./character-card";
import Character from '../../types/character';

type Props = {
  parentFunction: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const api = "https://rickandmortyapi.com/api/character"

export default function Characters(props: Props): ReactElement {
  const {parentFunction} = props
  const [characters, setCharacters] = useState<Character[]>([])
  const [charFilter, setCharFilter] = useState<string>("")


  const getCharacters = async () => {
    const [characters, error] = await promiseHelper((axios.get(api)))

    if (error)
      return error

    return characters.data
  }

  const updateCharacters = () =>{
    getCharacters()
      .then(chars => setCharacters(filterList(chars.results, charFilter)))
      .catch(err => console.error("Error al obtener personajes", err))
  }

  const onCharacterFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setCharFilter(event.target.value)
  }

  useEffect(() => {
    updateCharacters()
  }, [charFilter])

  return (
    <div className="general-container">
      <p className="subtitle">Personajes</p>
      <span onClick={parentFunction}>Volver al menu anterior</span>
      <input type="text" name="filter" value={charFilter} id="" onChange={onCharacterFilter} />
      {
        characters.map(character => (
          <CharacterCard character={character} key={character.id} />
        ))
      }
      <span onClick={parentFunction}>Volver al menu anterior</span>
    </div>
  );
}

