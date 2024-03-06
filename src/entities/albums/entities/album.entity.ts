import { IAlbum } from 'src/interfaces/album';

export class Album implements IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string;
}
