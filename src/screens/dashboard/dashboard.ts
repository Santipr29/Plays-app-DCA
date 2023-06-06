import "../../components/export"
import { appState, dispatch } from "../../store";
import { GetPosts } from "../../store/actions";
import firebase from "../../utils/firebase";
import styles from "./index.css"


export default class AppDashboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        }

        connectedCallback() {
            //dispatch(await GetUser())
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

                const publicate = this.ownerDocument.createElement("my-playing")

                main.appendChild(navbar)
                main.appendChild(publicate)

                const publicationsSection = this.ownerDocument.createElement("my-publications")
                publicationsSection.className = 'publications';
                main.appendChild(publicationsSection)

                this.shadowRoot?.appendChild(main)

            }
        }
    }
    
customElements.define("app-dashboard", AppDashboard);