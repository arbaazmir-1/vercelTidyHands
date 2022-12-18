import { it, expect } from "vitest";
import { generateToken } from "./generateToken.js";
import jwt from "jsonwebtoken";

it("generates a token", () => {
  const id = "639a28ee55bd66ad6a97337f";
  const token = generateToken(id);
  expect(token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/);
});

it("generates a token with the correct id", () => {
  const id = "639a28ee55bd66ad6a973";
  const token = generateToken(id);
  const decoded = jwt.decode(token);
  expect(decoded.id).toBe(id);
});

it("throws an error if no id is provided", () => {
  expect(() => generateToken()).toThrow();
});
