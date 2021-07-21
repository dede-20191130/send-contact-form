import { FormModel } from "./FormModel";
import formErrorMessages from "../src/FormErrorMessages";
import NS from "../src/NameSpace";

export class FormController {
    constructor({ formView }) {
        this._formView = formView;
        this._formModel;
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
        NS.modalView.modalModel.serializedData =
            this._formModel.createSerializedData();
        NS.modalView.screen.hidden = !NS.modalView.screen.hidden;
        NS.modalView.screenCover.hidden = !NS.modalView.screenCover.hidden;
        document.body.classList.add("preventScroll");
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
