
import axios from "axios";

const API = axios.create({
    baseURL: "https://countries.dev",
    headers: {
        Accept: "application/json",
    },
});

const getCountries = async () => {
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

export const getCountryByName = async (countryName) => {
    const response = await API.get(
        `/name/${encodeURIComponent(countryName)}`
    );

    console.log("API response:", response.data);

    const country = response.data.find(
        (item) =>
            item.name.toLowerCase() === countryName.toLowerCase()
    );

    if (!country) {
        throw new Error("Country not found");
    }

    return country;
};

export default getCountries;
