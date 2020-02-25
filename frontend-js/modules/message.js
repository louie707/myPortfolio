export default class Message {
    constructor() {
        this.form = document.querySelector("#email-form")
        this.allField = document.querySelectorAll("#email-form .form-group");
        this.insertElement();
        this.nameField = document.querySelector("#form104");
        this.emailField = document.querySelector("#form105");
        this.subjectField = document.querySelector("#form106");
        this.textField = document.querySelector("#form107");
        this.nameField.previousValue = ""
        this.emailField.previousValue = ""
        this.subjectField.previousValue = ""
        this.textField.previousValue = ""
        this.event()
    }

    // event
    event() {
        this.form.addEventListener("submit", e => {
            e.preventDefault();
            this.formSubmitHandler();

        })

        this.nameField.addEventListener("keyup", () => {
            this.isDifferent(this.nameField, this.nameHandler)
        })

        this.emailField.addEventListener("keyup", () => {
            this.isDifferent(this.emailField, this.emailHandler)
        })

        this.subjectField.addEventListener("keyup", () => {
            this.isDifferent(this.subjectField, this.subjectHandler)
        })

        this.textField.addEventListener("keyup", () => {
            this.isDifferent(this.textField, this.textHandler)
        })
    }

    // method
    formSubmitHandler() {
        this.nameFieldCheck();
        this.emailFieldCheckDelay();
        this.subjectFieldCheck();
        this.textFieldCheck();

        if(
            !this.nameField.errors &&
            !this.emailField.errors &&
            !this.subjectField.errors &&
            !this.textField.errors
        )   {
            this.form.submit()
        }
    }

    isDifferent(element, handler) {
        if(element.previousValue != element.value){
            handler.call(this)
        }
        element.previousValue = element.value
    }

    nameHandler() {
        this.nameField.errors = false
        this.nameFieldCheck();

    }

    nameFieldCheck() {
        if(this.nameField.value.length <= 1 || this.nameField.value == ""){
            this.showValidatorError(this.nameField, "*Please enter name")
        }

        if(this.nameField.value.length > 1){
            this.hideValidator(this.nameField)
        }
    }

    emailHandler() {
        this.emailField.errors = false;
        clearTimeout(this.emailField.timer)
        this.emailField.timer = setTimeout(() => this.emailFieldCheckDelay(), 800)
    }

    emailFieldCheckDelay() {
        if(!/^\S+@\S+$/.test(this.emailField.value)) {
            this.showValidatorError(this.emailField, "Please enter a valid email")
        }

        if(!this.emailField){
            this.showValidatorError(this.emailField, "Please enter a email")
        }

        if(/^\S+@\S+$/.test(this.emailField.value)) {
            this.hideValidator(this.emailField)
        }
    }

    subjectHandler() {
        this.subjectField.errors = false;
        this.subjectFieldCheck();
    }

    subjectFieldCheck() {
        if(this.subjectField.value.length <= 5 || this.subjectField.value == ""){
            this.showValidatorError(this.subjectField, "Please enter a subject")
        }

        if(this.subjectField.value.length > 5){
            this.hideValidator(this.subjectField)
        }
    }

    textHandler() {
        this.textField.errors = false;
        this.textFieldCheck();
    }

    textFieldCheck() {
        if(this.textField.value.length < 6 || this.textField.value == ""){
            this.showValidatorError(this.textField, "Message too")
        }

        if(this.textField.value.length > 6){
            this.hideValidator(this.textField)
        }
    }

    showValidatorError(element, message) {
        element.nextElementSibling.nextElementSibling.innerHTML = message
        element.nextElementSibling.nextElementSibling.classList.add("liveValidateMessage--visible")
        element.errors = true
    }

    hideValidator(element) {
        element.nextElementSibling.nextElementSibling.classList.remove("liveValidateMessage--visible")
    }

    insertElement() {
        this.allField.forEach(el => {
            el.insertAdjacentHTML('beforeend', '<div class="alert small liveValidateMessage"></div>')
        })
    }
}