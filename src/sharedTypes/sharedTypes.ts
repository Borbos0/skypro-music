export interface Track {
    _id: number;
    name: string;
    author: string;
    release_date: string;
    genre: string[];
    duration_in_seconds: number;
    album: string;
    logo: string | null;
    track_file: string;
    stared_user: string[];
}
export interface Selection {
  _id: number;
  name: string;
  items: number[];
  owner: number[];
  __v: number;
}