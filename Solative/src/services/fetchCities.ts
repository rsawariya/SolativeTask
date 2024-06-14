import axios from 'axios';

interface City {
    id: string;
    name: string;
    country: string;
}

interface ApiResponse {
    data: {
        data: City[];
    };
}

const API_KEY = import.meta.env.VITE_API_KEY as string;
const BASE_URL = import.meta.env.VITE_BASE_URL as string;

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
    },
});

export const fetchCities = async (namePrefix: string, limit = 5): Promise<City[]> => {
    var options = {
        method: 'GET',
        url: `${BASE_URL}/cities`,
        params: { countryIds: "IN", namePrefix, limit },
        headers: {
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
            'x-rapidapi-key': API_KEY
        }
    };

    try {
        const response: ApiResponse = await apiClient.request(options);
        return response.data;
    } catch (error) {
        console.error('Error fetching cities:', error);
        return [];
    }
};
