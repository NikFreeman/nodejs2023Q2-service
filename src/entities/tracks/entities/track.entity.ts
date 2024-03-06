import { ITrack } from 'src/interfaces/track';

export class Track implements ITrack {
  id: string;
  name: string;
  artistId: string;
  albumId: string;
  duration: number;
}
