import { getHeightLabel, getWeightLabel, kilogramsToPounds, metersToCentimetres, metersToFeetAndInches, statsToChart } from "@/utils/transformers"
import { dummyBulbasaurParsed } from "../dummies/bulbasaur"

describe("test suite for transformers", () => {
    it("correct transform meters to foot and inches", () => {
        expect(metersToFeetAndInches(0.7)).toBe("2' 4")
    })

    it("transform meters to centimeters", () => {
        expect(metersToCentimetres(1)).toBe(100)
    })

    it("get height label returns right for a meters value", () => {
        expect(getHeightLabel(0.7)).toBe("2' 4 (70cm)")
    })

    it("kg to pounds", () => {
        expect(kilogramsToPounds(6.9)).toBe(15.21)
    })

    it("get weight label return right value by kg value", () => {
        expect(getWeightLabel(6.9)).toBe("6.9Kg (15.21Lbs)")
    })

    it("transform pokemon stat in chartdatasource", () => {
        expect(statsToChart(dummyBulbasaurParsed.stats)).toEqual({
            labels: ["Hp", "Attack"],
            datasets: [{
                data: [45, 49]
            }]
        })
    })
})