// IMPORT FILES //
// ---------------------------------------------------
import dayjs from 'dayjs';
import './css/styles.css';
import './images/flying.png';
import Traveler from '../src/classes/Traveler.js';
import TravelerRepository from '../src/classes/TravelerRepository.js';
import TripsRepository from '../src/classes/TripsRepository.js';
import DestinationsRepository from '../src/classes/DestinationsRepository.js';
import { apiCalls } from './apiCalls'

// GLOBAL VARIABLES //
// ---------------------------------------------------
let travelerRepository;
let destinationsRepository;
let tripsRepository;
let travelers;
let singleTraveler;

// FETCH PROMISES //
// ---------------------------------------------------

Promise.all([apiCalls.getTravelersData(), apiCalls.getTripsData(), apiCalls.getDestinationsData()])
  .then((data) => {
    const allTravelersData = data.reduce((acc, currentItem) => {
        console.log('100', acc)
      return acc = {...acc, ...currentItem}
    }, {})
    instantiateData(allTravelersData)
  })

  // POST API DATA //
// ---------------------------------------------------


  // QUERY SELECTORS //
// ---------------------------------------------------


  // EVENT LISTENERS // 
  // ---------------------------------------------------


  // INSTANTIATE CLASSES - FUNCTIONS //
  // ---------------------------------------------------

  function instantiateData(data) {
    travelers = data.travelers.map(traveler => new Traveler(traveler));
    travelerRepository = new TravelerRepository(travelers)
    singleTraveler = new Traveler(travelers[getRandomId()])
    tripsRepository = new TripsRepository(data.trips)
    destinationsRepository = new DestinationsRepository(data.destinations)
  }
  

  // FUNCTIONS // 
  // ---------------------------------------------------

  function getRandomId() {
    return Math.floor(Math.random() * 49) +1
  }


  // FORM AND USER LOGIN //
  // ---------------------------------------------------


  // DOM MANIPULATION //
  // ---------------------------------------------------






