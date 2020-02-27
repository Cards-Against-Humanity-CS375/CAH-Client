const uniqid = require('uniqid');

class BlackCard {
    constructor(prompt) {
        this.id = uniqid()
        this.prompt = prompt
    }
}

export default BlackCard