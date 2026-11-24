import './App.css';

function App() {

    async function showCountries() {
        const response = await axios.get('https://api.restcountries.com/countries/v5');
        try {console.log(response);

        }catch(err) {
            console.log(err);
        }
    }
    }

    return (
        <>
            <h1>Countries</h1>
            <button type="button" onClick={showCountries}></button>
        </>
    )
}

export default App
