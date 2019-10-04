import API from '../../lib/ApiManager';

export const getPokemon = () => {
    console.log("a")
    API.get('pokemon/ditto/');
}