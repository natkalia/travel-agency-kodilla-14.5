import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './App.scss';

import MainLayout from './components/layout/MainLayout/MainLayout';

import Home from './components/views/Home/Home';
import Trips from './components/views/Trips/TripsContainer';
import Countries from './components/views/Countries/CountriesContainer';
import Regions from './components/views/Regions/RegionsContainer';
import Trip from './components/views/Trip/TripContainer';
import Country from './components/views/Country/CountryContainer';
import Info from './components/views/Info/Info';
import NotFound from './components/views/NotFound/NotFound';

import {AnimatedSwitch, spring} from 'react-router-transition';

import parseTrips from './utils/parseTrips';
import {setMultipleStates} from './redux/globalRedux';

class App extends React.Component {
  static propTypes = {
    trips: PropTypes.array,
    setStates: PropTypes.func,
  }

  constructor(props){
    super(props);
    // parse trips when App is first created
    parseTrips(this.props.trips, this.props.setStates);
  }

  componentDidUpdate(prevProps){
    if(prevProps.trips != this.props.trips){
      // parse trips again if they changed
      parseTrips(this.props.trips, this.props.setStates);
    }
  }

  render(){

    const mapStyles = (styles) => {
      return {
        opacity: styles.opacity,
        transform: `translateY(${styles.offset}px)`,
      };
    };

    const glide = (val) => {
      return spring(val, {
        // stiffness defines how forcefully the object in an animation is pulled towards its final value
        stiffness: 80,
        // damping is the simulated friction the object will be subject to as it approaches its target
        damping: 20,
      });
    };

    const routeTransitions = {
      atEnter: {
        offset: 200,
      },
      atLeave: {
        offset: glide(0),
      },
      atActive: {
        offset: 0,
      },
    };

    return (
      <BrowserRouter>
        <MainLayout>
          <AnimatedSwitch 
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className={styles.switchWrapper}
            location={location}
            mapStyles={mapStyles}
            {...routeTransitions}>

            <Route exact path='/' component={Home} />
            <Route exact path='/trips' component={Trips}/>
            <Route exact path='/countries' component={Countries} />
            <Route exact path='/regions' component={Regions} />
            <Route exact path='/trip/:id' component={Trip} />
            <Route exact path='/country/:id' component={Country} />
            <Route exact path='/info' component={Info} />
            <Route path='*' component={NotFound} />
          </AnimatedSwitch>
        </MainLayout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.trips,
});

const mapDispatchToProps = dispatch => ({
  setStates: newState => dispatch(setMultipleStates(newState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
