import React, { ReactElement, useState } from "react";
import type { Character } from "../../../types/character";
import CharacterModal from "./character-modal";
import { Modal, Box } from "@mui/material";
import { Episode } from "../../../types/episode";
import "./styles.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type CharacterCardProps = {
  character: Character;
  episodes: Episode[];
};

export default function CharacterCard(props: CharacterCardProps): ReactElement {
  const [openModal, setOpenModal] = useState(false);
  const { character, episodes } = props;

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box-modal" sx={style}>
          <CharacterModal
            episodes={episodes}
            character={character}
            handleModal={handleModal}
          />
        </Box>
      </Modal>

      <div className="character-container">
        <div className="image-container">
          <div className="character-status-container">
            <img
              className={`character-status ${character.status.toLowerCase()}`}
              src={`/boxicons-${character.status.toLowerCase()}.svg`}
              alt=""
            />
          </div>
          <img
            className="character-image"
            src={character.image}
            alt={character.name}
          />
        </div>
        <div className="data-container">
          <p onClick={handleModal} className="character-name title-big">
            {character.name}
          </p>
          <p className="medium-size">Especie: {character.species}</p>
          <p>Episodios: {character.episode.length}</p>
        </div>
      </div>
    </>
  );
}
