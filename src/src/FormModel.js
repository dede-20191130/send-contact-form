export class FormModel {
    constructor({ name, gender, age, address, message }) {
        this._name = name;
        this._gender = gender;
        this._age = age;
        this._address = address;
        this._message = message;
        this.isvalid = {
            name: () => {
                let trimed = this._name.trim();
                return (trimed.length > 0) && (trimed.length < 21)
            },
            gender: () => {
                const alloweds = [0, 1, 2];
                return alloweds.includes(this._gender);

            },
            age: () => {
                return Number.isInteger(this._age) && (this._age > -1);

            },
            address: () => {
                let trimed = this._address.trim();
                return trimed.length < 101;

            },
            message: () => {
                let trimed = this._message.trim();
                return (trimed.length > 0) && (trimed.length < 2001)
            },
        };
    }

    createSerializedData() {
        return JSON.stringify({
            name: this._name,
            gender: this._gender,
            age: this._age,
            address: this._address,
            message: this._message,
        })
    }

}