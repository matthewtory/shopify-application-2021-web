export type OMDbMovie = {
    imdbID: string,
    Title: string,
    Year: string,
    Poster: string
}

const API_KEY = '7741da66';

interface OMDbRepository {
    queryMovies: (query: string) => Promise<OMDbMovie[]>
}

const omdbRepository: OMDbRepository = {
    queryMovies: async (query) => {
        if (!query) {
            return [];
        }

        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&type=movie&s=${encodeURIComponent(query)}`;

        const response = await fetch(url);

        const data = await response.json();

        if (data['Response'] === 'True') {
            return data['Search'] as OMDbMovie[];
        } else {
            return [];
        }
    }
};

export default omdbRepository;