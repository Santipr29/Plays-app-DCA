import "../../components/export"
import { dispatch } from "../../store";
import { GetFriends } from "../../store/actions";

import styles from "./friends.css"


export default class AppFriends extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        }

         connectedCallback() {
            //dispatch(await GetFriends())
            this.render();
        }
        
        render() {
            if (this.shadowRoot) {
                const css = this.ownerDocument.createElement('style')
                css.innerHTML = styles
                this.shadowRoot?.appendChild(css)

                const main = this.ownerDocument.createElement("section");
                main.className = 'main';

                const navbar = this.ownerDocument.createElement("my-navbar")

                main.appendChild(navbar)

                const friendsSection = this.ownerDocument.createElement("my-friends")
                friendsSection.className = 'friendsSection';

                main.appendChild(friendsSection)

                this.shadowRoot?.appendChild(main)

            }
        }
    }
    
customElements.define("app-friends", AppFriends);