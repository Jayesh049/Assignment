// ShowList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ShowList.css';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        setShows(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShows();
  }, []);

  useEffect(() => {
    console.log('Shows updated:', shows);
  }, [shows]);

  return (
    <div className="container mt-4 show-list-container">
      
      <h2 className="mb-4">TV Show List</h2>

      <div className="row">
        {shows.map(show => (
          <div key={show.show.id} className="col-md-4 mb-4">
            <Link to={`/show/${show.show.id}`} className="card show-card">

              <img src={show.show.image?.medium} alt={show.show.name} className="card-img-top" />

              <div className="card-body">
                <h5 className="card-title">{show.show.name}</h5>
                <p className="card-text">Premiere Date: {show.show.premiered}</p>

                <Link to={`/show/${show.show.id}`} className="btn btn-primary view-details-btn">
                  View Details
                </Link>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
