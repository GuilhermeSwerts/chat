const getOtherEmail = (users,currentUsers) =>{
    return users?.filter(user => user!== currentUsers.email)[0];
}

export default getOtherEmail


