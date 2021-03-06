/* eslint-disable import/no-cycle */
import { SORTBYAGE, HAIRCOLORS } from '@/helpers';
import GnomeDTO from './GnomeDTO';

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

  get isEmployed(): boolean {
    return !!this.professions.length;
  }

  static findGnomes(names: string[], gnomes: Gnome[]): Gnome[] {
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

  private static sortAscending(collection: Gnome[]): Gnome[] {
    return collection.sort((a, b) => a.age - b.age);
  }

  private static sortDescending(collection: Gnome[]): Gnome[] {
    return collection.sort((a, b) => b.age - a.age);
  }

  public static sortGnomesByAge(collection: Gnome[], order: SORTBYAGE): Gnome[] {
    return order === SORTBYAGE.ASCENDING ? Gnome.sortAscending(collection) : Gnome.sortDescending(collection);
  }

  public static sortGnomesByHairColor(gnomes: Gnome[], haircolor: HAIRCOLORS): Gnome[] {
    return haircolor === HAIRCOLORS.ALL ? gnomes : gnomes.filter((gnome: Gnome) => gnome.hair_color === haircolor);
  }

  public static sortGnomesByProfession(gnomes: Gnome[], profession: string): Gnome[] {
    return profession === 'All Professions' ? gnomes : gnomes.filter((gnome: Gnome) => gnome.professions.includes(profession));
  }

  public static sortGnomesByName(gnomes: Gnome[], name: string): Gnome[] {
    return !name ? gnomes : gnomes.filter((gnome: Gnome) => name.toLowerCase().split(' ').every((n) => gnome.name.toLowerCase().includes(n)));
  }

  private static mergeArrayAndRemoveDuplicats(arr: any): string[] {
    return [...new Set([].concat(...arr))];
  }

  public static collectionOfAllProfessions(gnomes: Gnome[]): string[] {
    const gnomesWithProffessions = gnomes.filter((gnome: Gnome) => gnome.isEmployed);
    const allProfessions: string[][] = [];
    gnomesWithProffessions.forEach((gnome: Gnome) => {
      allProfessions.push(gnome.professions);
    });
    return Gnome.mergeArrayAndRemoveDuplicats(allProfessions);
  }
}
