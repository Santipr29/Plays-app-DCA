import { User } from "firebase/auth";
import { appState, dispatch } from "../../store";
import { AddUser, Navigate } from "../../store/actions";
import { Screens } from "../../types/store";
import firebase, { auth } from "../../utils/firebase";
import styles from "./formreg.css"

const credentials = {
    uid: "",
    userName: "",
    email: "",
    password: "",
    img: "",
}

export default class MyFormReg extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.render()
    }

    render(){
        if(this.shadowRoot){ 
        this.shadowRoot.innerHTML = '';

        const container = this.ownerDocument.createElement('section')
        this.shadowRoot?.appendChild(container)

        const css = this.ownerDocument.createElement('style')
        css.innerHTML = styles
        this.shadowRoot?.appendChild(css)

        const userImg = this.ownerDocument.createElement("input")
        userImg.placeholder = "Your picture"
        userImg.type = "url"
        userImg.addEventListener("change", (e:any)=>{
            credentials.img = e.target.value
        })

        const userName = this.ownerDocument.createElement("input")
        userName.placeholder = "Username"
        userName.type = "text"
        userName.addEventListener("change", (e:any)=>{
            credentials.userName = e.target.value
        })

        const email = this.ownerDocument.createElement("input")
        email.placeholder = "Email"
        email.type = "email"
        email.addEventListener("change", (e:any)=>{
            credentials.email = e.target.value
        })

        const password = this.ownerDocument.createElement("input")
        password.placeholder = "Password"
        password.type = "password"
        password.addEventListener("change", (e:any)=>{
            credentials.password = e.target.value
        })

        const sendbtn = this.ownerDocument.createElement("button")
        sendbtn.innerText = "Register"
        sendbtn.addEventListener("click", async ()=>{
            const user = await firebase.registerUser(credentials)
            console.log(user);
            credentials.uid = user.user.uid
            dispatch(await AddUser(credentials))
            if(user){
                dispatch(Navigate(Screens.DASHBOARD))
                sessionStorage.clear()
            }
        })

        container.appendChild(userName)
        container.appendChild(email)
        container.appendChild(password)
        container.appendChild(userImg)
        container.appendChild(sendbtn)

        }
    }

}

customElements.define('form-register', MyFormReg)