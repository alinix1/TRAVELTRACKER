class Traveler {
    constructor(travel) {
        this.id = travel.id;
        this.name = travel.name;
        this.travelerType = travel.travelerType;
    }
    
    returnFirstName() {
        const firstName = this.name.split(' ');
        return firstName[0];
    }
};

export default Traveler;