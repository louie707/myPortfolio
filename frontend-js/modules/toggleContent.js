export default class Toggle {
    constructor() {
        this.contentShow = document.querySelector("#contentToggle");
        this.contentHide = document.querySelector("#contentHide");
        this.event();
    }

    event() {
        this.contentShow.addEventListener("click", () => {
            this.contentShow.setAttribute("hidden", true)
        })

        this.contentHide.addEventListener("click", () => {
            this.contentShow.removeAttribute("hidden")
        })
    }
}