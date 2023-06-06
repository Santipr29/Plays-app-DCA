import { onAuthStateChanged } from "firebase/auth"
import { appState, dispatch } from "."
import { Post } from "../types/post"
import {  Actions, UserActions, PostActions, NavigationActions, FriendsActions, AddUserAction, LogOutAction, AddFavoriteAction, AddFriendAction, NavigationAction, Screens, EditAction, GetFriendsAction, GetFavoritesAction, GetPostsAction, AddPostAction, SetUserAction, GetUserAction } from "../types/store"
import { User } from "../types/users"
import firebase from "../utils/firebase"

export const Navigate = (screen:Screens): NavigationAction =>{
    return{
        action: NavigationActions.NAVIGATE,
        payload: screen,
    }
}

export const AddUser = async (user:User): Promise<AddUserAction> =>{

    await firebase.AddUserDB(user)

    return{
        action: UserActions.ADD_USER,
        payload: user,
    }
}

export const GetUser = async (): Promise<GetUserAction> =>{

    onAuthStateChanged
     const user = await firebase.GetUserDB()

     return{
         action: UserActions.GET_USER,
         payload: user,
     }
 }

export const LogOut =  ():LogOutAction =>{

    if(appState.userCredentials !==null || ''){
    dispatch(SetUserCredentials(''))
    appState.posts =[]
    appState.favorites=[]
    appState.friends=[]
    appState.userData={
        uid: "",
      userName: "",
      email: "",
      password: "",
      img: "",
    }    
    sessionStorage.clear()
    dispatch(Navigate(Screens.LOGIN))
}

    return{
        action: UserActions.LOGOUT,
        payload: undefined,
    }
}

export const Edit = async (user:User): Promise<EditAction> =>{

    await firebase.EditUserDB(user)

    return{
        action: UserActions.EDIT,
        payload: user,
    }
}

export const SetUserCredentials =  (user:string): SetUserAction=>{

    return{
        action: UserActions.SET_USER,
        payload: user,
    }
}


export const AddPost = async (post:Post): Promise<AddPostAction> =>{

    await firebase.AddPostDB(post)

    return{
        action:PostActions.ADD_POST,
        payload: post,
    }
}

export const GetPosts = async (): Promise<GetPostsAction> =>{

    const posts = await firebase.GetPostsDB()

    return{
        action:PostActions.GET_POSTS,
        payload: posts,
    }
}


export const AddFavorite = async (post:Post): Promise<AddFavoriteAction> =>{

    await firebase.AddFavoriteDB(post)

    return{
        action:PostActions.ADD_FAVORITE,
        payload: post,
    }
}

export const GetFavorites = async (): Promise<GetFavoritesAction> =>{

    const posts = await firebase.GetFavoritesDB()

    return{
        action:PostActions.GET_FAVORITES,
        payload: posts,
    }
}


export const AddFriend = async (friend:User): Promise<AddFriendAction> =>{

    console.log(friend)
    await firebase.AddFriendDB(friend)

    return{
        action:FriendsActions.ADD_FRIEND,
        payload: friend,
    }
}

export const GetFriends = async (): Promise<GetFriendsAction> =>{

    const friends = await firebase.GetFriendsDB()

    return{
        action:FriendsActions.GET_FRIENDS,
        payload: friends,
    }
}
