import { afterEach, expect } from "@jest/globals";
import { FormModel, IFormModelArg } from "../ts/form/FormModel";

let formModel: FormModel | null;
let args: IFormModelArg;

beforeEach(() => {
    args = {
        name: "",
        address: "",
        age: "",
        gender: "",
        message: "",
    }

});

afterEach(() => {
    formModel = null;
});

it("is valid name", () => {
    //1 ~ 20文字 空欄（スペース除去）不可
    args.name = "demoname";
    formModel = new FormModel(args);
    expect(formModel.isvalid["name"]()).toBe(true);
    args.name = "AAAAAAAAAAAAAAAAAAAAA"
    formModel = new FormModel(args);
    expect(formModel.isvalid["name"]()).toBe(false);
    args.name = "       "
    formModel = new FormModel(args);
    expect(formModel.isvalid["name"]()).toBe(false);
});
it("is valid gender", () => {
    // in [0,1,2]
    args.gender = "0"
    formModel = new FormModel(args);
    expect(formModel.isvalid["gender"]()).toBe(true);
    args.gender = "2"
    formModel = new FormModel(args);
    expect(formModel.isvalid["gender"]()).toBe(true);
    args.gender = "3"
    formModel = new FormModel(args);
    expect(formModel.isvalid["gender"]()).toBe(false);
});
it("is valid age", () => {
    //整数値 0より小さい値は不可
    args.age = "30"
    formModel = new FormModel(args);
    expect(formModel.isvalid["age"]()).toBe(true);
    args.age = "0"
    formModel = new FormModel(args);
    expect(formModel.isvalid["age"]()).toBe(true);
    args.age = "20.5"
    formModel = new FormModel(args);
    expect(formModel.isvalid["age"]()).toBe(false);
    args.age = "-1"
    formModel = new FormModel(args);
    expect(formModel.isvalid["age"]()).toBe(false);
    args.age = ""
    formModel = new FormModel(args);
    expect(formModel.isvalid["age"]()).toBe(false);
    args.age = " ".repeat(5)
    formModel = new FormModel(args);
    expect(formModel.isvalid["age"]()).toBe(false);
});
it("is valid address", () => {
    // 任意入力　100文字以内
    args.address = "example県example市demo番地 exampleビル100号室"
    formModel = new FormModel(args);
    expect(formModel.isvalid["address"]()).toBe(true);
    args.address = ""
    formModel = new FormModel(args);
    expect(formModel.isvalid["address"]()).toBe(true);
    args.address = "A".repeat(101)
    formModel = new FormModel(args);
    expect(formModel.isvalid["address"]()).toBe(false);
});
it("is valid message", () => {
    //1 ~ 2000文字 空欄不可
    args.message = "this is a test message.これはテストメッセージです。";
    formModel = new FormModel(args);
    expect(formModel.isvalid["message"]()).toBe(true);
    args.message = " ".repeat(10);
    formModel = new FormModel(args);
    expect(formModel.isvalid["message"]()).toBe(false);
    args.message = "A".repeat(2001);
    formModel = new FormModel(args);
    expect(formModel.isvalid["message"]()).toBe(false);
});
it("serialized string can be reverted to original Object", () => {
    args = {
        name: "example太郎",
        gender: "1",
        age: "25",
        address: "example県　田中市佐藤町",
        message: "this is a test message.これはテストメッセージです。",
    };
    formModel = new FormModel(args);

    expect(JSON.parse(formModel.createSerializedData())).toEqual(args);
});
