
import './App.css';

import getCountries from "./services/countryApi.js";
import { useState } from "react";
import worldMap from "./assets/world_map.png";

function getRegionColor(region) {
    switch (region) {
        case "Africa":
            return "blue";

        case "Americas":
            return "green";

        case "Asia":
            return "red";

        case "Europe":
            return "#B8860B";

        case "Oceania":
            return "purple";

        default:
            return "#333333";
    }
}

function App() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleShowCountries = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getCountries();
            setCountries(data);

        } catch (error) {
            setError("Landen ophalen mislukt.");

        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <header className="header">
                <div className="world-map-container">
                    <img
                        src={worldMap}
                        alt="Wereldkaart"
                        className="world-map"
                    />

                    {countries.length === 0 && (
                        <button
                            className="show-countries-button"
                            onClick={handleShowCountries}
                            disabled={loading}
                        >
                            {loading ? "Landen laden..." : "Toon alle landen"}
                        </button>
                    )}
                </div>

                <h1>Countries of the world</h1>
            </header>



            {error && <p>{error}</p>}

            {countries.length > 0 && (
                <section className="countries-section">
                    <h2>Alle landen</h2>

                    <table className="countries-table">
                        <thead>
                        <tr>
                            <th>Vlag</th>
                            <th>Land</th>
                            <th>Inwoners</th>
                        </tr>
                        </thead>

                        <tbody>
                        {[...countries]
                            .sort((a, b) => a.population - b.population)
                            .map((country) => (
                            <tr key={country.alpha2Code}>
                                <td>
                                    <img
                                        src={country.flags?.svg}
                                        alt={`Vlag van ${country.name}`}
                                        className="country-flag"
                                    />
                                </td>

                                <td>
                                    <span style={{
                                        color: getRegionColor(country.region) }}>
                                        {country.name}
                                    </span>
                                </td>

                                <td>Has a population of{" "}
                                    {country.population?.toLocaleString("nl-NL")} people
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            )}
        </main>
    );
}

export default App;
