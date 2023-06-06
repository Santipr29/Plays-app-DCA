import "../../components/export"
import { dispatch } from "../../store";
import { GetFavorites } from "../../store/actions";
import styles from "./favorites.css"


export default class AppFavorites extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        }

         connectedCallback() {
            //dispatch(await GetFavorites())
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

                const publicationsSection = this.ownerDocument.createElement("my-favorites")
                publicationsSection.className = 'publications';
                main.appendChild(publicationsSection)

                this.shadowRoot?.appendChild(main)

            }
        }
    }
    
customElements.define("app-favorites", AppFavorites);