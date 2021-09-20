/**
 * @jest-environment jsdom
 */
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../src/js/form/FormView' or it... Remove this comment to see the full error message
import { FormView } from "../src/js/form/FormView";
// import { FormController } from "../src/js/form/FormController";
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
jest.mock("../src/js/form/FormController");

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(testLabel.classList.contains("active")).toBe(false);

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    inpt.dispatchEvent(new Event("focus"));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(testLabel.classList.contains("active")).toBe(true);

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    inpt.dispatchEvent(new Event("blur"));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(testLabel.classList.contains("active")).toBe(false);

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    inpt.dispatchEvent(new Event("focus"));
    (inpt as any).value = "test-value";
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    inpt.dispatchEvent(new Event("blur"));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(testLabel.classList.contains("active")).toBe(true);
});