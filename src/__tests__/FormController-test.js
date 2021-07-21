import { FormController } from "../src/FormController";
import formErrorMessages from "../src/FormErrorMessages";

let formController;

it('isvalid method should scan all props', () => {
    formController = new FormController({});
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
    let expected = formErrorMessages["name"] + "\n"
    expect(fv.errArea.textContent).toBe(expected);

    formController.setError(["name", "gender", "age", "address", "message"]);
    expected = formErrorMessages["name"] + "\n" +
        formErrorMessages["gender"] + "\n" +
        formErrorMessages["age"] + "\n" +
        formErrorMessages["address"] + "\n" +
        formErrorMessages["message"] + "\n"
    expect(fv.errArea.textContent).toBe(expected);

});