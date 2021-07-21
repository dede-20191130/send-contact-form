import { afterEach, expect } from "@jest/globals";
import { FormModel } from "../src/FormModel"

let formModel;

afterEach(() => {
    formModel = null;
})

it('is valid name', () => {//1 ~ 20文字 空欄（スペース除去）不可
    formModel = new FormModel({ name: "demoname" });
    expect(formModel.isvalid["name"]()).toBeTruthy;
    formModel = new FormModel({ name: "AAAAAAAAAAAAAAAAAAAAA" });
    expect(formModel.isvalid["name"]()).toBeFalsy;
    formModel = new FormModel({ name: "       " });
    expect(formModel.isvalid["name"]()).toBeFalsy;
});
it('is valid gender', () => {// in [0,1,2]
    formModel = new FormModel({ gender: 0 });
    expect(formModel.isvalid["gender"]()).toBeTruthy;
    formModel = new FormModel({ gender: 2 });
    expect(formModel.isvalid["gender"]()).toBeTruthy;
    formModel = new FormModel({ gender: 3 });
    expect(formModel.isvalid["gender"]()).toBeFalsy;

});
it('is valid age', () => {//整数値 0より小さい値は不可
    formModel = new FormModel({ age: 30 });
    expect(formModel.isvalid["age"]()).toBeTruthy;
    formModel = new FormModel({ age: 0 });
    expect(formModel.isvalid["age"]()).toBeTruthy;
    formModel = new FormModel({ age: 20.5 });
    expect(formModel.isvalid["age"]()).toBeFalsy;
    formModel = new FormModel({ age: -1 });
    expect(formModel.isvalid["age"]()).toBeFalsy;

});
it('is valid address', () => {// 任意入力　100文字以内
    formModel = new FormModel({ address: "example県example市demo番地 exampleビル100号室" });
    expect(formModel.isvalid["address"]()).toBeTruthy;
    formModel = new FormModel({ address: "" });
    expect(formModel.isvalid["address"]()).toBeTruthy;
    formModel = new FormModel({ address: "A".repeat(101) });
    expect(formModel.isvalid["address"]()).toBeFalsy;

});
it('is valid message', () => {//1 ~ 2000文字 空欄不可
    formModel = new FormModel({ message: "this is a test message.これはテストメッセージです。" });
    expect(formModel.isvalid["message"]()).toBeTruthy;
    formModel = new FormModel({ message: " ".repeat(10) });
    expect(formModel.isvalid["message"]()).toBeFalsy;
    formModel = new FormModel({ message: "A".repeat(2001) });
    expect(formModel.isvalid["message"]()).toBeFalsy;

});
it('serialized string can be reverted to original Object', () => {
    let input = {
        name: "example太郎",
        gender: 1,
        age: 25,
        address: "example県　田中市佐藤町",
        message: "this is a test message.これはテストメッセージです。",
    };
    formModel = new FormModel(input);

    expect(JSON.parse(formModel.createSerializedData())).toEqual(input);;
});
