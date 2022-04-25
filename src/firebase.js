import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_WB8LfbNu6IIkrvVMVA8RcY8Y0XjpY2I",

  authDomain: "wrestleroutreach-df6f7.firebaseapp.com",

  projectId: "wrestleroutreach-df6f7",

  storageBucket: "wrestleroutreach-df6f7.appspot.com",

  messagingSenderId: "491043024549",

  appId: "1:491043024549:web:24fce5dfae5451d9a1274c",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
