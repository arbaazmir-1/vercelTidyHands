import { it, expect } from "vitest";
import { generateToken } from "./generateToken.js";

it("generates a token", () => {
  const id = "639a28ee55bd66ad6a97337f";
  const token = generateToken(id);
  expect(token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/);
});
