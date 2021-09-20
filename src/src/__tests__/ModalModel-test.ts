// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../src/js/modal/ModalModel' or... Remove this comment to see the full error message
import { ModalModel } from "../src/js/modal/ModalModel";

class BlobMock {
    content: any;
    options: any;
    constructor(content: any, options: any) {
        this.content = content;
        this.options = options;
    }
}

let modalModel;
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
Date.now = jest.fn(() => 1626706800000);
// global.URL.createObjectURL = jest.fn(blob => {
//     return JSON.stringify({
//         size: blob.size,
//         type: blob.type,
//     });
// });
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
global.URL.createObjectURL = jest.fn((blob: any) => "return createObjectURL");
// @ts-expect-error ts-migrate(2322) FIXME: Type 'typeof BlobMock' is not assignable to type '... Remove this comment to see the full error message
global.Blob = BlobMock;



// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
it('create text from deserialized data obj.', () => {
    modalModel = new ModalModel();
    const input = {
        name: "example 太郎",
        gender: 1,
        age: 25,
        address: "example県　田中市佐藤町",
        message: "this is a test message.これはテストメッセージです。",
    };
    modalModel.serializedData = JSON.stringify(input);
    const text = modalModel.createText();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(text.startsWith("※ご意見フォーム送信フェイク※")).toBe(true);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(text.includes("【氏名】" + input.name)).toBe(true);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(text.includes("【性別】男性")).toBe(true);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(text.includes("【年齢】" + input.age + "歳")).toBe(true);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(text.includes("【住所】" + input.address)).toBe(true);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(text.includes("【ご意見内容】\n" + input.message)).toBe(true);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(text.includes("受理日時：2021年07月20日")).toBe(true);

});
// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
it('create text blob and return object-url', () => {

    const input = "A".repeat(77);

    modalModel = new ModalModel();
    const blobURLMock = modalModel.createTextBlob(input);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(global.URL.createObjectURL).toBeCalledWith({
        content: ["A".repeat(77)],
        options: { type: 'text/plain' },
    });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(blobURLMock).toBe("return createObjectURL");
});
