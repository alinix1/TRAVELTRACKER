// IMPORT FILES //
// ---------------------------------------------------

import dayjs from 'dayjs';
import './css/styles.css';
import './images/airplane-window.png';
import './images/flying-money.png';
import Traveler from '../src/classes/Traveler.js';
import TravelerRepository from '../src/classes/TravelerRepository.js';
import TripsRepository from '../src/classes/TripsRepository.js';
import DestinationsRepository from '../src/classes/DestinationsRepository.js';
import { apiCalls } from './apiCalls';

// GLOBAL VARIABLES //
// ---------------------------------------------------

let allDestinations;
let allTravelers;
let allTrips;
let destinationsRepo;
let tripsRepo;
let travelersRepo;
let traveler;

// FETCH PROMISES //
// ---------------------------------------------------

Promise.all([apiCalls.getTravelersData(), apiCalls.getTripsData(), apiCalls.getDestinationsData()])
  .then((data) => {
    const allTravelersData = data.reduce((acc, currentItem) => {
      return acc = {...acc, ...currentItem}
    }, {})
    allDestinations = allTravelersData.destinations;
    console.log('all destinations: ', allDestinations);
    allTravelers = allTravelersData.travelers;
    console.log('all travelers: ', allTravelers);
    allTrips = allTravelersData.trips;
    console.log('all trips: ', allTrips);
    destinationsRepo = new DestinationsRepository(allDestinations);
    tripsRepo = new TripsRepository(allTrips);
    travelersRepo = new TravelerRepository(allTravelers);
    traveler = new Traveler(allTravelers[Math.floor(Math.random() * allTravelers.length)]);
    populateLocationsDropdown();
    onLoginSuccess();
    displayTotalCostAnnualTrip();
  });

  // POST API DATA //
// ---------------------------------------------------


  // QUERY SELECTORS //
// ---------------------------------------------------

var travelerName = document.getElementById('travelerName');
var loginForm = document.querySelector('.login-form');
var pastTrips = document.querySelector('.past-trips');
var futureTrips = document.querySelector('.future-trips');
var presentTrips = document.querySelector('.present-trips');
var planTripForm = document.querySelector('.plan-trip-form');
var mainSection = document.querySelector('main');
var totalCostYear = document.querySelector('.total-cost-year');
var totalCostTravelerTrip = document.getElementById('totalAmount');
var submitCostButton = document.getElementById('submitCostButton');
var destinationDataList = document.getElementById('destination-datalist');
var durationTripInfo = document.getElementById('duration-trip-info');
var numberTravelersInfo = document.getElementById('number-travelers-info');
var travelFormDate = document.getElementById('travelFormDate');
var dataList = document.getElementById('destinations');
var usernameInput = document.getElementById('username-input');
var passwordInput = document.getElementById('password-input');
var loginBtn = document.getElementById('loginButton');
var refreshBtn = document.querySelector('.refresh-button');
var submitTripButton = document.getElementById('submitTripButton');

  // EVENT LISTENERS // 
  // ---------------------------------------------------

  submitCostButton.addEventListener('click', displayTripDetails);
  loginBtn.addEventListener('click', loginTraveler);
  refreshBtn.addEventListener('click', refreshingButton);
  
  // FUNCTIONS // 
  // ---------------------------------------------------
  
  function onLoginSuccess() {
    displayTravelerInfo();
    // formatPastTrips();
    // showTravelerTrips(time);
  };
  function refreshingButton() {
    location.reload();
  };

  // HIDE AND SHOW FUNCTIONS //
    
  // function show(e) {
  //   e.classList.remove('hidden')
  // }

  // function hide(e) {
  //   e.classList.add('hidden')
  // }

  // mainSection.classList.remove('hidden');
  // loginForm.classList.add('hidden');

  // USER LOGIN //
  // ---------------------------------------------------
  
  function loginTraveler() {
    let userName = usernameInput.value;
    if (userName.length < 8) {
      return;
    }
    let userPassword = passwordInput.value;
    let userId = userName.substr(8, userName.length);
    let parsedId = parseInt(userId);
    if (isNaN(parsedId)) {
      console.log('username is invalid type!');
      return;
    }
    if (userPassword !== 'travel') {
      console.log('Invalid password entry!');
      return;
    }
    console.log('password correct!');
    traveler = travelersRepo.getTravelerInfoById(parsedId);
    if (traveler === undefined) {
      console.log('traveler ID is invalid');
      return;
    }
    onLoginSuccess();
  };

// DRY UP FUNCTION //

  // function checkUserNameValidity(userName) {
  //   const firstEight = userName.substring(0, 7);
  //   const userNameNumber = userName.substring(8);
  //   if(!firstEight === 'traveler'|| parseInt(userNameNumber) > 50) {
  //     return false;
  //   } else {
  //     return parseInt(userNameNumber);
  //   };
  // };
  
  // function checkPasswordValidity(password) {
  //   if (password === 'travel') {
  //     return true;
  //   };
  // };
    
  // DOM MANIPULATION //
  // ---------------------------------------------------
  
  function displayTravelerInfo() {
    travelerName.innerHTML = `Welcome, ${traveler.returnFirstName()}`;
  };

  function populateLocationsDropdown() {
    destinationsRepo.getAllDestinations().forEach(destination => {
      var option = document.createElement('option');
      option.value = destination.destination;
      option.id = destination.id;
      dataList.appendChild(option);
    });
  };

  function displayTripDetails() {
    let selectedDestination = destinationDataList.value;
    let selectedTripDuration = durationTripInfo.value;
    let selectedNumTravelers = numberTravelersInfo.value;

    let selectedDestinationOption = document.querySelector('option[value="' + selectedDestination + '"]');
    let selectedDestinationId = parseInt(selectedDestinationOption.id);

    let destination = destinationsRepo.getDestinationById(selectedDestinationId);

    let trip = {
      travelers: selectedNumTravelers,
      duration: selectedTripDuration
    }

   let estimatedCost = tripsRepo.totalCostSingleTrip(trip, destination);
   totalCostTravelerTrip.innerText = '$' + estimatedCost;
 
  };
  
  function displayTotalCostAnnualTrip() {
    let tripsYear = (new Date()).getFullYear().toString();
    let totalCost = tripsRepo.getTripsById(traveler.id).reduce((acc, currentTrip) => {
      allDestinations.forEach(destination => {
        if((currentTrip.destinationID === destination.id) && (currentTrip.date.split("/")[0]) === tripsYear) {
        acc += ((currentTrip.duration * destination.estimatedLodgingCostPerDay) +
          (currentTrip.travelers * destination.estimatedFlightCostPerPerson)) * 1.1;
        }
      })
      return acc
    }, 0)
    return totalCostYear.innerHTML = `<h3>$${totalCost.toFixed(2)} spent this year* (not including upcoming trips)</h3>`;
  };






