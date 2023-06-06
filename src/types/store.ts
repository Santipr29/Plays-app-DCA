import { Post } from "./post";
import { User } from "./users";

export type Observer = ({ render: () => void } & HTMLElement);

export type AppState = {
    userCredentials: string,
    screen: Screens,
    posts: Post[],
    friends: User[],
    favorites: Post[],
    userData: User,
}

export enum Screens{
    LOGIN = "LOGIN",
    REGISTER = "REGISTER",
    DASHBOARD = "DASHBOARD",
    FRIENDS="FRIENDS",
    FAVORITES="FAVORITES",
    PROFILE = "PROFILE",
}

export enum NavigationActions{
    "NAVIGATE"="NAVIGATE",
}

export interface NavigationAction{
    action: NavigationActions.NAVIGATE;
    payload: Screens;
}


export enum UserActions {
    "ADD_USER" = "ADD_USER",
    "GET_USER" = "GET_USER",
    "LOGOUT" = "LOGOUT",
    "EDIT" = "EDIT",
    "SET_USER" = "SET_USER"
}

export interface AddUserAction {
    action: UserActions.ADD_USER,
    payload: User
}

export interface GetUserAction {
    action: UserActions.GET_USER,
    payload: User
}

export interface LogOutAction {
    action: UserActions.LOGOUT,
    payload: void
}

export interface EditAction {
    action: UserActions.EDIT,
    payload: User
}

export interface SetUserAction {
    action: UserActions.SET_USER,
    payload: string
}


export enum PostActions {
    "ADD_POST" = "ADD_POST",
    "GET_POSTS" = "GET_POSTS",
    "ADD_FAVORITE" = "ADD_FAVORITE",
    "GET_FAVORITES" = "GET_FAVORITES",
}

export interface AddPostAction {
    action: PostActions.ADD_POST,
    payload: Post,
}

export interface GetPostsAction {
    action: PostActions.GET_POSTS,
    payload: Post[],
}

export interface AddFavoriteAction {
    action: PostActions.ADD_FAVORITE,
    payload: Post,
}

export interface GetFavoritesAction {
    action: PostActions.GET_FAVORITES,
    payload: Post[],
}


export enum FriendsActions {
    "ADD_FRIEND" = "ADD_FRIEND",
    "GET_FRIENDS" = "GET_FRIENDS",
}

export interface AddFriendAction {
    action: FriendsActions.ADD_FRIEND,
    payload: User,
}

export interface GetFriendsAction {
    action: FriendsActions.GET_FRIENDS,
    payload: User[],
}

export type Actions = AddUserAction | GetUserAction |LogOutAction | EditAction | SetUserAction | NavigationAction | AddPostAction | GetPostsAction | AddFavoriteAction | GetFavoritesAction | AddFriendAction | GetFriendsAction;