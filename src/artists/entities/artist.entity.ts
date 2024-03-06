interface IArtist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}
export class Artist implements IArtist {
  id: string;
  name: string;
  grammy: boolean;
}
