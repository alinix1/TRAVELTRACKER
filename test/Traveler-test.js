import { expect } from 'chai';
import Traveler from '../src/classes/Traveler.js';
import travelersSampleData from '../src/sample-data/travelersSampleData.js';

describe('Traveler', () => {
    let traveler1, traveler2, traveler3;

    beforeEach(() => {
        traveler1 = new Traveler(travelersSampleData[0]);
        traveler2 = new Traveler(travelersSampleData[1]);
        traveler3 = new Traveler(travelersSampleData[2]);
    });

    it('should be a function', () => {
        expect(Traveler).to.be.a('function');
    });

    it('should be an instance of Traveler', () => {
        expect(traveler1).to.be.an.instanceof(Traveler);
        expect(traveler2).to.be.an.instanceof(Traveler);
        expect(traveler3).to.be.an.instanceof(Traveler);
    });

    it('should have an id', () => {
        expect(traveler1.id).to.be.a('number');
        expect(traveler2.id).to.be.a('number');
        expect(traveler3.id).to.be.a('number');

        expect(traveler1.id).to.equal(1);
        expect(traveler2.id).to.equal(2);
        expect(traveler3.id).to.equal(3);
    });

    it('should be the correct id', () => {
        expect(traveler1.id).to.not.equal(2);
        expect(traveler2.id).to.not.equal(13);
        expect(traveler3.id).to.not.equal(1);
    });

    it('should have a name', () => {
        expect(traveler1.name).to.be.a('string');
        expect(traveler2.name).to.be.a('string');
        expect(traveler3.name).to.be.a('string');

        expect(traveler1.name).to.equal("Ham Leadbeater");
        expect(traveler2.name).to.equal("Rachael Vaughten");
        expect(traveler3.name).to.equal("Sibby Dawidowitsch");
    });

    it('should be the correct name', () => {
        expect(traveler1.name).to.not.equal("Rachael Vaughten");
        expect(traveler2.name).to.not.equal("Ham Leadbeater");
        expect(traveler3.name).to.not.equal("Leila Thebeaud");
    });

    it('should have a preferred type of travel', () => {
        expect(traveler1.travelerType).to.be.a('string');
        expect(traveler2.travelerType).to.be.a('string');
        expect(traveler3.travelerType).to.be.a('string');

        expect(traveler1.travelerType).to.equal("relaxer");
        expect(traveler2.travelerType).to.equal("thrill-seeker");
        expect(traveler3.travelerType).to.equal("shopper");
    });

    it('should be the correct preferred type of travel', () => {
        expect(traveler1.travelerType).to.not.equal("foodie");
        expect(traveler2.travelerType).to.not.equal("shopper");
        expect(traveler3.travelerType).to.not.equal("photographer");
    });

    it('should return a traveler\'s first name', () => {
        expect(traveler1.returnFirstName()).to.equal('Ham');
        expect(traveler2.returnFirstName()).to.equal('Rachael');
        expect(traveler3.returnFirstName()).to.equal('Sibby');
    });

    it('should return the correct traveler\'s first name', () => {
        expect(traveler1.returnFirstName()).to.not.equal('Sibby');
        expect(traveler2.returnFirstName()).to.not.equal('Rachael Vaughten');
        expect(traveler3.returnFirstName()).to.not.equal('');
    });

});