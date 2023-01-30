import React, { ReactElement, useState } from "react";
import axios from "axios";
import type { Character } from "../../../../types/character";
import type Episode from "../../../../types/episode";
import promiseHelper from "../../../../helpers/promise";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

type CharacterModalProps = {
  character: Character;
  handleModal: any;
};
//TODO AL ABRIR VENTANA MODAL HACER OTRO FETCH PARA OBTENER LOS EPISODIOS
export default function CharacterModal(props: CharacterModalProps) {
  const { character, handleModal } = props;
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const getEpisodes = async () => {
    const [episode, error] = await promiseHelper(
      axios.get("https://rickandmortyapi.com/api/episode/1")
    );

    if (error) {
      console.log(error);
      throw new Error(error);
    }

    setEpisodes(episode);
  };

  console.log(character);
  return (
    <div>
      <p>{character.name}</p>
      <img src={character.image} alt="" />
      <p>information</p>
      <TableContainer component={Paper} sx={{ maxHeight: "200px" }}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>Estado</TableCell>
              <TableCell align="right">{character.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Especie</TableCell>
              <TableCell align="right">{character.species}</TableCell>
            </TableRow>
            {character.type !== "" && (
              <TableRow>
                <TableCell>Tipo</TableCell>
                <TableCell align="right">{character.type}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>Sexo</TableCell>
              <TableCell align="right">{character.gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Origen</TableCell>
              <TableCell align="right">{character.origin.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ubicacion</TableCell>
              <TableCell align="right">{character.location.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Primera aparicion</TableCell>
              <TableCell align="right">WIP</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={handleModal}>
        Cerrar ventana
      </Button>
    </div>
  );
}
