/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  // filter by search phrase
  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  // TODO - filter by duration

  // TODO - filter by tags

  // TODO - sort by cost descending (most expensive goes first)

  return output;
};

export const getTripById = ({trips}, tripId) => {
  const filtered = trips;
  const currentTrip = filtered.filter(trip => {
    if (trip.id === tripId) {
      return trip; 
    } else null;
  });
  const index = filtered.indexOf(currentTrip[0]);
  return filtered.length ? filtered[index] : {error: true};
};

export const getTripsForCountry = ({trips}, countryCode) => {
  const filtered = trips;
  const currentTrips = filtered.filter(trip => {
    if (trip.country.code === countryCode) {
      return trip;
    } else null;
  });
  return filtered.length ? currentTrips : {error: true};
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
