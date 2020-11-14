import firebase from 'firebase';
import "firebase/firestore"

const firebaseConfig={
    apiKey: "AIzaSyCOz8WmtZbnGoBHXE6Mt4MXWRgOVlfGLm8",
    authDomain: "chatapp-demo-c52a3.firebaseapp.com",
    databaseURL: "https://chatapp-demo-c52a3.firebaseio.com",
                projectId: "chatapp-demo-c52a3",
                storageBucket: "chatapp-demo-c52a3.appspot.com",
                messagingSenderId: "767529054937",
                appId: "1:767529054937:web:84218fd9c62b42e90d84c8",
                measurementId: "G-NBES9LJYEK",
};

const app=firebase.initializeApp(firebaseConfig);
export const rootRef= firebase.database().ref();
export const UserRef=rootRef.child('user');

export {firebase};
