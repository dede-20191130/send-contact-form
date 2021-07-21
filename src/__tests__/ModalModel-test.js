import { ModalModel } from "../src/ModalModel";

class BlobMock {
    constructor(content, options) {
        this.content = content;
        this.options = options;
    }
}

let modalModel;
Date.now = jest.fn(() => 1626706800000);
// global.URL.createObjectURL = jest.fn(blob => {
//     return JSON.stringify({
//         size: blob.size,
//         type: blob.type,
//     });
// });
global.URL.createObjectURL = jest.fn(blob => "return createObjectURL");
global.Blob = BlobMock;



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
    expect(text.startsWith("※ご意見フォーム送信フェイク※")).toBeTruthy();
    expect(text.includes("【氏名】" + input.name)).toBeTruthy();
    expect(text.includes("【性別】男性")).toBeTruthy();
    expect(text.includes("【年齢】" + input.age + "歳")).toBeTruthy();
    expect(text.includes("【住所】" + input.address)).toBeTruthy();
    expect(text.includes("【ご意見内容】\n" + input.message)).toBeTruthy();
    expect(text.includes("受理日時：2021年07月20日")).toBeTruthy();

});
it('create text blob and return object-url', () => {

    const input = "A".repeat(77);

    modalModel = new ModalModel();
    const blobURLMock = modalModel.createTextBlob(input);
    expect(global.URL.createObjectURL).toBeCalledWith({
        content: ["A".repeat(77)],
        options: { type: 'text/plain' },
    });
    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(blobURLMock).toBe("return createObjectURL");
});
