export function GetFriendEmail(friendRoom, loggedInEmail) {
    let result = friendRoom.Data.Members[0];
    if (result.toUpperCase() === loggedInEmail.toUpperCase()) result = friendRoom.Data.Members[1];

    return result;
}

/// return undefined if not found
export function GetUserByEmail(listUsers, email) {
    return listUsers.find((user) => user.Email.toUpperCase() === email.toUpperCase());
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
};

export function CountNumberOfMembers(room) {
    return Object.values(room.Data.Members).length;
}

export function CreateNullRoom(members) {
  const result = {
    RoomID: null,
    Data: {
      RoomName: "",
      Members: members, 
    }
  }

  return result;
}

// WARNING 1: this function modify directly to listRooms
// WARNING 2: this function takes O(MN), N = listRooms.length, M = listMessages.length
export function LoadLatestMessagesIntoRooms(listRooms, listMessages)
{
  Object.values(listRooms).forEach((room) => {
    Object.values(listMessages).forEach((msg) => {
      if(msg.RoomID === room.RoomID){
        if(room.LatestMessage){
          const tempMsg = room.LatestMessage;

          if(tempMsg.Data.createdAt < msg.Data.createdAt){
            room.LatestMessage = msg;
          }          
        }
        else
          room.LatestMessage = msg;
      }
    })
  })
}
