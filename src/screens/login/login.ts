import "../../components/export"

import styles from "./login.css"
import { dispatch } from "../../store/index";
import {Navigate} from "../../store/actions"
import { Screens } from "../../types/store";


export default class AppLogin extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this.render()
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = ``;

            const css = this.ownerDocument.createElement('style');
            css.innerHTML = styles;
            this.shadowRoot?.appendChild(css);

            const container = this.ownerDocument.createElement("section")
            container.className = "container"

            const intro = this.ownerDocument.createElement('section');
            intro.className = "intro"

            const hello = this.ownerDocument.createElement("h1");
            hello.className = "hello";
            hello.textContent = "Hello,";

            const gamer = this.ownerDocument.createElement("h1");
            gamer.className = "gamer";
            gamer.textContent = "gamer.";

            const form = this.ownerDocument.createElement('section');
            form.className = "form"

            const campsForm = this.ownerDocument.createElement("form-login")

            const account = this.ownerDocument.createElement('button');
            account.innerText = 'New to Playz?';
            account.addEventListener("click", ()=>{
                dispatch(Navigate(Screens.REGISTER))
            })

            form.appendChild(campsForm);
            form.appendChild(account);
            intro.appendChild(hello);
            intro.appendChild(gamer);
            container.appendChild(intro);
            container.appendChild(form);
            this.shadowRoot?.appendChild(container);


        }
    }
}

customElements.define('app-login', AppLogin)
