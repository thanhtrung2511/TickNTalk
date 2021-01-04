export function GetFriendEmail(friendRoom, loggedInEmail) {
    let result = friendRoom.Members[0];
    if (result === loggedInEmail) result = friendRoom.Members[1];

    return result;
}

/// return undefined if not found
export function GetUserByEmail(listUsers, email) {
    return listUsers.find((user) => user.Email === email);
}

export function CheckRoomContainUser(room, email) {
    let flagFound = false;
    Object.values(room.Members).forEach((e) => {
      if (e === email) {
        flagFound = true;
        return;
      }
    });

    return flagFound;
};

export function CountNumberOfMembers(room) {
    return Object.values(room.Members).length;
}
