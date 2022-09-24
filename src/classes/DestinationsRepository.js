class DestinationsRepository {
    constructor(destinationData) {
        this.destinations = destinationData;
        
    } 
    getDestinationById(tripID) {
        return this.destinations.find(destination => destination.id === tripID);
    }
}

export default DestinationsRepository;