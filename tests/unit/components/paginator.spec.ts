import Paginator from '@/components/item-paginator.vue'
import { DOMWrapper, VueWrapper, mount } from '@vue/test-utils'
describe("test suite for the paginator component", () => {
    let paginatorWrapper: VueWrapper;
    const paginatorInfo = {
        offset: 0,
        limit: 10,
        count: 100,
        segmentLength: 5
    }
    beforeEach(() => {
        paginatorWrapper = mount(Paginator, {
            props: {
                paginatorInfo
            } 
        })
    })
    it("the component show the right quantity of pagination buttons when a page its create", () => {
        expect(paginatorWrapper.findAll("button").length).toBe(7) //the segment length & forth, back
    })
    it("the current page is the only active page", () => {
        expect(paginatorWrapper.findAll(".active").length).toBe(1)
    })
    it("the current page is the active page", () => {
        expect(paginatorWrapper.find(".active").text()).toBe("1")
    })
    it("when the paginator info change the active item change", async () => {
        expect(paginatorWrapper.find(".active").text()).toBe("1")
        await paginatorWrapper.setProps({
            paginatorInfo: {
                ...paginatorInfo,
                offset: 10
            }
        })
        expect(paginatorWrapper.find(".active").text()).toBe("2")
    })
    it("when click an active button the paginator emit change event", () => {
        const paginatorButton = paginatorWrapper.findAll("button")[4]
        paginatorButton.trigger("click")
        expect(paginatorWrapper.emitted("change")).toHaveLength(1)
    })
    it("when click in the paginator button the change emitter retreive the paginator info needed to navigate to that page", async () => {
        const paginatorButton = paginatorWrapper.findAll("button")[4];
        const pageToGo = paginatorButton.text()
        paginatorButton.element.click()
        const emited = paginatorWrapper.emitted("change")
        await paginatorWrapper.setProps({ 
            paginatorInfo: emited![0][0]
        })
        expect(paginatorWrapper.find(".active").text()).toBe(pageToGo)
    })

    it("when the button is active the button is disabled", async () => {
        const button:DOMWrapper<HTMLButtonElement> = paginatorWrapper.find("button.active")
        button.element.click()
        expect(paginatorWrapper.emitted("change") ?? []).toHaveLength(0)
    })

    it("Innaccesible buttons are disableds", () => {
        //inaccesible cause we cant go back being in the first page
        const button = paginatorWrapper.findAll("button")[0]
        button.trigger("click")
        expect(paginatorWrapper.emitted("change") ?? []).toHaveLength(0)
    })
})