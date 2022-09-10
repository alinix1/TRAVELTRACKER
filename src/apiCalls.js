const fetchAllData = (url) => {
    return fetch(url)
    .then(data => data.json())
}
const apiCalls = () => {
    return Promise.all([fetchAllData('http://localhost:3001/api/v1/travelers'),
fetchAllData('http://localhost:3001/api/v1/trips'), fetchAllData('http://localhost:3001/api/v1/trips')])
}

export { apiCalls }
