import UserComp from "./User"
import { useState,useEffect } from "react"; 

function UsersComp(props) {
  
  const [searchText, setSearchText] = useState('');
  const [filterdUsers, setFilterdUsers] = useState(props.users);
  const [updatedUsers, setUpdatedUsers] = useState(props.users);
  const [newUser, setNewUser] = useState({id : props.users.length + 1 , name : '',email : '', address:{street: '', suite: '', city: '', zipcode: ''}});
  const [isAddnewUserOutClicked, setIsAddnewUserOutClicked] = useState(false);
  const [isIdClicked, setIsIdClicked] = useState(false);
  
  useEffect(() =>
  {
    setUpdatedUsers(props.users);
    setFilterdUsers(props.users);
  },[props.users]) 

  useEffect(() =>
  {
    setNewUser({id : props.users.length + 1 , name : '' , email : '',address:{street: '', suite: '', city: '', zipcode: ''}})
  },[isAddnewUserOutClicked]) 

useEffect(() =>
{
  console.log("You entered ",searchText)
  const filteredUserList = updatedUsers.filter(user =>
  user.name.includes(searchText) || user.email.includes(searchText));
  
  if(searchText.length > 0)
  {
    setFilterdUsers(filteredUserList);
  }
  else
  {
    setFilterdUsers(updatedUsers);
  }
},[searchText]);

const userIdClicked = (newUser,isClicked) =>
{
  setIsAddnewUserOutClicked(false);
  const filteredUserList = updatedUsers.filter(user =>
  user.name.includes(searchText) || user.email.includes(searchText));

  if(isClicked == true)
  {
    setIsIdClicked(true);
    const showFirstUser =  filteredUserList.filter(user => user.id == newUser.id )
    setFilterdUsers(showFirstUser);
  } 
  else
  {
    setIsIdClicked(false);
    setFilterdUsers(filteredUserList);
  }                        
                          
}

const handleInput = (e) => 
{
  if(isIdClicked == false)
  {
    setSearchText(e.target.value)
  }
  
}

const updateTodos = (updatedTodos) =>
{
  props.updateTodos(updatedTodos);
}

const deleteUser = (userId) => {
  const updateUsers = updatedUsers.filter(user => user.id !== userId);
  const filteredUserList = updateUsers.filter(user =>
    user.name.includes(searchText) || user.email.includes(searchText));
    props.deleteUser(updateUsers)
};

const updateUser = (newUser) => {
  const updatedusers = updatedUsers.map(user => {
    if (user.id === newUser.id) 
    {
      return newUser;
    }
    return user; // Keep other users unchanged
    })
    setUpdatedUsers(updatedusers);
};


const handleAddNewUserOut = () =>
{
  setIsAddnewUserOutClicked(true);
}

const handleAddNewUserIn = () =>
{
  props.addNewUser(newUser);
  setIsAddnewUserOutClicked(false);
}

const handleCancelAddNewUserIn = () =>
{
  setIsAddnewUserOutClicked(false);
}


  return (
    <div style={{ position: 'absolute',top : '10px',padding : '15px',marginLeft: '30px', textAlign: 'center', 
    border: '2px solid gray', width: '460px',borderRadius: '60px',height: filterdUsers.length  == 1  ? '750px' : '' }}>
      
      <div style={{marginLeft : '80px'}}>
          Search<input type="text" value={searchText} onInput={handleInput} />
     <button onClick={handleAddNewUserOut} style={{marginLeft : '70px' , backgroundColor : '#FFD133', padding: '5px 16px'}}>Add</button>
     </div>
      {
         filterdUsers.map((user)=>{
        
            return < UserComp  key={user.id}  updatedUsers = {updatedUsers} user = {user}  todos = {props.todos} 
            posts = {props.posts} userIdClicked = {userIdClicked} updateTodos = {updateTodos}
              deleteUser = {deleteUser} updateUser = {updateUser} addNewTodo = {props.addNewTodo} 
              addNewPost = {props.addNewPost} isAddnewUserOutClicked ={isAddnewUserOutClicked} 
              filterdUsers = {filterdUsers} addNewUser = {props.addNewUser} />
        })
      }

{ isAddnewUserOutClicked &&  (<div style={{whiteSpace : 'nowrap',position: 'absolute', top : '70px', marginLeft: '500px'}} >Add New User
</div>)}

      {
        isAddnewUserOutClicked && (<div style={{position : 'absolute', top : '100px',marginLeft: '485px', border: '2px solid gray', width: '475px',height : '200px'}} >
           <div style={{marginRight: '110px', marginTop : '20px',textDecorationLine : 'underline', textDecorationColor : 'blue'}}>
        <span style={{marginLeft: '3px'}}>Name:</span> <input type="text" onChange={(e) => setNewUser({...newUser,name : e.target.value})} style={{marginLeft: '20px'}} /><br/><br/>
        <span style={{marginLeft: '5px'}}>Email:</span> <input type="text" onChange={(e) => setNewUser({...newUser,email : e.target.value})} style={{marginLeft: '30px',marginRight : '3px'}} />
          </div>
          <div style={{marginLeft : '350px',marginTop: '70px'}}>
          <button onClick={handleCancelAddNewUserIn} style={{backgroundColor : '#FFD133',padding: '2px 4px'}}>Cancel</button>
          <button onClick={handleAddNewUserIn} style={{backgroundColor : '#FFD133',marginLeft : '10px',padding: '2px 10px'}}>Add</button>
        </div>
        </div>)
      }
      
    </div>

    
  )
}

export default UsersComp
