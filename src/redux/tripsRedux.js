/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  // filter by search phrase
  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  // filter by duration
  output = output.filter(trip =>
    (trip.days >= filters.duration.from && 
      trip.days <= filters.duration.to));

  // filter by tags - show all trips that have ALL chosen tags cumulatively
  if(filters.tags.length > 0) {
    filters.tags.forEach(tag => 
      output = output.filter(trip => 
        trip.tags.includes(tag) ? output : null)
    );
  }

  // sort by cost descending (most expensive goes first)
  const compareCosts = (a, b) => {
    a = a.cost.substr(1).replace(',', '');
    b = b.cost.substr(1).replace(',', '');
    return b - a;
  };
  output.sort(compareCosts);

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
