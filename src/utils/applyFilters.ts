import { Track } from "@/sharedTypes/sharedTypes"
import { initialStateType } from "@/store/features/trackSlice"

export const applyFilters = (state: initialStateType): Track[] => {
  let filteredPlaylist = state.pagePlaylist;

  if (state.filters.authors.length) {
    filteredPlaylist = filteredPlaylist.filter(el => state.filters.authors.includes(el.author));
  }
  if (state.filters.genres.length) {
    filteredPlaylist = filteredPlaylist.filter(el => state.filters.genres.some(gen => el.genre.includes(gen)));
  }
  if (state.filters.years) {
    filteredPlaylist = filteredPlaylist.filter((track) => {
      const year = new Date(track.release_date).getFullYear().toString();
      return year === state.filters.years;
    });
  }
  if (state.filters.search && state.filters.search.trim()) {
  const userSearch = state.filters.search.trim().toLowerCase();
  filteredPlaylist = filteredPlaylist.filter((el) => {
    const inName = el.name.toLowerCase().includes(userSearch);
    const inAuthor = el.author.toLowerCase().includes(userSearch);
    const inAlbum = el.album.toLowerCase().includes(userSearch);
    const inGenre =
      Array.isArray(el.genre) && el.genre.some((gen) => gen.toLowerCase().includes(userSearch));
    return inName || inAuthor || inAlbum || inGenre;
  });
}
  return filteredPlaylist;
};
