// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../src/js/form/FormController'... Remove this comment to see the full error message
import { FormController } from "../src/js/form/FormController";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../src/js/form/FormModel' or i... Remove this comment to see the full error message
import { FormModel } from "../src/js/form/FormModel";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../src/js/form/FormErrorMessag... Remove this comment to see the full error message
import formErrorMessages from "../src/js/form/FormErrorMessages";

let formController;

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
it('isvalid method should scan all props', () => {
    formController = new FormController({});
    formController._formModel = new FormModel({});
    formController._formModel.isvalid = {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
        name: jest.fn(),
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
        gender: jest.fn(),
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
        age: jest.fn(),
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
        address: jest.fn(),
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
        message: jest.fn(),
    }
    for (const prop of ["name", "gender", "age", "address", "message"]) {
        formController._formModel.isvalid[prop].mockReturnValueOnce(true).mockReturnValueOnce(false);
    }
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(formController.isvalid()).toBeNull();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(formController.isvalid()).toEqual(["name", "gender", "age", "address", "message"]);
    for (const prop of ["name", "gender", "age", "address", "message"]) {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(formController._formModel.isvalid[prop]).toHaveBeenCalledTimes(2);
    }


});
// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
it('set error showing area.', () => {
    let fv = {
        errArea: {
            textContent: ""
        }
    };
    formController = new FormController({ formView: fv });

    formController.setError(["name"]);
    let expected = formErrorMessages["name"] + "<br>"
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect((fv.errArea as any).innerHTML).toBe(expected);

    formController.setError(["name", "gender", "age", "address", "message"]);
    expected = formErrorMessages["name"] + "<br>" +
        formErrorMessages["gender"] + "<br>" +
        formErrorMessages["age"] + "<br>" +
        formErrorMessages["address"] + "<br>" +
        formErrorMessages["message"] + "<br>"
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect((fv.errArea as any).innerHTML).toBe(expected);

});