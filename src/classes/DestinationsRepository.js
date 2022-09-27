class DestinationsRepository {
    constructor(destinationData) {
        this.destinations = destinationData;  
    } 
    getDestinationById(tripID) {
        return this.destinations.find(destination => destination.id === tripID);
    }
    getAllDestinations() {
        return this.destinations;
    }
    getDestinationByName(name) {
        return this.destinations.find(destination => destination.destination === name);
    }
};

export default DestinationsRepository;