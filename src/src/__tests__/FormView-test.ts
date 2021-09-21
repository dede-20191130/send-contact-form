/**
 * @jest-environment jsdom
 */
import { FormView } from "../ts/form/FormView";
// import { FormController } from "../src/js/form/FormController";
jest.mock("../ts/form/FormController");

it('focus-blur event set for next elem of input elem.', () => {
    document.body.innerHTML =
        '<div>' +
        '  <input id="test-class"/><br>' +
        '  <label id="my-label" for="test-class"></label>' +
        '</div>';

    const setInputBoxFocusEvts = FormView.prototype["setInputBoxFocusEvts"];

    const inpt = document.getElementById("test-class") as HTMLInputElement;
    const testLabel = document.getElementById("my-label") as HTMLLabelElement;

    setInputBoxFocusEvts(inpt);

    expect(testLabel.classList.contains("active")).toBe(false);

    inpt.dispatchEvent(new Event("focus"));
    expect(testLabel.classList.contains("active")).toBe(true);

    inpt.dispatchEvent(new Event("blur"));
    expect(testLabel.classList.contains("active")).toBe(false);

    inpt.dispatchEvent(new Event("focus"));
    (inpt as any).value = "test-value";
    inpt.dispatchEvent(new Event("blur"));
    expect(testLabel.classList.contains("active")).toBe(true);
});