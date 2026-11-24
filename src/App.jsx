
import './App.css';

import getCountries from "./services/countryApi.js";
import { useState } from "react";
import worldMap from "./assets/world_map.png";

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
                <img
                    src={worldMap}
                    alt="Wereldkaart"
                    className="world-map"
                />

                <h1>Countries of the world</h1>
            </header>

            {countries.length === 0 && (
                <button
                    onClick={handleShowCountries}
                    disabled={loading}
                >
                    {loading ? "Landen laden..." : "Toon alle landen"}
                </button>
            )}

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
                        {countries.map((country) => (
                            <tr key={country.alpha2Code}>
                                <td>
                                    <img
                                        src={country.flags?.svg}
                                        alt={`Vlag van ${country.name}`}
                                        className="country-flag"
                                    />
                                </td>

                                <td>{country.name}</td>

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
