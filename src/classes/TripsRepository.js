import  dayjs from 'dayjs'
dayjs().format();

class TripsRepository {
    constructor(trips) {
        this.trips = trips;
        this.annualTrips = []
    }

    getTripsById(ID) {
        return this.trips.filter(trip => trip.userID === ID);
    }

    getAllCurrentTrips(ID, time) {
        const travelerTrips = this.getTripsById(ID);
         if (time === 'current') {
         return travelerTrips.filter(trip => dayjs(trip.date).isSame(dayjs(), 'day'));
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

    totalCostSingleTrip(trip, destination) {
       const tripCost = (trip.duration * destination.estimatedLodgingCostPerDay) + (trip.travelers * destination.estimatedFlightCostPerPerson);
       const agentFee = 1.1
       let total = tripCost * agentFee
        return total.toFixed(0);
    }

    // total amount spent on trips THIS YEAR aka 2022
    //can filter over the trips and check if it includes the year '2022'
    // return that filter array of dates that meet the condition 
    //if the length of the array is greater than 0 (actual trips in array) 
    // then we can reduce over that filtered array 
    // and invoke the function/method above to add to the acc for the total cost for all trips this year 
    // return acc and initial val set to 0 
    // return total cost multipled by 1.1 (agent 10% fee)
    // may need to add a toFixed(0) to match data passed into the test

    totalCostAnnualTrip(travelerTrips, allDestinations) {
        const tripsYear = travelerTrips.filter(trip => {
            if (trip.date.includes('2022')) {
                return trip.date
            } if (tripsYear.length > 0) {
                const totalCost = tripsYear.reduce((acc, currentTrip) => {
                    const destination = allDestinations.getDestinationById(currentTrip)
                    acc += this.totalCostSingleTrip(trip, destination)
                    return acc
                }, 0)
                return (totalCost * 1.1) + totalCost
            }
        })

    }
}

export default TripsRepository;