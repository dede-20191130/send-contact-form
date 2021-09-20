import { FormModel } from "./FormModel";
import formErrorMessages from "./FormErrorMessages";

export class FormController {
    _formModel: any;
    _formView: any;
    _modalScreen: any;
    constructor({
        formView,
        modalScreen
    }: any) {
        this._formView = formView;
        this._formModel;
        this._modalScreen = modalScreen;
    }
    onSubmit({
        name,
        gender,
        age,
        address,
        message
    }: any) {
        this._formView.errArea.innerHTML = "";

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
            this._formView.errArea.scrollIntoView(false);
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
    setError(errFounds: any) {
        this._formView.errArea.innerHTML = errFounds.reduce((acc: any, curr: any) => {

            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            return acc + formErrorMessages[curr] + "<br>";
        }, "");
    }
}
