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
export async function LoadLatestMessagesIntoRooms(listRooms, listMessages)
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



export function MatchSearchStringScore(targetString, testString){
  let cntCharTarget = 0;
  
  if(!testString || !targetString)
    return 0;

  for(let cntCharTest = 0; cntCharTest < testString.length; cntCharTest++)
  {
    if(targetString[cntCharTarget].toUpperCase() === testString[cntCharTest].toUpperCase())
    {
      cntCharTarget++;

      if(cntCharTarget === targetString.length)
        break;
    }
  }

  return cntCharTarget;
}

export function MatchSearchUserScore(targetString, testUser){
  if(!testUser || !targetString)
    return 0;

  return Math.max(
    MatchSearchStringScore(targetString, testUser.Email),
    MatchSearchStringScore(targetString, testUser.Name),
    MatchSearchStringScore(targetString, testUser.Phone)
  );
}

export function MatchSearchRoomScore(targetString, testRoom, listUsers){

  if(!testRoom || !targetString)
    return 0;

  const bestMatchMember = Object.values(testRoom.Data.Members).map((email) => {
    let user = GetUserByEmail(listUsers, email);
    return MatchSearchUserScore(targetString, user);
  }
  ).reduce((a, b) => a > b? a:b);

  return Math.max(bestMatchMember, MatchSearchStringScore(targetString, testRoom.Data.RoomName));
}