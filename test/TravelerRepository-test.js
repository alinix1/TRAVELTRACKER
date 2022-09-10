import { expect } from 'chai';
import TravelerRepository from '../src/classes/TravelerRepository';
import Traveler from '../src/classes/Traveler';
import  { travelersSampleData }  from '../src/sample-data/travelersSampleData';
// remember 'sad paths' for methods

describe('Traveler Repository', () => {
    let travelerRepository, traveler1, traveler2, traveler3;

    beforeEach(() => {
        traveler1 = new Traveler(travelersSampleData[0]);
        traveler2 = new Traveler(travelersSampleData[1]);
        traveler3 = new Traveler(travelersSampleData[2]);
        travelerRepository = new TravelerRepository(travelersSampleData);
        travelerRepository.travelers.push(traveler1, traveler2, traveler3);
    });

    it('should be a function', () => {
        expect(TravelerRepository).to.be.a('function');
    });

    it('should be an instance of TravelerRepository', () => {
        expect(travelerRepository).to.be.an.instanceof(TravelerRepository);
    });

    it('should hold traveler data in an array', () => {
        expect(travelerRepository.travelers).to.deep.equal(travelersSampleData);
    });

    it('should be able to find a traveler via an id', () => {
        expect(travelerRepository.getTravelerInfoById(1)).to.deep.equal(travelersSampleData[0]);
    });
})


