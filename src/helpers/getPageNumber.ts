export default function getPageNumber(url: string): number {
    const regex = /(\d+)/g;
    const index = url.match(regex);
    if (index !== null) {
      return parseInt(index[0]);
    }
    //TODO VER COMO CAMBIAR ESTO :(
    return 1;
};