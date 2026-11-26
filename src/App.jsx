
import './App.css';

import getCountries, {
    getCountryByName
} from "./services/countryApi.js";
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
            return "yellow";

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
    const [searchTerm, setSearchTerm] = useState("");
    const [country, setCountry] = useState(null);
    const [searchError, setSearchError] = useState("");

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
    const sortedCountries = [...countries].sort((a, b) =>
        a.population - b.population
    );

    const countriesPerColumn = Math.ceil(sortedCountries.length / 3);

    const countryColumns = Array.from({ length: 3 }, (_, index) =>
        sortedCountries.slice(
            index * countriesPerColumn,
            (index + 1) * countriesPerColumn
        )
    );

    function convertPopulation(population) {
        return Math.round(population / 1000000);
    }

    const handleSearch = async (event) => {
        event.preventDefault();

        const searchValue = searchTerm.trim();

        if (!searchValue) return;

        try {
            setLoading(true);
            setSearchError("");
            setCountry(null);

            const data = await getCountryByName(searchValue);

            setCountry(data);

        } catch (error) {
            setSearchError(
                `${searchValue} bestaat niet. Probeer het opnieuw`
            );

        } finally {
            setLoading(false);
            setSearchTerm("");
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
            <section className="search-section">

                    <h2>Zoek een land</h2>

                    <form onSubmit={handleSearch}>

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
                            placeholder="Bijvoorbeeld Nederland"
                        />

                        <button type="submit" disabled={loading}>
                            {loading ? "Zoeken..." : "Zoek"}
                        </button>

                    </form>

                    {searchError && (
                        <p className="error-message">
                            {searchError}
                        </p>
                    )}

            </section>
            {country && (
                <section className="country-details">

                    <div className="country-title">

                        <img
                            src={country.flags?.svg}
                            alt={`Vlag van ${country.name}`}
                        />

                        <h2>{country.name}</h2>

                    </div>

                    <p>
                        {country.name} is situated in {country.subregion}
                        and the capital is {country.capital}
                    </p>

                    <p>
                        It has a population of{" "}
                        {convertPopulation(country.population)} million people
                        and it borders with {country.borders?.length ?? 0}
                        neighboring countries
                    </p>

                    <p>
                        Websites can be found on{" "}
                        {country.topLevelDomain?.join(", ")} domains
                    </p>

                </section>
            )}


            {error && <p>{error}</p>}

            {countries.length > 0 && (
                <section className="countries-section">

                    <h2>Alle landen</h2>

                    <div className="countries-columns">

                        {countryColumns.map((column, index) => (
                            <div className="country-column" key={index}>

                                {column.map((country) => (
                                    <article
                                        className="country-item"
                                        key={country.alpha2Code}
                                    >

                                        <div className="country-info">

                                            <img
                                                src={country.flags?.svg}
                                                alt={`Vlag van ${country.name}`}
                                                className="country-flag"
                                            />

                                            <span style={{
                                                color: getRegionColor(country.region)
                                            }}>
                                    {country.name}
                                </span>

                                        </div>

                                        <p>
                                            Has a population of{" "}
                                            {country.population?.toLocaleString("nl-NL")}
                                            {" "}people
                                        </p>

                                    </article>
                                ))}

                            </div>
                        ))}

                    </div>
                </section>
            )}
        </main>
    );
}

export default App;
