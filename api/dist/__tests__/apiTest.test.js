"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = require("supertest");
const app = require('../app');
// import { deleteFile } from './helper'
// beforeEach(async () => {
//   deleteFile()
// })
const sampleDataInput = {
    "account": "7741566054",
    "balance": 7000,
    "createdAt": "2022-04-04T20:06:21.756Z"
};
const sampleDataInput2 = {
    "account": "5987454698",
    "balance": 7000,
    "createdAt": "2022-04-04T20:06:21.756Z"
};
const transferSample = {
    "from": "5987454698",
    "to": "7741566054",
    "amount": 1000
};
describe('GET API TESTS', () => {
    test('check if balances.json file contains data', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app).post('/create-account').send(sampleDataInput);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({ balance: 7000 })]));
    }));
    test("GET /balances/:accountNumber", () => __awaiter(void 0, void 0, void 0, function* () {
        const postReq = yield request(app).post('/create-account').send(sampleDataInput);
        const getReq = yield request(app).get("/balance/" + postReq.body[0].account);
        expect(postReq.statusCode).toBe(201);
        expect(getReq.statusCode).toBe(200);
        expect(getReq.body.account).toEqual(postReq.body[0].account);
    }));
});
describe('POST API TESTS', () => {
    test('it creates users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app).post('/create-account').send(sampleDataInput);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({ balance: expect.any(Number) })]));
    }));
});
describe('PUT API TESTS', () => {
    test('it transfers between clients and produces a result', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request(app).post('/create-account').send(sampleDataInput);
        yield request(app).post('/create-account').send(sampleDataInput2);
        const postReq = yield request(app).post('/transfer').send(transferSample);
        expect(postReq.statusCode).toBe(201);
        expect(postReq.body).toMatchObject(expect.objectContaining({
            reference: expect.any(String),
            amount: 1000
        }));
    }));
});
//# sourceMappingURL=apiTest.test.js.map