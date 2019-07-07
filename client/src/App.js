/* eslint-disable no-unused-expressions */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import GuestsContainers from './containers';

const App = (props) => {
  const {
    countAdults,
    incrementAdults,
    decrementAdults,
    countChildren,
    incrementChildren,
    decrementChildren,
  } = props;

  return (
    <div className="App">
      <GuestsContainers
        countAdults={countAdults}
        incrementAdults={incrementAdults}
        decrementAdults={decrementAdults}
        countChildren={countChildren}
        incrementChildren={incrementChildren}
        decrementChildren={decrementChildren}
      />
      <div className="BookingFormOutline">
        <div className="BookingFormInnerOutline">
          <div className="BookingFormHeader">
            <span className="Price">$49 </span>
            <span className="PriceDesc">per night</span>
            <div>
              <span>***** 144</span>
            </div>
          </div>
          <form>
            <div className="BookingForm">
              <div className="Dates">
                <span>Dates</span>
                <div className="Checking">
                  <input id="checkin" placeholder="Check-in"></input>
                  <span id="arrow"></span>
                  <input id="checkout" placeholder="Checkout"></input>
                </div>
              </div>
              <span>Guests</span>
              <div className="Guests">
                
              </div>
              <div className="Details">
                <div>
                  <span>$49 x 2 nights</span>
                </div>
                <div>
                  <span>$49 x 2 nights</span>
                </div>
                <div>
                  <span>$49 x 2 nights</span>
                </div>
                <div>
                  <span>$49 x 2 nights</span>
                </div>
              </div>
              <button><span>Start Booking</span></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
