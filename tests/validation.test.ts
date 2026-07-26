import { describe, expect, it } from "vitest";
import {
  isValidShortText,
  isValidTextarea,
} from "../lib/validation";

describe("isValidTextarea", () => {
  it("accepts sufficiently detailed answers", () => {
    expect(
      isValidTextarea("AI reviews customer support messages")
    ).toBe(true);

    expect(
      isValidTextarea("The system processes employee information")
    ).toBe(true);
  });

  it("rejects answers that are too short", () => {
    expect(isValidTextarea("Too short")).toBe(false);
    expect(isValidTextarea("")).toBe(false);
    expect(isValidTextarea("     ")).toBe(false);
  });

  it("rejects long entries containing fewer than three words", () => {
    expect(isValidTextarea("abcdefghijklmnop")).toBe(false);
  });

  it("ignores extra spaces around valid answers", () => {
    expect(
      isValidTextarea("   customer support chatbot   ")
    ).toBe(true);
  });
});

describe("isValidShortText", () => {
  it("accepts values containing at least two characters", () => {
    expect(isValidShortText("IT")).toBe(true);
    expect(isValidShortText("Finance")).toBe(true);
  });

  it("rejects blank or one-character values", () => {
    expect(isValidShortText("")).toBe(false);
    expect(isValidShortText("A")).toBe(false);
    expect(isValidShortText(" A ")).toBe(false);
  });
});