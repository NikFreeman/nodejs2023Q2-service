interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
export class Album implements IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string;
}
