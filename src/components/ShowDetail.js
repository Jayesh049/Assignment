// ShowDetails.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookingForm from './BookingForm';
import './ShowDetails.css';
import axios from 'axios';

const ShowDetails = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState({});
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
  });
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows/${id}`)
      .then(response => {
        setShowDetails(response.data);
      })
      .catch(error => console.error(error));
  }, [id]);

  useEffect(() => {
    // Load user details from local storage when the component mounts
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails')) || { name: '', email: '' };
    setUserDetails(storedUserDetails);
  }, []);  

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const bookingDetails = {
      showId: id,
      showName: showDetails.name,

      userDetails: {
        name: userDetails.name,
        email: userDetails.email,
      },
    };

    // Store bookingDetails in local storage
    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

    // For now, just log the details to the console
    console.log('Booking Details:', bookingDetails);

    // Show booking form when "Book a Ticket" button is clicked
    setShowBookingForm(true);
  };

  useEffect(() => {
    
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }, [userDetails]);

  return (
    <div className="container mt-4 show-details-container">
      <Link to="/" className="btn btn-secondary mb-3 back-btn">Back to Show List</Link>
      <div className="card show-card">
        <img src={showDetails.image?.medium} alt={showDetails.name} className="card-img-top" />
        <div className="card-body">

          <h2 className="card-title">{showDetails.name}</h2>

          <p className="card-text" dangerouslySetInnerHTML={{ __html: showDetails.summary }}></p>
          
          {/* Display "View Details" button */}
          {!showBookingForm && (
            <Link to={`/book-ticket/${id}`} className="btn btn-primary btn-book-ticket" onClick={handleSubmit}>
              Book a Ticket
            </Link>
          )}

          {/* Display BookingForm when "Book a Ticket" button is clicked */}
          {showBookingForm && <BookingForm showName={showDetails.name} />}

        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
