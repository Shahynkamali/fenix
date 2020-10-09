// eslint-disable-next-line import/no-cycle
import GnomeDTO from './GnomeDTO';


export default class Gnome extends GnomeDTO {
  constructor(dto: GnomeDTO) {
    super();
    Object.assign(this, dto);
  }

  get gnomeName(): string {
    return this.name;
  }
}
