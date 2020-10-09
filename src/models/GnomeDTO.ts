// eslint-disable-next-line import/no-cycle
import { Character } from './CharacterService';

export default class GnomeDTO implements Character {
  id = 0;

  name = ''

  thumbnail = '';

  age= 0;

  weight = 0;

  height = 0

  hair_color = '';

  professions = [''];

  friends = [''];
}
