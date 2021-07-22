import { FormController } from "../src/js/form/FormController";
import { FormModel } from "../src/js/form/FormModel";
import formErrorMessages from "../src/js/form/FormErrorMessages";

let formController;

it('isvalid method should scan all props', () => {
    formController = new FormController({});
    formController._formModel = new FormModel({});
    formController._formModel.isvalid = {
        name: jest.fn(),
        gender: jest.fn(),
        age: jest.fn(),
        address: jest.fn(),
        message: jest.fn(),
    }
    for (const prop of ["name", "gender", "age", "address", "message"]) {
        formController._formModel.isvalid[prop].mockReturnValueOnce(true).mockReturnValueOnce(false);
    }
    expect(formController.isvalid()).toBeNull();
    expect(formController.isvalid()).toEqual(["name", "gender", "age", "address", "message"]);
    for (const prop of ["name", "gender", "age", "address", "message"]) {
        expect(formController._formModel.isvalid[prop]).toHaveBeenCalledTimes(2);
    }


});
it('set error showing area.', () => {
    let fv = {
        errArea: {
            textContent: ""
        }
    };
    formController = new FormController({ formView: fv });

    formController.setError(["name"]);
    let expected = formErrorMessages["name"] + "<br>"
    expect(fv.errArea.innerHTML).toBe(expected);

    formController.setError(["name", "gender", "age", "address", "message"]);
    expected = formErrorMessages["name"] + "<br>" +
        formErrorMessages["gender"] + "<br>" +
        formErrorMessages["age"] + "<br>" +
        formErrorMessages["address"] + "<br>" +
        formErrorMessages["message"] + "<br>"
    expect(fv.errArea.innerHTML).toBe(expected);

});