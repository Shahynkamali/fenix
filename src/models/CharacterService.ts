/* eslint-disable import/no-cycle */
import Axios from 'axios';
import { HAIRCOLORS } from '@/helpers/index';
import Gnome from './Gnome';
import GnomeDTO from './GnomeDTO';

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
    const results = await this.charactersAxios.get<ApiResponse<Character>>(url)
      .then((response) => response.data.Brastlewark.map((result) => new Gnome(result)))
      .catch((error) => {
        const errorGnomne = [new Gnome(new GnomeDTO())];
        errorGnomne[0].name = error;
        return errorGnomne;
      });
    return results;
  }
}
