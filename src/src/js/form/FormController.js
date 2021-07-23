import { FormModel } from "./FormModel";
import formErrorMessages from "./FormErrorMessages";

export class FormController {
    constructor({ formView, modalScreen }) {
        this._formView = formView;
        this._formModel;
        this._modalScreen = modalScreen;
    }
    onSubmit({ name, gender, age, address, message }) {
        this._formModel = new FormModel({
            name: name,
            gender: gender,
            age: age,
            address: address,
            message: message,
        });
        let errFounds = this.isvalid();
        if (errFounds) {
            this.setError(errFounds);
            return;
        }

        this._modalScreen.dispatchEvent(
            new CustomEvent("show", {
                detail: {
                    serializedData: this._formModel.createSerializedData(),
                },
            })
        );
    }
    isvalid() {
        let errFounds = [];
        for (const prop of ["name", "gender", "age", "address", "message"]) {
            if (!this._formModel.isvalid[prop]()) errFounds.push(prop);
        }
        return errFounds.length === 0 ? null : errFounds;
    }
    setError(errFounds) {
        this._formView.errArea.innerHTML = errFounds.reduce((acc, curr) => {
            return acc + formErrorMessages[curr] + "<br>";
        }, "");
    }
}
