import { expect } from 'chai';
import TripsRepository from '../src/classes/TripsRepository.js';
import DestinationsRepository from '../src/classes/DestinationsRepository.js';
import tripsSampleData from '../src/sample-data/tripsSampleData.js';
import destinationsSampleData from '../src/sample-data/destinationsSampleData.js';

describe('Trips', () => {
  let trips, destinations;
  
  beforeEach(() => {
      trips = new TripsRepository(tripsSampleData);
      destinations = new DestinationsRepository(destinationsSampleData);
  });

  it('should be a function', () => {
      expect(TripsRepository).to.be.a('function');

  });

  it('should be an instance of TripsRepository', () => {
      expect(trips).to.be.an.instanceof(TripsRepository);

  });

  it('should hold any array of trips', () => {
    expect(trips.trips).to.equal(tripsSampleData);

  });

  it ('should return a user\'s trip info via userID', () => {
    expect(trips.getTripsById(3)).to.deep.equal([tripsSampleData[6], tripsSampleData[7], tripsSampleData[8]]);

  });
  
  it('should return an empty array if userID is not valid', () => {
    expect(trips.getTripsById(1000000000)).to.deep.equal([]);

  });

  it('should calculate and return total cost per trip plus 10% fee', () => {
    expect(trips.totalCostSingleTrip(trips.trips[0], destinations.destinations[0])).to.equal('1056');
    expect(trips.totalCostSingleTrip(trips.trips[1], destinations.destinations[2])).to.equal('2948');

  });

  it('should calculate and return total cost of trips annually', () => {
    expect(trips.totalCostAnnualTrip(tripsSampleData, destinations)).to.equal('10401')

  });

  it('should be able to return a traveler\'s past trips', () => {
    expect(trips.getAllPastTrips(2, 'past')).to.deep.equal([tripsSampleData[3], tripsSampleData[4], tripsSampleData[5]]);
    
  });

  it('should be able to return a traveler\'s future trips', () => {
    expect(trips.getAllFutureTrips(3, 'future')).to.deep.equal([tripsSampleData[6], tripsSampleData[7], tripsSampleData[8]]);

  });

  it.skip('should be able to return a traveler\'s trip status', () => {
    expect(trips.getAllPendingTrips()).to.equal('pending');
    expect(trips.getAllPendingTrips()).to.equal('approved');
  })

  it.skip('should be able to return a traveler\'s current trips', () => {
    expect(trips.getAllCurrentTrips(1, 'current')).to.deep.equal([tripsSampleData[2], tripsSampleData[0]]);

  });

});

