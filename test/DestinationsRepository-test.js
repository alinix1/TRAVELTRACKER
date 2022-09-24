import { expect } from 'chai';
import DestinationsRepository from '../src/classes/DestinationsRepository.js';
import  destinationsSampleData  from '../src/sample-data/destinationsSampleData.js'

describe('Destination', () => {
    let destinations;
  
      beforeEach(() => {
        destinations = new DestinationsRepository(destinationsSampleData);

      });
  
      it('should be a function', () => {
          expect(DestinationsRepository).to.be.a('function');

      });
  
      it('should be an instance of Destinations', () => {
        expect(destinations).to.be.an.instanceof(DestinationsRepository);

      });

      it('should hold destination info in an array', () => {
        expect(destinations.destinations).to.deep.equal(destinationsSampleData);

       });

      it('should return a destination via an id', () => {
        expect(destinations.getDestinationById(2)).to.deep.equal({
          "id": 2,
          "destination": "Stockholm, Sweden",
          "estimatedLodgingCostPerDay": 100,
          "estimatedFlightCostPerPerson": 780,
          "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
          "alt": "city with boats on the water during the day time"

        });

      });

      it('should return an object', () => {
        expect(destinations.getDestinationById(2)).to.be.a('object');

      });

      it('should return the correct destination via an id', () => {
        expect(destinations.getDestinationById(100000000)).to.equal(undefined)

      });
});