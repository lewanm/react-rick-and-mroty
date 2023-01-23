import Character from "../types/character"
export default function filterList(characters: Character[], valueToFilter: string):any[]{

    const filteredList = characters.filter((character: Character) =>
         character.name.toLowerCase().includes(valueToFilter.toLowerCase()))

    return filteredList
}