/* eslint-disable import/no-cycle */
import GnomeDTO from './GnomeDTO';
import { HAIRCOLORS } from './CharacterService';


export default class Gnome extends GnomeDTO {
  constructor(dto: GnomeDTO) {
    super();
    Object.assign(this, dto);
  }

  convertCentimeterToInches(centimeters: number): string {
    return (centimeters * 0.39370).toFixed(2);
  }

  get heightInCentimeter(): number {
    return Number(this.height.toFixed(2));
  }

  get heightInInches(): number {
    return Number(this.convertCentimeterToInches(this.heightInCentimeter));
  }

  get hairColorCssClass(): string {
    if (this.hair_color === HAIRCOLORS.BLACK) {
      return 'bg-black text-white';
    }
    return `bg-${this.hair_color.toLowerCase()}-100 text-${this.hair_color.toLowerCase()}-800`;
  }
}
