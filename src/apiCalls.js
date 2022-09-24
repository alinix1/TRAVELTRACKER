let fetchData = (data) => {
    return fetch(data)
    .then(response => response.json())
    .catch(error => console.log(error))
}

const apiCalls = {
    getTravelersData: () => {
        return fetchData('http://localhost:3001/api/v1/travelers')
    }, 
    getTripsData: () => {
        return fetchData('http://localhost:3001/api/v1/trips')
    },
    getDestinationsData: () => {
        return fetchData('http://localhost:3001/api/v1/destinations')
    }
}

export { apiCalls }