/* eslint-disable import/no-cycle */
import GnomeDTO from './GnomeDTO';
import { HAIRCOLORS } from './CharacterService';

export default class Gnome extends GnomeDTO {
  constructor(dto: GnomeDTO) {
    super();
    Object.assign(this, dto);
  }

  private convertCentimeterToInches(centimeters: number): string {
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

  get isEmployed() {
    return !!this.professions.length;
  }


  static findGnomes(names: string[], gnomes: Gnome[]) {
    const friendProfiles: Gnome[] = [];
    names.forEach((friend: string) => {
      gnomes.forEach((character: Gnome) => {
        if (character.name.toLowerCase().trim() === friend.toLowerCase().trim()) {
          friendProfiles.push(character);
        }
      });
    });
    return friendProfiles;
  }

  static sortGnomesByAge(gnomes: Gnome[]) {
    return gnomes.sort((a, b) => b.age - a.age);
  }

  static sortGnomesByHairColor(gnomes: Gnome[], haircolor: HAIRCOLORS) {
    return gnomes.filter((gnome) => gnome.hair_color === haircolor);
  }
}
