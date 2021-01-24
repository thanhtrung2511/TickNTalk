import firebase from "firebase";
import "firebase/firestore";
//MAIN FIREBASE
// const firebaseConfig = {
//   apiKey: "AIzaSyCOz8WmtZbnGoBHXE6Mt4MXWRgOVlfGLm8",
//   authDomain: "chatapp-demo-c52a3.firebaseapp.com",
//   databaseURL: "https://chatapp-demo-c52a3.firebaseio.com",
//   projectId: "chatapp-demo-c52a3",
//   storageBucket: "chatapp-demo-c52a3.appspot.com",
//   messagingSenderId: "767529054937",
//   appId: "1:767529054937:web:84218fd9c62b42e90d84c8",
//   measurementId: "G-NBES9LJYEK",
// };
//TEST_FIREBASE
const firebaseConfig={
    apiKey: "AIzaSyC3dNTYkzJI4ek9hWi2Cg0h8LWEkwPHOLk",
    authDomain: "cloneapp-80beb.firebaseapp.com",
    databaseURL: "https://cloneapp-80beb.firebaseio.com",
    projectId: "cloneapp-80beb",
    storageBucket: "cloneapp-80beb.appspot.com",
    messagingSenderId: "1040295447581",
    appId: "1:1040295447581:web:a5f1f2d4b51e6b321bcaf4",
    measurementId: "G-KXGNPKFE17"
};
firebase.initializeApp(firebaseConfig);
//        return{
//            _id,
//            createdAt,
//            text,
//            user
//        }
//    };
//    get = callback=>{
//        this.db.on('child_added',snapshot => callback(this.parse(snapshot)));
//    };

//    off(){
//        this.db.off();
//    };
//    get db(){
//        return firebase.database().ref("messages");
//    };
//    get uid(){
//        return (firebase.auth().currentUser || {}).uid;
//    };
// }

// const db = firebase.firestore();

export const rootRef = firebase.database().ref();
export const UserRef = rootRef.child("user");
export const RoomRef = rootRef.child("room");
export const MessageRef = rootRef.child("message");

export const storage = firebase.storage().ref();

// console.log(RoomRef);
