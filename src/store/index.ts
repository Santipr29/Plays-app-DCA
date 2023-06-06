import Storage, { PersistanceKeys } from "../utils/storage";
import { Actions, AppState, Observer, Screens } from "../types/store";
import { reducer } from "./reducer";
import firebase, { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {  GetUser, Navigate, SetUserCredentials } from "./actions";

onAuthStateChanged(auth, async(user) => {
  console.log(user)
  if (user) {
    appState.userCredentials !== null ? dispatch(SetUserCredentials(user.uid)): '';
    dispatch(await GetUser())
    appState.userData.uid = user.uid
    appState.userData.email = String(user.email)
    dispatch(Navigate(Screens.DASHBOARD));
  } else {
    dispatch(Navigate(Screens.LOGIN));
  }
});

const initialState: AppState = {
    userData: {
      uid: "",
      userName: "",
      email: "",
      password: "",
      img: "",
    },
    screen: Screens.REGISTER,
    posts: [],
    friends: [],
    favorites: [],
    userCredentials: "",
};

export let appState = Storage.get<AppState>({
    key: PersistanceKeys.STORE,
    defaultValue: initialState,
  });
  
  let observers: Observer[] = [];

  const notifyObservers = () => observers.forEach((o) => o.render());
  
  const persistStore = (state: AppState) =>
    Storage.set({ key: PersistanceKeys.STORE, value: state });
  
  export const dispatch = (action: Actions) => {
    const clone = JSON.parse(JSON.stringify(appState));
    const newState = reducer(action, clone);
    appState = newState;
  
    persistStore(newState);
    notifyObservers();
  };
  
  export const addObserver = (ref: Observer) => {
    observers = [...observers, ref];
  };
