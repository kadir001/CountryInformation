
import axios from "axios";

const API = axios.create({
    baseURL: "https://countries.dev",
    headers: {
        Accept: "application/json",
    },
});

export const getCountries = async () => {
    try {
        const response = await API.get("/countries", {
            params: {
                full: true,
            },
        });

        return response.data;

    } catch (error) {
        console.error("Fout bij ophalen landen:", error);
        throw error;
    }
};
