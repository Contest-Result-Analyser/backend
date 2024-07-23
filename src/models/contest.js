class Contest {
    constructor(name, category) {
        this.name = name;
        this.category = category;
    }

    getInfo() {
        return `${this.name} category ${this.category}`;
    }
}

module.exports = Contest;
