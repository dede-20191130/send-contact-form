/**
 * @jest-environment jsdom
 */
import { FormView } from "../src/js/form/FormView";
// import { FormController } from "../src/js/form/FormController";
jest.mock("../src/js/form/FormController");

it('focus-blur event set for next elem of input elem.', () => {
    document.body.innerHTML =
        '<div>' +
        '  <input id="test-class"/><br>' +
        '  <label id="my-label" for="test-class"></label>' +
        '</div>';

    const setInputBoxFocusEvts = FormView.prototype.setInputBoxFocusEvts;

    const inpt = document.getElementById("test-class");
    const testLabel = document.getElementById("my-label");

    setInputBoxFocusEvts(inpt);

    expect(testLabel.classList.contains("active")).toBe(false);

    inpt.dispatchEvent(new Event("focus"));
    expect(testLabel.classList.contains("active")).toBe(true);

    inpt.dispatchEvent(new Event("blur"));
    expect(testLabel.classList.contains("active")).toBe(false);

    inpt.dispatchEvent(new Event("focus"));
    inpt.value = "test-value";
    inpt.dispatchEvent(new Event("blur"));
    expect(testLabel.classList.contains("active")).toBe(true);
});