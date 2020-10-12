/* eslint-disable import/no-cycle */
import Axios from 'axios';
import Gnome from './Gnome';

export enum HAIRCOLORS {
  BLACK = 'Black',
  RED = 'Red',
  GREEN = 'Green',
  GRAY = 'Gray',
  PINK = 'Pink',
  ALL = 'All Colors'
}

export interface Character {
  id: number;
  name: string;
  thumbnail: string;
  age: number;
  weight: number;
  height: number;
  hair_color: HAIRCOLORS;
  professions: string[] | [];
  friends: string[] | [];
}


export interface ApiResponse<T> {
  [key: string]: T[];
}

export default abstract class CharacterService {
  private static charactersAxios = Axios.create();

  static async getCharacters(): Promise<Gnome[]> {
    const url = 'https://bitbucket.org/fenix-group-international/frontend-test/raw/80d1664d5db3a516537a3bbbb4f3fca968d18b2e/data.json/';
    const response = await this.charactersAxios.get<ApiResponse<Character>>(url);
    return response.data.Brastlewark.map((character) => new Gnome(character));
  }
}
