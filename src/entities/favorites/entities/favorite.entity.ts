import { IFavorites } from 'src/interfaces/favorite';

export class Favorite implements IFavorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}
