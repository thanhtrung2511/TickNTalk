export function GetFriendEmail(friendRoom, loggedInEmail) {
    let result = friendRoom.Data.Members[0];
    if (result === loggedInEmail) result = friendRoom.Data.Members[1];

    return result;
}

/// return undefined if not found
export function GetUserByEmail(listUsers, email) {
    return listUsers.find((user) => user.Email === email);
}

export function CheckRoomContainUser(room, email) {
    let flagFound = false;
    Object.values(room.Data.Members).forEach((e) => {
      if (e === email) {
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
