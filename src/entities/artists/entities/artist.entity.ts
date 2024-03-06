import { IArtist } from 'src/interfaces/artist';

export class Artist implements IArtist {
  id: string;
  name: string;
  grammy: boolean;
}
