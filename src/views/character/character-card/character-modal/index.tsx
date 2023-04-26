import React, { ReactElement, useState } from "react";
import axios from "axios";
import type { Character } from "../../../../types/character";
import type { Episode } from "../../../../types/episode";
import promiseHelper from "../../../../helpers/promise";
import getPageNumber from "../../../../helpers/getPageNumber";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import "./styles.css";

type CharacterModalProps = {
  character: Character;
  handleModal: any;
  episodes: Episode[];
};
//TODO AL ABRIR VENTANA MODAL HACER OTRO FETCH PARA OBTENER LOS EPISODIOS
export default function CharacterModal(props: CharacterModalProps) {
  const { character, handleModal, episodes } = props;

  const episodesIDs = character.episode.map((episode) =>
    getPageNumber(episode)
  );

  //VER OTRA FORMA DE HACERLO BUSCANDO POR ID // TODO
  const filteredEpisodes = episodesIDs.map((episodeID) =>
    episodes.find((episode) => episodeID === episode.id)
  );

  function arrayToTable(episodes: any[]) {
    const episodeRows = episodes.map((_episode, index) => {
      const episodeText =
        index === 0 ? <th rowSpan={episodes.length + 1}>Episodes</th> : null;
      return (
        <tr className="episodes" key={index}>
          {episodeText}
          <td>{_episode}</td>
        </tr>
      );
    });

    return episodeRows;
  }

  //const episodesTable = arrayToTable(myArray);
  console.log({ episodes });

  return (
    <div className="modal-container">
      <h2 className="modal-character-name">{character.name}</h2>
      <img className="modal-image" src={character.image} alt="" />
      <h3 className="modal-subtitle">information</h3>
      <table className="modal-information">
        <tbody>
          <tr>
            <th>Specie</th>
            <td>{character.species}</td>
          </tr>

          <tr>
            <th>Gender</th>
            <td>{character.gender}</td>
          </tr>

          <tr>
            <th>Status</th>
            <td>{character.status}</td>
          </tr>
          <tr>
            <th>Origin</th>
            <td>{character.origin.name}</td>
          </tr>
          <tr>
            <th>Location</th>
            <td>{character.location.name}</td>
          </tr>
          <tr>
            <th>Episodes</th>
            <td className="episodes-container">
              <ul className="episodes">
                {filteredEpisodes &&
                  filteredEpisodes.map((episode) => (
                    <li key={episode!.id}>
                      {`(${episode!.episode}) `}
                      {episode!.name}
                    </li>
                  ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <Button
        className="modal-button"
        sx={{ height: "3rem", width: "100%" }}
        variant="contained"
        onClick={handleModal}
      >
        Cerrar ventana
      </Button>
    </div>
  );
}

/* {myArray.map((episode, index) => (
  <td key={index}>{episode}</td>
))} */
