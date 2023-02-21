import ChartJsFacade from '@/components/chart-js-facade.vue'
import { VueWrapper, mount } from '@vue/test-utils'
import { dummyBulbasaurParsed } from '../dummies/bulbasaur';
import { Stat } from '@/models/pokemon.model';
import { chartGrowFactor } from '@/constants/chart-js.config';

describe("test suite for the chartjs facade", () => {
    let chartWrapper: VueWrapper;

    const mountChartWithStats = (stats: Stat[]) => {
        return mount(ChartJsFacade, {
            props: {
                stats
            }
        })
    }

    beforeEach(() => {
        chartWrapper = mountChartWithStats(dummyBulbasaurParsed.stats)
    })

    it("the component wrapper height grow depend on options", () => {
        chartWrapper = mountChartWithStats([dummyBulbasaurParsed.stats[0]])
        let div: HTMLDivElement = chartWrapper.find(".chart-wrapper").element as HTMLDivElement;
        let height = chartGrowFactor;
        expect(div.style.height).toBe(height + "px")
        chartWrapper = mountChartWithStats([dummyBulbasaurParsed.stats[0], dummyBulbasaurParsed.stats[0]])
        div = chartWrapper.find(".chart-wrapper").element as HTMLDivElement;
        height = 2 * chartGrowFactor;
        expect(div.style.height).toBe(height + "px")
    })
})