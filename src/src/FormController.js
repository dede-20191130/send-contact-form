import { FormModel } from "./FormModel";
import formErrorMessages from "../src/FormErrorMessages";
import NS from "../src/NameSpace";

export class FormController {
    constructor({ formView, name, gender, age, address, message }) {
        this._formView = formView;
        this._formModel = new FormModel({
            name: name,
            gender: gender,
            age: age,
            address: address,
            message: message,
        });
    }
    onSubmit() {
        let errFounds = this.isvalid();
        if (errFounds) {
            this.setError(errFounds);
            return;
        }
        NS.modalView.serializedData = this._formModel.createSerializedData();
        //todo NS.modalView.screen hidden change

    }
    isvalid() {
        let errFounds = [];
        for (const prop of ["name", "gender", "age", "address", "message"]) {
            if (!this._formModel.isvalid[prop]()) errFounds.push(prop);
        }
        return errFounds.length === 0 ? null : errFounds;
    }
    setError(errFounds) {
        this._formView.errArea.textContent = errFounds.reduce((acc, curr) => {
            return acc + formErrorMessages[curr] + "\n";
        }, "")
    }
}