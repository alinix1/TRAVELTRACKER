let fetchData = (data) => {
    return fetch(data)

    .then(response => response.json())
    .catch(error => console.log(error))
}

let postData = (url, options) => {
    return fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not retrieve the data')
        }
    return response.json() 
    })
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
    },

    postTravelersData: (data) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        return postData('http://localhost:3001/api/v1/trips', options)
    }
}
  
export { apiCalls }