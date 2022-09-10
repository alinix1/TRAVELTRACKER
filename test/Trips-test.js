import { expect } from 'chai';
import Trips from '../src/classes/Trips';
import { tripsSampleData } from '../src/sample-data/trips-data'


describe('Destination', () => {
    let trips;
  
      beforeEach(() => {
        trips = new Trips(tripsSampleData)
  
      });
  
      it('should be a function', () => {
          expect(Trips).to.be.a('function');
      });
  
      it('should be an instance of Destinations', () => {
        expect(trips).to.be.an.instanceof(Trips);
      });

      it.skip('should be able to find a destination via an id', () => {
        expect(destinations.getDestinationById(1)).to.deep.equal(destinationsSampleData[0]);
      });

      it.skip('should have a destination', () => {
        expect(destinations.destinationsSampleData[0].destination).to.be.a('string');
      });
})