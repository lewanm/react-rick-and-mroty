import CharacterCard from "../components/CharacterCard";

const placeholder = [{
  id: 1,
  img: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  episodes: 52,
},
{
  id: 2,
  img: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  name: "Rick Sanchezzzz",
  status: "Alive",
  species: "Human",
  episodes: 52,
},
{
  id: 3,
  img: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  name: "Rick Sanchezzzzz",
  status: "Alive",
  species: "Human",
  episodes: 52,
},
]

export default function Characters() {
  return (
    <div className="general-container">
      {placeholder.map(character => (
        <CharacterCard character = {character} key={character.id}/>
      ))}
    </div>
  );
}
