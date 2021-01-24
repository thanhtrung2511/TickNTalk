import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import { RoomRef,UserRef } from "../Fire";

export function GetFriendEmail(friendRoom, loggedInEmail) {
  let result = friendRoom.Data.Members[0];
  if (result.toUpperCase() === loggedInEmail.toUpperCase())
    result = friendRoom.Data.Members[1];

  return result;
}
export function GetRoomFriendEmail(groupRoom, loggedInEmail) {
  let listUserRoomNotIncludeCurrent = [];
  Object.values(groupRoom.Data.Members).forEach((e) => {
    {
    if (e.toUpperCase() !== loggedInEmail.toUpperCase())
      listUserRoomNotIncludeCurrent.push(e);
    }
  });
  // return listUserRoomNotIncludeCurrent;
}
/// return undefined if not found
export function GetUserByEmail(listUsers, email) {
  return listUsers.find(
    (user) => user.Email.toUpperCase() === email.toUpperCase()
  );
}

export function CheckRoomContainUser(room, email) {
  let flagFound = false;
  Object.values(room.Data.Members).forEach((e) => {
    if (e.toUpperCase() === email.toUpperCase()) {
      flagFound = true;
      return;
    }
  });

  return flagFound;
}
export async function RemoveUserFromRoom(room, email) {
  if(!room)
    return;
  if(!room.Data)
    return;
  if(!room.Data.Members)
    return;

  let tempMembers = Object.values(room.Data.Members).filter(e => e.toUpperCase() !== email.toUpperCase());

  if(room && room.Data && room.RoomID){
    await RoomRef.child(room.RoomID).update({"Members" : tempMembers});
  }
}

export async function MarkUserAsUnread(room, email) {
  if(!room)
    return;
  if(!room.Data)
    return;
  if(!room.Data.SeenMembers)
    return;

  let tempMembers = Object.values(room.Data.SeenMembers).filter(e => e.toUpperCase() !== email.toUpperCase());

  if(room && room.Data && room.RoomID){
    await RoomRef.child(room.RoomID).update({"SeenMembers" : tempMembers});
  }
}


export function CheckRoomContainUserFirebase(roomData, email) {
  let flagFound = false;
  if (!roomData||!email||!roomData.Members||!roomData.SeenMembers)
    return false;

  Object.values(roomData.Members).forEach((e) => {
    if (e.toUpperCase() === email.toUpperCase()) {
      flagFound = true;
      return;
    }
  });

  return flagFound;
}

export function CountNumberOfMembers(room) {
  return Object.values(room.Data.Members).length;
}

export function CreateNullRoom(members) {
  // console.log(members)
  const result = {
    RoomID: null,
    Data: {
      RoomName: "",
      Members: members,
    },
  };

  return result;
}

// WARNING 1: this function modify directly to listRooms
// WARNING 2: this function takes O(MN), N = listRooms.length, M = listMessages.length
export async function LoadLatestMessagesIntoRooms(listRooms, listMessages) {
  //console.log("con chó "+ numberCount);
  //console.log(listRooms.Data.Members);
  Object.values(listRooms).forEach((room) => {
    Object.values(listMessages).forEach((msg) => {
      if (msg.RoomID === room.RoomID) {
        var numberCount = Object.keys(room.Data.Members).length;
        //console.log(numberCount);
        if (room.LatestMessage) {
          const tempMsg = room.LatestMessage;
          //console.log(tempMsg);
          if (tempMsg.Data.createdAt < msg.Data.createdAt) {
            room.LatestMessage = msg;
          }
        } else room.LatestMessage = msg;
        if (numberCount > 2) {
          //console.log(msg.Data.user.name);
          let tmpMessage =
            
            msg.Data.text;
          
          
          room.LatestMessage.Data.text = tmpMessage;
        }
      }
    });
  });
}

export async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    //send token to supplier
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
export function getFriendForChatScr(email){
  var nameTmp = "";
  var avaTmp = "";
  var token = "";
  var emailTmp = "";
  var birthdayTmp = "";
  var genderTmp = "";
  var phoneTmp = "";
  var result = {
    ava: "",
    name: "",
    token: "",
    email: "",
    birthday: "",
    gender: "",
    phone:"",
    isVirtual:false,
  };
  if (email)
  {
  UserRef.orderByChild("Email")
    .equalTo(email)
    .on("value", (snap) => {
      snap.forEach((element) => {
        nameTmp = element.toJSON().Name;
        avaTmp = element.toJSON().urlAva;
        token = element.toJSON().Token;
        emailTmp = element.toJSON().Email;
        birthdayTmp = element.toJSON().Birthday;
        genderTmp = element.toJSON().Gender;
        phoneTmp = element.toJSON().Phone;
      });
    });
  result.ava = avaTmp;
  result.name = nameTmp;
  result.email = emailTmp;
  result.token = token;
  result.birthday = birthdayTmp;
  result.gender = genderTmp;
  result.phone= phoneTmp;}
  // console.log('result',result)
  return result;
};
export async function sendPushNotification(expoPushToken, dataParse) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: dataParse.sender,
    body: dataParse.message,
    data: { data: dataParse.data },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

export function MatchSearchStringScore(targetString, testString) {
  let cntCharTarget = 0;

  if (!testString || !targetString) return 0;

  for (let cntCharTest = 0; cntCharTest < testString.length; cntCharTest++) {
    if (
      targetString[cntCharTarget].toUpperCase() ===
      testString[cntCharTest].toUpperCase()
    ) {
      cntCharTarget++;

      if (cntCharTarget === targetString.length) break;
    }
  }

  return cntCharTarget;
}

export function MatchSearchUserScore(targetString, testUser) {
  if (!testUser || !targetString) return 0;

  return Math.max(
    MatchSearchStringScore(targetString, testUser.Email),
    MatchSearchStringScore(targetString, testUser.Name),
    MatchSearchStringScore(targetString, testUser.Phone)
  );
}

export function MatchSearchRoomScore(targetString, testRoom, listUsers) {
  if (!testRoom || !targetString) return 0;

  const bestMatchMember = Object.values(testRoom.Data.Members)
    .map((email) => {
      let user = GetUserByEmail(listUsers, email);
      return MatchSearchUserScore(targetString, user);
    })
    .reduce((a, b) => (a > b ? a : b));

  return Math.max(
    bestMatchMember,
    MatchSearchStringScore(targetString, testRoom.Data.RoomName)
  );
}


////////////////////////////////////////////////////////////////////////////////////////////////////

export function CheckRoomSeenByUser(room, email) {
  let flagFound = false;

  if(!room.Data || !room.Data.SeenMembers)
    return false;

  Object.values(room.Data.SeenMembers).forEach((e) => {
    if (e.toUpperCase() === email.toUpperCase()) {
      flagFound = true;
      return;
    }
  });

  return flagFound;
}

export function AddSeenMemberToRoom(room, email) {
  if(!room)
    return;
  if(!room.Data)
    return;
  if(!room.RoomID)
    return;
  
  if(!CheckRoomSeenByUser(room, email)){
    if(room.Data.SeenMembers)
    {
      room.Data.SeenMembers = Object.values(room.Data.SeenMembers);
      room.Data.SeenMembers.push(email);
    }
    else
      room.Data.SeenMembers = [email];
  }
}

export function AddAndSaveDbSeenMemberToRoom(room, email) {
  if(!room.RoomID)
    return

  AddSeenMemberToRoom(room, email);

  if(room && room.Data && room.RoomID){
      RoomRef.child(room.RoomID).update({"SeenMembers" : room.Data.SeenMembers});
      // RoomRef.child(room.RoomID).child("SeenMembers")
  }
}

export async function ResetDbSeenMembersOfRoom(room) {
  if(!room)
    return;
  if(!room.Data)
    return;
  if(!room.Data.SeenMembers)
    return;

  room.Data.SeenMembers = undefined;
  
  if(room.RoomID) {
    await RoomRef.child(room.RoomID).child("SeenMembers").remove();
  }
}