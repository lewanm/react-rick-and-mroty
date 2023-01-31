import React, { ReactElement, useState } from "react";
import type { Character } from "../../../types/character";
import CharacterModal from "./character-modal";
import { Modal, Box } from "@mui/material";
import "./styles.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type CharacterCardProps = {
  character: Character;
};

export default function CharacterCard(props: CharacterCardProps): ReactElement {
  const [openModal, setOpenModal] = useState(false);
  const { character } = props;

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <div>
        <Modal
          open={openModal}
          onClose={handleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CharacterModal character={character} handleModal={handleModal} />
          </Box>
        </Modal>
      </div>

      <div className="character-container">
        <img
          className="character-img"
          src={character.image}
          alt={character.name}
        />
        <div className="data-container">
          <p onClick={handleModal} className="character-name title-big">
            {character.name}
          </p>
          <p className="medium-size">Especie: {character.species}</p>
          <p>Episodios: {character.episode.length}</p>
          <div className="character-status-container">
            <p className="character-status">
              {character.status === "Alive" ? (
                <span className="alive">💗</span>
              ) : character.status === "Dead" ? (
                <span className="dead">💀</span>
              ) : (
                <span className="dead">¿?</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
