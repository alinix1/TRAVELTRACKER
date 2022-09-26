import  dayjs from 'dayjs'
dayjs().format();

class TripsRepository {
    constructor(trips) {
        this.trips = trips;
    }

    getTripsById(ID) {
        return this.trips.filter(trip => trip.userID === ID);
    }    
    
    getAllPastTrips(ID, time) {
        const travelerTrips = this.getTripsById(ID);
        if (time === 'past') {
            return travelerTrips.filter(trip => dayjs(trip.date).isBefore(dayjs()));
        }
     }

     getAllFutureTrips(ID, time) {
        const travelerTrips = this.getTripsById(ID);
        if (time === 'future') {
            return travelerTrips.filter(trip => dayjs(trip.date).isAfter(dayjs()));
        }
     }

     getAllPendingTrips(ID) {
        const travelerTrips = this.getTripsById(ID)
        const result = travelerTrips.filter(trip => trip.status === 'pending')
        return result
     }

    totalCostSingleTrip(trip, destination) {
       const tripCost = (trip.duration * destination.estimatedLodgingCostPerDay) + (trip.travelers * destination.estimatedFlightCostPerPerson);
       const agentFee = 1.1;
       let total = tripCost * agentFee;
        return total.toFixed(0);
    }

    totalCostAnnualTrip(travelerTrips, destinationRepository, ID) {
        let tripsYear = travelerTrips.filter(trip => trip.date.includes('2022') && trip.userID === ID)
        if (tripsYear.length > 0) {
            let totalCost = tripsYear.reduce((acc, currentTrip) => {
                let destination = destinationRepository.getDestinationById(currentTrip.destinationID)
                acc += ((currentTrip.duration * destination.estimatedLodgingCostPerDay) + (currentTrip.travelers * destination.estimatedFlightCostPerPerson));
                return acc;
            }, 0)
            return (totalCost * 1.1).toFixed(0);
        }
        return 0
    }
}

export default TripsRepository;