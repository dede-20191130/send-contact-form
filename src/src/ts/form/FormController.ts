import { FormModel, IFormModelArg } from "./FormModel";
import formErrorMessages from "./FormErrorMessages";
import { FormView } from "./FormView";

interface IFormControllerArg {
    formView: FormView;
    modalScreen: HTMLDivElement;
};

export class FormController {
    private _formModel: FormModel | undefined;
    private _formView: FormView;
    private _modalScreen: HTMLDivElement;
    constructor({
        formView,
        modalScreen
    }: IFormControllerArg) {
        this._formView = formView;
        this._formModel;
        this._modalScreen = modalScreen;
    }
    public onSubmit({
        name,
        gender,
        age,
        address,
        message
    }: IFormModelArg): void {
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
    private isvalid() {
        let errFounds = [];
        for (const prop of ["name", "gender", "age", "address", "message"]) {
            if (this._formModel && !this._formModel.isvalid[prop]()) errFounds.push(prop);
        }
        return errFounds.length === 0 ? null : errFounds;
    }
    private setError(errFounds: string[]) {
        this._formView.errArea.innerHTML = errFounds.reduce((acc, curr) => {

            return acc + formErrorMessages[curr] + "<br>";
        }, "");
    }
}
