import { addObserver, appState, dispatch } from "../../store";
import { GetFriends } from "../../store/actions";
import { User } from "../../types/users";
import styles from "./friends.css"

class Friends extends HTMLElement{
    
    constructor(){
        super();
        this.attachShadow({mode:"open"});
        addObserver(this)
    }

    async connectedCallback() {
        if(appState.friends.length ===0){
        dispatch(await GetFriends())
        this.render();
    }else{
        this.render()
    }
    }

    render(){
        if(this.shadowRoot) this.shadowRoot.innerHTML=""

            const css = this.ownerDocument.createElement('style')
        css.innerHTML = styles
        this.shadowRoot?.appendChild(css)

        const container = this.ownerDocument.createElement("section")
        container.className = "container"

        appState.friends.forEach((p)=>{
            
            const card = this.ownerDocument.createElement("section")
            card.className = "card"
    
            const imgprofile = this.ownerDocument.createElement("img")
            imgprofile.src = p.img
    
            const username = this.ownerDocument.createElement("h3")
            username.textContent = p.userName
    
            card.appendChild(imgprofile)
            card.appendChild(username)
    
            container.appendChild(card)
            })

        this.shadowRoot?.appendChild(container)
        
        }
    }


customElements.define("my-friends",Friends);
export default Friends;