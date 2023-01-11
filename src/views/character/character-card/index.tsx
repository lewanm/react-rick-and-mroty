import React, { ReactElement } from 'react'
import type Character from "../../../types/character";

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
        <p>Episodios: {character.episodes}</p>
        <p>
          {character.status === "Alive" ? (
            <span className="alive">💗 Vivo</span>
          ) : (
            <span className="dead">💀 Muerto</span>
          )}
        </p>
      </div>
    </div>
  );
}