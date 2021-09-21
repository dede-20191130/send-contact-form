export interface IFormModelArg {
    name: string;
    gender: string;
    age: string;
    address: string;
    message: string;
};

export class FormModel {
    private address!: string;
    private age!: string;
    private gender!: string;
    private message!: string;
    private name!: string;
    public isvalid: { [method: string]: () => boolean };
    constructor(formData: IFormModelArg) {
        Object.assign(this, formData);
        this.isvalid = {
            name: this.isValidName.bind(this),
            gender: this.isValidGender.bind(this),
            age: this.isValidAge.bind(this),
            address: this.isValidAddress.bind(this),
            message: this.isValidMessage.bind(this),
        };
    }
    private isValidName(): boolean {
        let trimed = this.name.trim();
        return trimed.length > 0 && trimed.length < 21;

    }
    private isValidGender(): boolean {
        const alloweds = [0, 1, 2];
        return alloweds.includes(Number(this.gender));

    }
    private isValidAge(): boolean {
        if (!this.age.trim().length) return false;
        const age = Number(this.age);
        return Number.isInteger(age) && Number(age) > -1;

    }
    private isValidAddress(): boolean {
        let trimed = this.address.trim();
        return trimed.length < 101;

    }
    private isValidMessage(): boolean {
        let trimed = this.message.trim();
        return trimed.length > 0 && trimed.length < 2001;

    }

    public createSerializedData(): string {
        return JSON.stringify({
            name: this.name,
            gender: this.gender,
            age: this.age,
            address: this.address,
            message: this.message,
        });
    }
}
