class Contest {
    name: string;
    category: string;

    constructor(name: string, category: string) {
        this.name = name;
        this.category = category;
    }

    getInfo() {
        return `${this.name} category ${this.category}`;
    }
}

module.exports = Contest;
