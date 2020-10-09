import Axios from 'axios';

export interface Character {
  id: number;
  name: string;
  thumbnail: string;
  age: number;
  weight: number;
  height: number;
  hair_color: string;
  professions: string[] | [];
  friends: string[] | [];
}


export interface CharacterResponse<T> {
  Brastlewark: T[];
}

export default class CharacterService {
  private static charactersAxios = Axios.create();

  static async getCharacters(): Promise<CharacterResponse<Character>> {
    const url = 'https://bitbucket.org/fenix-group-international/frontend-test/raw/80d1664d5db3a516537a3bbbb4f3fca968d18b2e/data.json';
    const response = await this.charactersAxios.get<CharacterResponse<Character>>(url);
    return response.data;
  }
}
