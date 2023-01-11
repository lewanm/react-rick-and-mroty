import React, { ReactElement, useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import promiseHelper from '../../helpers/promise'
import CharacterCard from "./character-card";
import './styles.css';
import Character from '../../types/character';

const api = "https://rickandmortyapi.com/api/character"

export default function Characters(): ReactElement {
  const [characters, setCharacters] = useState<Character[]>([])

  const [charFilter, setCharFilter] = useState<string>("")


  const getCharacters = async () => {
    const [characters, error] = await promiseHelper((axios.get(api)))

    if (error)
      return error

    return characters.data
  }

  const onCharacterFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setCharFilter(event.target.value)
  }


  useEffect(() => {
    getCharacters()
      .then(chars => setCharacters(chars.results.filter((character: Character) => character.name.includes(charFilter))))
      .catch(err => console.error("Error al obtener personajes", err))
  }, [charFilter])

  return (
    <div className="general-container">
      <input type="text" name="filter" value={charFilter} id="" onChange={onCharacterFilter} />
      {
        characters.map(character => (
          <CharacterCard character={character} key={character.id} />
        ))
      }
    </div>
  );
}