import React, { useState } from 'react';

const Emergency = () => {
    const [placeName, setPlaceName] = useState('');
    const [radius, setRadius] = useState(5000);
    const [hospitals, setHospitals] = useState([]);
    const [error, setError] = useState(null);

    const getCoordinatesFromPlaceName = async (placeName) => {
        const apiKey = 'AIzaSyB1UOBnfU2NMx2soTgoz1BqhcA2jkhzflA';  // Replace with your Google Maps API key
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(placeName)}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'OK') {
                const location = data.results[0].geometry.location;
                return location; // { lat: ..., lng: ... }
            } else {
                setError('Place not found or invalid name. Please try again.');
                return null;
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error);
            setError('Failed to get coordinates. Please try again later.');
            return null;
        }
    };

    const fetchHospitals = async (e) => {
        e.preventDefault();

        if (!placeName) {
            setError('Please provide a place name.');
            return;
        }

        const location = await getCoordinatesFromPlaceName(placeName);

        if (!location) return;

        const { lat, lng } = location;

        try {
            const response = await fetch(`http://localhost:5000/api/emergency/nearby-hospitals?latitude=${lat}&longitude=${lng}&radius=${radius}`);
            const hospitalsData = await response.json();

            if (hospitalsData.length === 0) {
                setHospitals([]);
                setError('No hospitals found.');
                return;
            }

            setHospitals(hospitalsData);
            setError(null); // Clear any previous error
        } catch (error) {
            console.error('Error fetching hospitals:', error);
            setError('Failed to fetch hospitals. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Nearby Hospitals</h1>
            <form onSubmit={fetchHospitals}>
                <label htmlFor="place-name">Place Name:</label>
                <input
                    type="text"
                    id="place-name"
                    placeholder="Enter place name"
                    value={placeName}
                    onChange={(e) => setPlaceName(e.target.value)}
                    required
                />
                <br />

                <label htmlFor="radius">Radius (in meters):</label>
                <input
                    type="number"
                    id="radius"
                    placeholder="Default: 5000"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value || 5000)}
                />
                <br />

                <button type="submit">Fetch Hospitals</button>
            </form>
            <hr />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div id="results">
                {hospitals.length > 0 ? (
                    hospitals.map((hospital, index) => (
                        <div key={index}>
                            <h3>{hospital.name}</h3>
                            <p>Address: {hospital.address}</p>
                            <p>Location: Latitude {hospital.location.lat}, Longitude {hospital.location.lng}</p>
                            <p>
                                <a href={`https://www.google.com/maps?q=${hospital.location.lat},${hospital.location.lng}`} target="_blank" rel="noopener noreferrer">
                                    View on Google Maps
                                </a>
                            </p>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No hospitals found.</p>
                )}
            </div>
        </div>
    );
};

export {Emergency};
