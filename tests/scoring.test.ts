import { describe, expect, it } from "vitest";
import {
  calculateOverallScore,
  getRiskBandLabel,
  scoreToRiskLevel,
  type CriterionResult,
} from "../lib/scoring";

function createCriterion(
  id: string,
  score: number,
  weight: number
): CriterionResult {
  return {
    id,
    name: id,
    weight,
    score,
    weightedScore: score * (weight / 100),
    riskLevel: scoreToRiskLevel(score),
    rationale: "Test rationale",
    recommendations: [],
  };
}

describe("scoreToRiskLevel", () => {
  it("classifies scores using the correct risk boundaries", () => {
    expect(scoreToRiskLevel(1)).toBe("Low");
    expect(scoreToRiskLevel(3.5)).toBe("Low");

    expect(scoreToRiskLevel(4)).toBe("Medium");
    expect(scoreToRiskLevel(6.5)).toBe("Medium");

    expect(scoreToRiskLevel(7)).toBe("High");
    expect(scoreToRiskLevel(10)).toBe("High");
  });
});

describe("getRiskBandLabel", () => {
  it("returns the correct detailed risk-band labels", () => {
    expect(getRiskBandLabel(2)).toBe("Minimal Risk");
    expect(getRiskBandLabel(3.5)).toBe("Low Risk");
    expect(getRiskBandLabel(5)).toBe("Moderate Risk");
    expect(getRiskBandLabel(6.5)).toBe("Medium Risk");
    expect(getRiskBandLabel(8)).toBe("High Risk");
    expect(getRiskBandLabel(8.5)).toBe("Critical Risk");
  });
});

describe("calculateOverallScore", () => {
  it("calculates and rounds a weighted score to the nearest 0.5", () => {
    const criteria: CriterionResult[] = [
      createCriterion("data_privacy", 2, 25),
      createCriterion("human_oversight", 4, 20),
      createCriterion("transparency", 6, 15),
      createCriterion("robustness", 8, 15),
      createCriterion("non_discrimination", 10, 15),
      createCriterion("accountability", 5, 10),
    ];

    expect(calculateOverallScore(criteria)).toBe(5.5);
  });

  it("returns the same score when all criteria have equal scores", () => {
    const criteria: CriterionResult[] = [
      createCriterion("criterion_one", 4, 50),
      createCriterion("criterion_two", 4, 50),
    ];

    expect(calculateOverallScore(criteria)).toBe(4);
  });
});