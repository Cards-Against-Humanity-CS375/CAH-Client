const uniqid = require('uniqid');

class WhiteCard {
    constructor(response) {
        this.id = uniqid()
        this.response = response
    }
}

export default WhiteCard