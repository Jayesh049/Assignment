import React, { useState, useEffect } from 'react';
import './BookingForm.css';

const BookingForm = ({ showName }) => {
  
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
  });

  
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  
  useEffect(() => {
    
    const storedUserDetailsString = localStorage.getItem('userDetails');
    const storedUserDetails = storedUserDetailsString ? JSON.parse(storedUserDetailsString) : { name: '', email: '' };
    
    
    setUserDetails(storedUserDetails);
  }, []);  

  
  useEffect(() => {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }, [userDetails]);

  
  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    
    const bookingDetails = {
      movieName: showName,
      bookingDate: new Date().toISOString(),
      userDetails: {
        name: userDetails.name,
        email: userDetails.email,
      },
      
    };

    
    setBookingConfirmed(true);

    
    setUserDetails({
      name: userDetails.name,
      email: userDetails.email,
      
    });

    
    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    
    console.log('Custom Booking Details:', bookingDetails);
  };

  
  return (
    <div className="booking-form-container">
      {!bookingConfirmed ? (
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <button type="submit">Submit Booking</button>
        </form>
      ) : (
        <div className="booking-confirmation">
          <h3>Booking Confirmed!</h3>
          <p>Thank you, {userDetails.name}, for booking tickets for {showName}.</p>
          
        </div>
      )}
    </div>
  );
};

export default BookingForm;
