import  dayjs, { Dayjs, isDayjs } from 'dayjs'
dayjs().format();

class TripsRepository {
    constructor(trips) {
        this.trips = trips;
    }

    getTripsById(ID) {
        return this.trips.filter(trip => trip.userID === ID);
    }

    getAllCurrentTrips(ID, time) {
        const travelerTrips = this.getTripsById(ID);
         if (time === 'current') {
            console.log('10000', travelerTrips)
            return travelerTrips.filter(trip => dayjs() > dayjs(trip.date));
        } else {
            return travelerTrips.filter(trip => dayjs() < dayjs(trip.date));
        }
    }
        // current trips is not working 
    
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

     getAllPendingTrips(ID, status) {
        const travelerTrips = this.getTripsById(ID)
        return travelerTrips.filter(trip => trip.status === 'pending')
     }

    // need pending trips

    totalCostSingleTrip(trip, destination) {
       const tripCost = (trip.duration * destination.estimatedLodgingCostPerDay) + (trip.travelers * destination.estimatedFlightCostPerPerson);
       const agentFee = 1.1;
       let total = tripCost * agentFee;
        return total.toFixed(0);
    }


    totalCostAnnualTrip(travelerTrips, allDestinations) {
        let destination;
        let tripsYear = travelerTrips.filter(trip => trip.date.includes('2022'))
        if (tripsYear.length > 0) {
                let totalCost = tripsYear.reduce((acc, currentTrip) => {
                    allDestinations.destinations.forEach(destination => {
                        if (destination.id === currentTrip.destinationID){
                            destination = allDestinations.getDestinationById(currentTrip.destinationID)

                            acc += ((currentTrip.duration * destination.estimatedLodgingCostPerDay) + (currentTrip.travelers * destination.estimatedFlightCostPerPerson));
                        }
                    })
                    return acc;
                }, 0)
                return (totalCost * 1.1).toFixed(0);
            }

    }
}

export default TripsRepository;