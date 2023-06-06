import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, onSnapshot, where, setDoc, doc, getDoc} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  UserCredential
} from "firebase/auth";

import { Post } from "../types/post";
import { User } from "../types/users";

import firebaseConfig from "../firebaseConfig";
import { appState } from "../store";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
 

const registerUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserCredential> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      return error;
    }
  };

  const loginUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }; 


const db = getFirestore(app);

const AddPostDB = async (post: Post) =>{
    try {
    const where = collection(db, "posts")
      await addDoc(where,{...post, createdAt: new Date()});
      return true
    } catch (e) {
      console.error("Error adding document: ", e);
      return false
    }
}

const GetPostsDB = async(): Promise<Post[]> =>{
    const resp: Post[] = [];

    const q=query(collection(db,"posts"), orderBy("createdAt"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resp.push({
        ...doc.data()
      }as Post)
    });
    return resp
}

const GetPostsListener = (cb: (docs: Post[]) => void) => {
    const q = query(collection(db, "posts"), orderBy("createdAt")); 
    onSnapshot(q, (collection) => {
      const docs: Post[] = collection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      cb(docs);
    });
  };


const AddUserDB = async (user: any) =>{
  try {
    user.uid = appState.userCredentials
    await setDoc(doc(db, "users", user.uid), user)
    return true
  } catch (e) {
    console.error("Error adding document: ", e);
    return false
  }
}


const GetUserDB = async(): Promise<User> =>{
  let resp: User ={
    uid: "",
    userName: "",
    email: "",
    img: "",
    password: "",
  };
  const docRef = doc(db, "users", appState.userCredentials);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    resp = (docSnap.data() as User);
  } else {
    console.log("No such document!");
  }
  return  resp
}

const EditUserDB = async (user: any) =>{
  try {
    await setDoc (doc(db, "users", user.uid), user)
    return true
  } catch (e) {
    console.error("Error editing document: ", e);
    return false
  }
}


const AddFavoriteDB = async (favorite: Post) =>{
  try {
    const main = collection(db, `users/${appState.userData.uid}/favorites`) 
    await addDoc(main,{...favorite, createdAt: new Date()});
    return true
  } catch (e) {
    console.error("Error adding document: ", e);
    return false
  }
}

const GetFavoritesDB = async(): Promise<Post[]> =>{
    const resp: Post[] = [];

    const q=query(collection(db,`users/${appState.userData.uid}/favorites`), orderBy("createdAt"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      resp.push({
        ...doc.data()
      }as Post)
    });
    return resp
}

const GetFavoritesListener = (cb: (docs: Post[]) => void) => {
  const q=query(collection(db,`users/${appState.userData.uid}/favorites`), orderBy("createdAt"))
    onSnapshot(q, (collection) => {
      const docs: Post[] = collection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      cb(docs);
    });
  };


  const AddFriendDB = async (friend: User) =>{
    try {
      const main = collection(db, `users/${appState.userData.uid}/friends`)
      await addDoc(main,{...friend, createdAt: new Date()});
      return true
    } catch (e) {
      console.error("Error adding document: ", e);
      return false
    }
}

const GetFriendsDB = async(): Promise<User[]> =>{
    const resp: User[] = [];

    const q=query(collection(db,`users/${appState.userData.uid}/friends`), orderBy("createdAt"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      resp.push({
        ...doc.data()
      }as User)
    });
    return resp
}

const GetFriendsListener = (cb: (docs: User[]) => void) => {

  const q=query(collection(db,`users/${appState.userData.uid}/friends`), orderBy("createdAt"))
    onSnapshot(q, (collection) => {
      const docs: User[] = collection.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      })) as User[];
      cb(docs);
    });
  };


export default{
    registerUser,
    loginUser,
    EditUserDB,
    AddPostDB,
    GetPostsDB,
    GetPostsListener,
    AddFavoriteDB,
    GetFavoritesDB,
    GetFavoritesListener,
    AddFriendDB,
    GetFriendsDB,
    GetFriendsListener,
    AddUserDB,
    GetUserDB,
    onAuthStateChanged,
}