export class User {
    name: string;
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    getDetails(): string {
        return `${this.name} (${this.email})`;
    }
}