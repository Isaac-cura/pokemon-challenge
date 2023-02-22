import { ChartDataSource } from "@/models/chart.model";
import { Stat } from "@/models/pokemon.model";
import { capitalize } from "vue";

export function metersToFeetAndInches(meters: number) {
    const FEET_PER_METER = 3.28084;
    const INCHES_PER_FOOT = 12;
    const feet = Math.floor(meters * FEET_PER_METER);
    const inches = Math.round((meters * FEET_PER_METER - feet) * INCHES_PER_FOOT);
    return `${fix(feet)}' ${fix(inches)}`;
}

export function kilogramsToPounds(kg: number) {
    const POUNDS_PER_KG= 2.20462;
    const pounds = kg * POUNDS_PER_KG;
    return fix(pounds);
}

export function getWeightLabel(kg: number) {
    return `${kg}Kg (${kilogramsToPounds(kg)}Lbs)`
}

export function metersToCentimetres(meters: number) {
    return fix(meters * 100);
}

export function getHeightLabel(meters: number) {
    return `${metersToFeetAndInches(meters)} (${metersToCentimetres(meters)}cm)`;
}

export function statsToChart(stats: Stat[]):ChartDataSource {
    return {
        labels: stats.map(stat => capitalize(stat.stat.name)),
        datasets: [{data: stats.map(stat => stat.base_stat)}]
    }
}
export function getResultsMessage(results: number) {
    if(results == 1) {
        return "1 result for this search"
    } else {
        return `${results} results for this search`
    }
}
export function addZerosToId(id: number, count: number) {
  const minZeroPokemonCount = Math.max(0, count)
  const pokemonIdLength = id.toString().length
  const pokemonCountLength = minZeroPokemonCount.toString().length ?? pokemonIdLength;
  const missingCharacters = Math.max(0, pokemonCountLength - pokemonIdLength) 
  return "0".repeat(missingCharacters) + id
}
//max two decimals
function fix(value: number) {
    return parseFloat(value.toFixed(2))
}

