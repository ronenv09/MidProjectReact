import { useState,useEffect } from "react"; 
import TodosComp from "./Todos";
import PostsComp from "./Posts"
function UserComp(props) {
  
  const [topThreeUserTodos, setTopThreeUserTodos] = useState([]);
  const [userTodos, setUserTodos] = useState([]);
  const [topTwoUserPosts, setTopTwoUserPosts] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [user, setUser] = useState(props.user);
  const [updatedUser, setUpdatedUser] = useState(props.user);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() =>
  {
    setIsHovered(false);
    setUser(props.user)
  },[props.user,props.filterdUsers,props.isAddnewUserOutClicked])

  useEffect(() =>
  {
    if(props.isAddnewUserOutClicked)
    {
      setIsClicked(false);
    }
    
  },[props.isAddnewUserOutClicked])

  
  useEffect(() =>
  {
  const usertodos = props.todos.filter(todo => todo.userId == props.user.id)
  setUserTodos(usertodos);
  const topThreeUserTodos = usertodos.slice(0,3);
  setTopThreeUserTodos(topThreeUserTodos);
  let isAllCompleted;
  if(topThreeUserTodos.length > 0)
  {
     isAllCompleted = topThreeUserTodos.every(x => x.completed == true);
  }
  else
  {
    isAllCompleted = false;
  }
    
  if(isAllCompleted) 
  {
    setIsFinished(true);
  } 
  else
  {
    setIsFinished(false);
  }
  
  },[props.todos]);


  useEffect(() =>
  {
  const userposts = props.posts.filter(post => post.userId == props.user.id)
  const topTwoUserPosts = userposts.slice(0,2);
  setTopTwoUserPosts(topTwoUserPosts);
  const isAllCompleted = topThreeUserTodos.every(x => x.completed == true);
  
  },[props.posts]);

  
  const handleUserIdClicked = () =>
  {
   if(isClicked == true)
   {
    setIsClicked(false);
   } 
   else
   {
    setIsClicked(true);
   }
   props.userIdClicked(user,!isClicked);
  }

  const handleUpdate = () =>
  {
    setUpdatedUser(user);
    props.updateUser(user);
  }

  const handleDelete = () =>
  {
    props.deleteUser(user.id);
  }
  
  const updateTodo = (updatedTodo) =>
  {
    props.updateTodos(updatedTodo);
  }

  const handleMouseOver = () =>
  {
    if(isHovered == false)
    {
      setIsHovered(true);
    }
    
  }

  const handleMouseClick = () =>
  {
    setIsHovered(false);
  }

  return (
    

    <div  style={{display: 'flex', flexDirection : 'row',textAlign: 'left',marginLeft: '15px',marginTop: '10px', 
    textDecorationLine : 'underline', textDecorationColor : 'blue' ,backgroundColor : isClicked ? '#FF9F33' : 'white',borderStyle : 'solid' 
    ,borderColor: isFinished ? '#49FF33' :'#FF0000'  , width: '430px'}}>
      
      <div style={{marginBottom: '5px',textAlign: 'left',marginLeft: '15px'}} >
      
      {props.isAddnewUserOutClicked == false && isClicked && (
        <div>
             
            <TodosComp  todos = {props.todos} userTodos = {userTodos} topThreeUserTodos ={topThreeUserTodos} userId = {props.user.id} updateTodo = {updateTodo} addNewTodo = {props.addNewTodo} />
            <PostsComp topTwoUserPosts = {topTwoUserPosts} userId = {props.user.id} user = {user} addNewPost = {props.addNewPost} />
            </div>
             )}
      <span style = {{cursor :  'pointer'}}  onClick={handleUserIdClicked}> Id : {props.user.id} </span><br/> 
      Name: <input type="text" name="Name" autoComplete="off" defaultValue={user.name} style={{width: '180px',marginBottom: '5px',marginLeft: '32px',backgroundColor: isClicked ? '#FF9F33' : ''}}  onChange={(e) => setUser({...user,name : e.target.value})} /><br/>
      Email: <input type="text" name="Email" autoComplete="off" defaultValue={user.email} style={{width: '180px',marginLeft: '36px' ,backgroundColor: isClicked ? '#FF9F33' : ''}} onChange={(e) => setUser({...user,email : e.target.value})}/><br/><br/>
      
      
      <div>
            <button
              onMouseOver={handleMouseOver}
              onClick={handleMouseClick}
              style={{ backgroundColor:'gray' ,padding: '5px 8px'}}
            >
              <span>Other Data</span>
              </button>

              {isHovered && (
                <div style={{border: '1px solid gray' ,marginLeft: '-10px',height : '90px',width: '400px',padding : '5px', marginTop: '10px',marginBottom: '10px', borderRadius: '30px'}}>
                  <div style={{marginLeft: '10px'}}>
                    Street: <input type="text" name="Street" defaultValue={updatedUser.address.street} onChange={(e) => setUser({...user,address : {...user.address,street : e.target.value}})} style={{width: '180px',marginBottom: '5px',marginLeft: '28px',backgroundColor: isClicked ? '#FF9F33' : ''}} /><br/>
                    City: <input type="text" name="City" defaultValue={updatedUser.address.city} onChange={(e) => setUser({...user,address : {...user.address,city : e.target.value}})} style={{width: '180px',marginBottom: '5px',marginLeft: '42px',backgroundColor: isClicked ? '#FF9F33' : ''}}/><br/>
                    Zip Code: <input type="text" name="Zip Code" defaultValue={updatedUser.address.zipcode} onChange={(e) => setUser({...user,address : {...user.address,zipcode : e.target.value}})} style={{width: '180px',marginLeft: '5px',backgroundColor: isClicked ? '#FF9F33' : ''}}/><br/>
                    </div>
                  </div>
                
              )}
              {/* <div style={{marginRight: '5px',marginLeft: isHovered ? '265px' : '' }}> */}
              <button onClick={handleUpdate}  style={{marginRight : '5px',marginLeft : isHovered ? '268px' : '170px',backgroundColor : '#FFD133',padding: '5px 8px'}}>Update</button>
              <button onClick={handleDelete} style={{backgroundColor : '#FFD133',padding: '5px 10px'}}>Delete</button>
              {/* </div> */}
          </div>
     
      
          </div>
    </div>
   
  )
}

export default UserComp
