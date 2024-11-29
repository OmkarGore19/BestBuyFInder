import React, { useState } from "react";
import axios from "axios";
import Menu from "./Menu";
import Navbar from "./Navbar";

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const url ="https://bestbuyfinder-backend.onrender.com/api/search";

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url, {
        params: { query },
      });
      setResults(response.data.shopping_results);
    } catch (err) {
      setError("Error fetching data from the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-sky-500 via-blue-700 to-purple-700 text-white">
      <Navbar />

      <div className="flex flex-col items-center justify-center text-center w-full px-4 py-6 sm:px-8 md:px-16 max-w-screen-xl mx-auto mt-18">
        {/* Interactive Hero Section */}
        <h1 className="text-5xl font-bold mb-4 ">Welcome to BestBuyFinder</h1>
        <p className="text-xl max-w-lg mx-auto mb-6">
          Discover the best deals and compare prices across top e-commerce
          sites.
        </p>

        {/* Search Bar Section */}
        <div className="w-full max-w-screen-xl">
          <div className="flex space-x-2 justify-center my-6">
            <input
              type="text"
              placeholder="Search for a product..."
              className="flex-grow p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg text-center px-4 border-2"
            >
              Search
            </button>
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center mt-12">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 white"></div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-500 text-xl font-bold">
            {" "}
            Something went wrong :( {error}
          </p>
        )}

        {/* Results Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
          {results.map((item, index) => (
            <div
              key={index}
              className="border p-6 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {item.thumbnail && (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-contain mb-4 rounded-lg transition-all duration-300 ease-in-out hover:opacity-70 p-2"
                />
              )}
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-xl font-semibold text-green-600">
                {item.price}
              </p>
              {item.old_price && (
                <p className="line-through text-red-600">{item.old_price}</p>
              )}
              <p className="text-sm text-gray-600">Store: {item.source}</p>
              {item.delivery && (
                <p className="text-sm text-gray-500 mt-1">{item.delivery}</p>
              )}
              {item.store_rating && (
                <p className="text-sm text-gray-500 mt-1">
                  Store Rating: {item.store_rating} ({item.store_reviews}{" "}
                  reviews)
                </p>
              )}
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 mt-4 inline-block hover:text-blue-700 transition duration-300 ease-in-out"
              >
                View Product
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

// Here are a few tagline suggestions for your app:

// "Find the Best Deals, Fast!"
// "Shop Smart. Save More."
// "Your Shopping Assistant in One Click."
// "Compare, Shop, Save!"
// "Discover the Best Prices Instantly."
