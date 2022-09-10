import { expect } from 'chai';
import Destinations from '../src/classes/Destinations';
import { destinationsSampleData } from '../src/sample-data/destinations-data'


describe('Destination', () => {
    let destinations;
  
      beforeEach(() => {
        destinations = new Destinations(destinationsSampleData)
  
      });
  
      it('should be a function', () => {
          expect(Destinations).to.be.a('function');
      });
  
      it('should be an instance of Destinations', () => {
        expect(destinations).to.be.an.instanceof(Destinations);
      });

      it.skip('should be able to find a destination via an id', () => {
        expect(destinations.getDestinationById(1)).to.deep.equal(destinationsSampleData[0]);
      });

      it.skip('should have a destination', () => {
        expect(destinations.destinationsSampleData[0].destination).to.be.a('string');
      });
})