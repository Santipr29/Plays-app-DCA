import { appState, dispatch } from "../../store";
import { AddPost } from "../../store/actions";
import { Post } from "../../types/post";
import styles from "./playing.css"

const post: Post = {
    id: appState.userData.uid,
    imgprofile: appState.userData.img,
    username: appState.userData.userName,
    description: "",
    video: "",
    createdAt: "",
}

class Playing extends HTMLElement{
    
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if (this.shadowRoot){
            

            const css = this.ownerDocument.createElement('style')
        css.innerHTML = styles
        this.shadowRoot?.appendChild(css)

        const container = this.ownerDocument.createElement("section")
        container.className = "container"

        const up = this.ownerDocument.createElement("section")
        up.className = "up"
        up.className = "up"

        const inputs = this.ownerDocument.createElement("section")
        inputs.className = "inputs"
        inputs.className = "inputs"

        const down = this.ownerDocument.createElement("section")
        down.className = "down"
        down.className = "down"

        

        const imgprofile = this.ownerDocument.createElement("img")
        imgprofile.src = appState.userData.img

        const descriptionPost = this.ownerDocument.createElement("input")
        descriptionPost.className = "description"
        descriptionPost.placeholder = "What are you playing?"
        descriptionPost.type = "text"
        descriptionPost.addEventListener("change", (e:any)=>{
            post.description = e.target.value
        })

        const videoLink = this.ownerDocument.createElement("input")
        videoLink.className = "videoLink"
        videoLink.placeholder = "Your embed youtube video here"
        videoLink.type = "text"
        videoLink.addEventListener("change", (e:any)=>{
            post.video = e.target.value
        })

        const sendbtn = this.ownerDocument.createElement("button")
        sendbtn.textContent = "+"
        sendbtn.addEventListener("click", async ()=>{
            dispatch(await AddPost(post))
        })

        inputs.appendChild(descriptionPost)
        inputs.appendChild(videoLink)
        up.appendChild(imgprofile)
        up.appendChild(inputs)
        down.appendChild(sendbtn)

        container.appendChild(up)
        container.appendChild(down)

        this.shadowRoot?.appendChild(container)
        
        }
    }
}

customElements.define("my-playing",Playing);
export default Playing;