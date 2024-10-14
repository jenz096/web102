import React, { useState, useEffect } from "react";

const CatAPIComponent = () => {
  const [catData, setCatData] = useState(null);
  const [banList, setBanList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch cat data using fetch
  const fetchCatData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=1&include_breeds=true",
        {
          headers: { 'x-api-key': 'live_hp70RIgKybEnLEIWHqKQJa9MLCDDJWy9YjLCk74A3lphlHalmP9VwqECdo7YWy3r' }
        }
      );
      const data = await response.json();
      const cat = data[0];
  
      // Check if the cat has breed information, if not, fetch again
      if (cat.breeds && cat.breeds.length > 0) {
        const breed = cat.breeds[0];
  
        // Use selected attributes from the response
        const breedName = breed.name;
        const energyLevel = breed.energy_level;
        const hypoallergenic = breed.hypoallergenic ? "Yes" : "No";
        const lifeSpan = `${breed.life_span} years`;
  
        // Check if any of these attributes are in the ban list
        const isBanned = [breedName, energyLevel, hypoallergenic, lifeSpan].some(attr => banList.includes(attr));
  
        if (!isBanned) {
          setCatData({
            imageUrl: cat.url,
            breedName: breedName,
            energyLevel: energyLevel,
            hypoallergenic: hypoallergenic,
            lifeSpan: lifeSpan,
            id: cat.id,
          });
          setIsLoading(false);
        } else {
          fetchCatData(); // Retry if any attribute is banned
        }
      } else {
        // Retry if the cat has no breed information
        fetchCatData();
      }
    } catch (error) {
      console.error("Error fetching the cat data:", error);
      setIsLoading(false);
    }
  };
  
  // Function to add/remove attributes from the ban list
  const toggleBanList = (attribute) => {
    setBanList((prevBanList) => {
      if (prevBanList.includes(attribute)) {
        // Remove the attribute if it is already in the ban list
        return prevBanList.filter(item => item !== attribute);
      } else {
        // Add the attribute if it is not in the ban list
        return [...prevBanList, attribute];
      }
    });
  };
  
  useEffect(() => {
    fetchCatData();
  }, []);
  
  return (
    <div>
      <h1>KittyXplore</h1>
      <p>Explore the world of cats!</p>
      <p>Click on an attribute to ban it from the list.</p>
  
      {/* Button to fetch a new cat */}
      <button onClick={fetchCatData} disabled={isLoading}>
        {isLoading ? "Loading..." : "Fetch a New Cat"}
      </button>
  
      {/* Displaying only one API response */}
      {catData && (
        <div>
          <img src={catData.imageUrl} alt="A random cat" width="300" />
          <p>
            Breed:{" "}
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => toggleBanList(catData.breedName)}
            >
              {catData.breedName}
            </span>
          </p>
          <p>
            Energy Level:{" "}
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => toggleBanList(catData.energyLevel)}
            >
              {catData.energyLevel}
            </span>
          </p>
          <p>
            Hypoallergenic:{" "}
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => toggleBanList(catData.hypoallergenic)}
            >
              {catData.hypoallergenic}
            </span>
          </p>
          <p>
            Life Span:{" "} 
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => toggleBanList(catData.lifeSpan)}
            >
              {catData.lifeSpan}
            </span>
          </p>
        </div>
      )}
  
      {/* Displaying the ban list */}
      <div>
        <h3>Banned Attributes:</h3>
        <ul>
          {banList.map((attribute, index) => (
            <li key={index} onClick={() => toggleBanList(attribute)} style={{ cursor: "pointer", textDecoration: "underline" }}>
              {attribute}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CatAPIComponent;
