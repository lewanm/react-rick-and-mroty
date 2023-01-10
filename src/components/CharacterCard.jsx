export default function CharacterCard() {
  const placeholder = {
    img: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    episodes: 52,
  };

  return (
    <div className="character-container">
      <img
        className="character-img"
        src={placeholder.img}
        alt={placeholder.name}
      />
      <div className="data-container">
        <p className="character-name">{placeholder.name}</p>
        <p className="medium-size">Especie: {placeholder.species}</p>
        <p>Episodios: {placeholder.episodes}</p>
        <p>
          {placeholder.status === "Alive" ? (
            <span className="alive">💗 Vivo</span>
          ) : (
            <span className="dead">💀 Muerto</span>
          )}
        </p>
      </div>
    </div>
  );
}
