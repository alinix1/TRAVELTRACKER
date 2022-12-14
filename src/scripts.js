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
let randomTraveler;
let loggedInTraveler;

//TODO:  do I need a global variable for randomTraveler?
// want to greet the loggedInTraveler once they login not a random traveler

// FETCH PROMISES //
// ---------------------------------------------------

Promise.all([apiCalls.getTravelersData(), apiCalls.getTripsData(), apiCalls.getDestinationsData()])
  .then((data) => {
    const allTravelersData = data.reduce((acc, currentItem) => {
      return acc = {...acc, ...currentItem}
    }, {})
    allDestinations = allTravelersData.destinations;
    allTravelers = allTravelersData.travelers;
    allTrips = allTravelersData.trips;
    destinationsRepo = new DestinationsRepository(allDestinations);
    tripsRepo = new TripsRepository(allTrips);
    travelersRepo = new TravelerRepository(allTravelers);
    randomTraveler = new Traveler(allTravelers[Math.floor(Math.random() * allTravelers.length)]);
    populateLocationsDropdown();
    displayTravelerInfo();
  });
  
  // POST API DATA //
  // ---------------------------------------------------

  function postNewTrip(event) {
    event.preventDefault()
    let destinationValue = destinationDataList.value;
    let travelersValue =  numberTravelersInfo.value;
    let durationValue = durationTripInfo.value;
    let travelValue =  travelFormDate.value;
    let newDateValue = travelValue.split('-').join('/')
    let destinationObj = allDestinations.find(destinationObj => destinationValue === destinationObj.destination)
    let data = {
      id: Date.now(),
      userID: loggedInTraveler.id,
      destinationID: destinationObj.id,
      travelers: travelersValue,
      date: newDateValue,
      duration: durationValue,
      status: 'pending',
      suggestedActivities: []
    }
    let result = apiCalls.postTravelersData(data)
      .then((data) => {
        displayPendingTrip(data.newTrip)
      })
      clearTripForm();
  };

  // QUERY SELECTORS //
// ---------------------------------------------------

var travelerName = document.getElementById('travelerName');
var loginForm = document.getElementById('login-form');
var pastTrips = document.querySelector('.past-trips');
var futureTrips = document.querySelector('.upcoming-trips');
var pendingTrips = document.querySelector('.pending-trips');
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
var submitTripButton = document.querySelector('button.submit-trip-btn');

  // EVENT LISTENERS //
  // ---------------------------------------------------

  submitCostButton.addEventListener('click', displayTripDetails);
  loginBtn.addEventListener('click', loginTraveler);
  submitTripButton.addEventListener('click', postNewTrip);
  
  // FUNCTIONS //
  // ---------------------------------------------------

  function onLoginSuccess() {
    console.log('login was success');
    hide(loginForm)
    show(mainSection)
    displayFuture()
    displayPast()
    displayTotalCostAnnualTrip()  
    submitTripButton = document.getElementById('submitTripButton');
  };

  function show(e) {
    e.classList.remove('hidden')
  };

  function hide(e) {
    e.classList.add('hidden')
  };
 
  // USER LOGIN //
  // ---------------------------------------------------

  function loginTraveler(event) {
    event.preventDefault()
    let userName = usernameInput.value;
    if (userName.length < 8) {
      return;
    }
    let userPassword = passwordInput.value;
    let user = allTravelers.find(traveler => `traveler${traveler.id}` === userName)
    let travelerData;
    if (user) {
      travelerData = travelersRepo.getTravelerInfoById(user.id);
    }
    if (!user) {
      alert('username is invalid type!');
    } else if (userPassword !== 'travel') {
      alert('Invalid password entry!');
    } else if (travelerData === undefined) {
      alert('traveler ID is invalid');
    } else {
      loggedInTraveler = new Traveler(travelerData);
      onLoginSuccess();
    }
  };

  function clearTripForm() {
  };

  // DOM MANIPULATION //
  // ---------------------------------------------------

  function displayTravelerInfo() {
    travelerName.innerHTML = `Welcome, ${randomTraveler.returnFirstName()}`;
  };

  // TODO: greet loggedInTraveler not randomTraveler

  function populateLocationsDropdown() {
    destinationsRepo.getAllDestinations().forEach(destination => {
      var option = document.createElement('option');
      option.value = destination.destination;
      option.id = destination.id;
      dataList.appendChild(option);
    });
  };

  function displayTripDetails(event) {
    event.preventDefault()
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
    let totalCost = tripsRepo.getTripsById(loggedInTraveler.id).reduce((acc, currentTrip) => {
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

function displayFuture() {
  let ID = loggedInTraveler.id
  tripsRepo.getAllFutureTrips(ID).filter(currentTrip => {
    allDestinations.forEach(destination => {
      if (currentTrip.destinationID === destination.id) {
        futureTrips.innerHTML += createTripCard(destination)
      }
  })
})
};

function displayPast() {
  let ID = loggedInTraveler.id
  tripsRepo.getAllPastTrips(ID).filter(currentTrip => {
    allDestinations.forEach(destination => {
      if (currentTrip.destinationID === destination.id) {
        pastTrips.innerHTML += createTripCard(destination)
      }
    })
  })
};

//TODO: add to the trip card info on the date 

function createTripCard(destination) {
  // let trip = tripsRepo.getTripsById(trip.userID)
  return `<div>
      <img src="${destination.image}" height="250px" width="500px" alt="${destination.alt}"/>
      <p>${destination.destination}</p> 
    </div>`
};

function displayPendingTrip(trip) {
  let destination = destinationsRepo.getDestinationById(trip.destinationID)
  pendingTrips.innerHTML += `<div>
  <img src="${destination.image}" height="250px" width="500px" alt="${destination.alt}"/>
  <p>${destination.destination}</p> 
  <p>${trip.duration} days</p> 
  <p>${trip.travelers} person(s)</p> 
  <p>${trip.date}</p>
  <p>${trip.status}</p>
</div>`
};

