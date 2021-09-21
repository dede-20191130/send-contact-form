import { FormController } from "../ts/form/FormController";
import { FormModel } from "../ts/form/FormModel";
import formErrorMessages from "../ts/form/FormErrorMessages";
import { FormView } from "../ts/form/FormView";
import { mocked } from 'ts-jest/utils';

let formController;

it('isvalid method should scan all props', () => {
    let formView: FormView = null as unknown as FormView;
    let modalScreen: HTMLDivElement = null as unknown as HTMLDivElement;

    formController = new FormController({ formView, modalScreen });
    formController["_formModel"] = new FormModel({ name: "", address: "", age: "", gender: "", message: "" });
    const mockedisvalid = mocked(formController["_formModel"].isvalid, true)
    mockedisvalid.name = jest.fn();
    mockedisvalid.gender = jest.fn();
    mockedisvalid.age = jest.fn();
    mockedisvalid.address = jest.fn();
    mockedisvalid.message = jest.fn();
    for (const prop of ["name", "gender", "age", "address", "message"]) {
        mockedisvalid[prop].mockReturnValueOnce(true).mockReturnValueOnce(false);
    }
    expect(formController["isvalid"]()).toBeNull();
    expect(formController["isvalid"]()).toEqual(["name", "gender", "age", "address", "message"]);
    for (const prop of ["name", "gender", "age", "address", "message"]) {
        expect(formController["_formModel"].isvalid[prop]).toHaveBeenCalledTimes(2);
    }


});
it('set error showing area.', () => {
    let fv = {
        errArea: {
            textContent: ""
        }
    } as FormView;
    let modalScreen: HTMLDivElement = null as unknown as HTMLDivElement;

    formController = new FormController({ formView: fv, modalScreen });

    formController["setError"](["name"]);
    let expected = formErrorMessages["name"] + "<br>"
    expect(fv.errArea.innerHTML).toBe(expected);

    formController["setError"](["name", "gender", "age", "address", "message"]);
    expected = formErrorMessages["name"] + "<br>" +
        formErrorMessages["gender"] + "<br>" +
        formErrorMessages["age"] + "<br>" +
        formErrorMessages["address"] + "<br>" +
        formErrorMessages["message"] + "<br>"
    expect(fv.errArea.innerHTML).toBe(expected);

});