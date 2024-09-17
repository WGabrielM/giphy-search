import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [gifs, setGifs] = useState([]);
  const [searchGif, setSearchGif] = useState("");

  const API_KEY = "pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa";

  const searchGifs = async () => {
    try {
      const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: API_KEY,
          q: searchGif, 
          limit: 10, 
        },
      });
      setGifs(response.data.data); // Set the gifs in state
    } catch (error) {
      console.error("Error fetching gifs:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchGifs(); 
  };


  return (
    <section className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchGif}
          placeholder="Search for a GIF"
          onChange={(e) => setSearchGif(e.target.value)}
          required
        />
        <button
          className="search-button"
          type="submit"
        >
          Search
        </button>
      </form>

      <main className="list">
        <h1>Trending Gifs</h1>
        <div className="list-gifs">
          {gifs.map((gif) => (
            <div key={gif.id}>
              <img src={gif.images.fixed_height.url} alt={gif.title} />
            </div>
          ))}
        </div>
      </main>
    </section>
  );
}

export default App;
