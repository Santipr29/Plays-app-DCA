import "../../components/export"
import styles from "./profile.css"
import { appState, dispatch } from "../../store/index";
import { Edit, LogOut, Navigate} from "../../store/actions"
import { Screens } from "../../types/store";

const credentials = { 
    uid:appState.userData.uid,
    userName: "",
    email: appState.userData.email,
    password: appState.userData.password,
    img: "",
}

export default class AppProfile extends HTMLElement {
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

            const container = this.ownerDocument.createElement("section");
            container.className = "container"

            const navbar = this.ownerDocument.createElement("my-navbar");
            container.appendChild(navbar);

            const editProfile = this.ownerDocument.createElement("section");
            editProfile.className = "editProfile";
            container.appendChild(editProfile);

            const profilePicture = this.ownerDocument.createElement("img");
            profilePicture.className = "profilePicture";
            profilePicture.src = appState.userData.img;
            editProfile.appendChild(profilePicture);

            const newPicture = this.ownerDocument.createElement("input");
            newPicture.placeholder = "Change your picture"
            newPicture.addEventListener("change", (e:any)=>credentials.img = e.target.value);
            editProfile.appendChild(newPicture);

            const form = this.ownerDocument.createElement('section');
            form.className = "form"

            const userName = this.ownerDocument.createElement("input");
            userName.placeholder = appState.userData.userName
            userName.addEventListener("change", (e:any)=>credentials.userName = e.target.value);
            form.appendChild(userName);

            const confirm = this.ownerDocument.createElement('button');
            confirm.textContent = "Confirm";
            confirm.className = "confirm";
            confirm.addEventListener("click", async()=>{
                 dispatch(await Edit(credentials))
             })
            form.appendChild(confirm);
            
            const button = this.ownerDocument.createElement('button');
            button.innerText = 'Log Out';
            button.className = "logOut";
             button.addEventListener("click", ()=>{
                dispatch(LogOut())
             })

            editProfile.appendChild(form);
            container.appendChild(button);
            this.shadowRoot?.appendChild(container);
        }
    }
}

customElements.define('app-profile', AppProfile)
