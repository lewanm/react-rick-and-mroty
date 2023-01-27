import React, { ReactElement } from 'react'
import type {Character} from "../../../types/character";
import './styles.css'

type CharacterCardProps = {
  character: Character
}

export default function CharacterCard(props: CharacterCardProps): ReactElement {
 
  const { character } = props

  return (
    <div className="character-container">
      <img
        className="character-img"
        src={character.image}
        alt={character.name}
      />
      <div className="data-container">
        <p className="character-name">{character.name}</p>
        <p className="medium-size">Especie: {character.species}</p>
        <p>Episodios: {character.episode.length}</p>
        <div className="character-status-container">
          <p className="character-status">
            {character.status === "Alive" ? (
              <span className="alive">💗</span>
            ) : (
              <span className="dead">💀</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}