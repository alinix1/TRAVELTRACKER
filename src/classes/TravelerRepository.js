class TravelerRepository {
    constructor(travelData) {
        this.travelers = travelData;
    }
    getTravelerInfoById(ID) {
        return this.travelers.find(traveler => traveler.id === ID);
    }
};

export default TravelerRepository;