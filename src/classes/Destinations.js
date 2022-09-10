class Destinations {
    constructor(destinationData) {
        this.destinations = destinationData;

    }
    getDestinationById(ID) {
        return this.destinations.find(destination => destination.id === ID)
    }
}

export default Destinations;