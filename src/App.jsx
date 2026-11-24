import './App.css';

import {getCountries} from "./services/countryApi.js";
import {useState} from "react";


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
            <h1>Countries</h1>

            {countries.length === 0 && (
                <button
                    onClick={handleShowCountries}
                    disabled={loading}
                >
                    {loading ? "Laden..." : "Toon landen"}
                </button>
            )}

            {error && <p>{error}</p>}

            {countries.length > 0 && (
                <p>Aantal landen: {countries.length}</p>
            )}
        </main>
    );
}

export default App;