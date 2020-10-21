import firebase from 'firebase'

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
// class Fire{
//     constructor(){
//         this.init()
//         this.checkAuth()
//     }
//     init = () =>{
//         if (!firebase.apps.length)
//         {
//             firebase.initializeApp({
//                 apiKey: "AIzaSyCOz8WmtZbnGoBHXE6Mt4MXWRgOVlfGLm8",
//                 authDomain: "chatapp-demo-c52a3.firebaseapp.com",
//                 databaseURL: "https://chatapp-demo-c52a3.firebaseio.com",
//                 projectId: "chatapp-demo-c52a3",
//                 storageBucket: "chatapp-demo-c52a3.appspot.com",
//                 messagingSenderId: "767529054937",
//                 appId: "1:767529054937:web:84218fd9c62b42e90d84c8",
//                 measurementId: "G-NBES9LJYEK"
//             })
//         }
//     };
//     checkAuth= ()=>{
//         firebase.auth().onAuthStateChanged(user=>{
//             if (!user){
//                 firebase.auth().signInAnonymously();
//             }
//         })
//     };
//    send = messages =>{
//         messages.forEach(item =>{
//             const message={
//                 text:item.text,
//                 timestamp:firebase.database.ServerValue.TIMESTAMP,
//                 user: item.user
//             }
//             this.db.push(message)
//         })
//    };
//    parse = message =>{
//        const {user,text,timestamp}=message.val()
//        const {key: _id}= message
//        const createdAt= new Date(timestamp);

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

export default firebase.initializeApp(firebaseConfig);