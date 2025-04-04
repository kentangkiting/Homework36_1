// import App from "./App";
// import { render } from "@testing-library/react";

import axios from "axios";
import { getAbilitiesNames, getStudents, setStudentHeight } from "./testing";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("getStudents", () => {
  afterEach(() => {
    mock.reset();
  });

  it("ini untuk fetch data yang berhasil", async () => {
    mock.onGet("https://pokeapi.co/api/v2/pokemon/1").reply(200, {
      name: "bulbasaur",
      id: 1,
      abilities: ["chlorophyll", "overgrow"],
    });

    const data = await getStudents();
    expect(data).toEqual({
      name: "bulbasaur",
      id: 1,
      abilities: ["chlorophyll", "overgrow"],
    });
  });

  it("ini untuk fetch data error ", async () => {
    mock.onGet("https://pokeapi.co/api/v2/pokemon/1").reply(500);

    const data = await getStudents();
    expect(data).toBeUndefined();
  });
});

describe("Student Functions", () => {
  let studentsMockData: any;

  beforeEach(async () => {
    studentsMockData = {
      id: 1,
      name: "bulbasaur",
      abilities: ["chlorophyll", "overgrow"],
      lesson: "Math",
    };

    mock
      .onGet("https://pokeapi.co/api/v2/pokemon/1")
      .reply(200, studentsMockData);

    await getStudents();
  });

  afterEach(() => {
    mock.reset();
  });

  it("ini untuk set data height yang sesuai ID", () => {
    setStudentHeight(1, 170);

    const student = studentsMockData;
    expect(student.height).toBe(170);
  });

  it("ini ketika set tidak ketemu ID yang sesuai", () => {
    setStudentHeight(999, 180);

    const student = studentsMockData;
    expect(student.height).toBeUndefined();
  });

  it("akan return list abilities", () => {
    const abilities = getAbilitiesNames([studentsMockData]);

    expect(abilities).toEqual(["chlorophyll", "overgrow"]);
  });

  it("tidak akan return list abilities yang sesuai", () => {
    const abilities = getAbilitiesNames([]);

    expect(abilities).toEqual([]);
  });
});
