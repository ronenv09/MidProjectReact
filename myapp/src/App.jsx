import { useState,useEffect} from "react"
import axios from 'axios'
import { getAll } from "./utils";
import UsersComp from "./Users";
import PostsComp from "./Posts";

const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const todosUrl = 'https://jsonplaceholder.typicode.com/todos';

function App() {
const [users, setUsers] = useState([])
const [posts, setPosts] = useState([])
const [todos, setTodos] = useState([])  


useEffect(() =>
{
  console.log('At Mounting - We bring All the data once time and save it into the 3 useStates');
  const getData = async() =>
  {
    const {data : users} = await getAll(usersUrl);
    const {data : posts} = await getAll(postsUrl);
    const {data : todos} = await getAll(todosUrl);
    setUsers(users);
    setPosts(posts);
    setTodos(todos);
  }
  getData();
  
},[]);

//This function updates the users' tasks after each click on the mark
// completed button found in every todo component with an unfinished task
const updateTodos = (updatedTodo) => 
{
  console.log("App Component - We just updated todo:  ",updatedTodo)
  const updatedtodos = todos.map(todo => {
    if (todo.id === updatedTodo.id) {
      return { ...todo, completed: true }; // Update todo for the specific user
    }
    return todo; // Keep other users unchanged
    
  });
  
  setTodos(updatedtodos);
}

const addNewTodo = (newTodo) => 
{
  const array1 = todos.filter(x => x.userId == newTodo.userId)
  const newArray1 = array1.map(x => {
    return {...x,id : x.id + 1}})
  newArray1.unshift(newTodo)
  const array2 = todos.filter(x => x.userId != newTodo.userId)
  const mergedArray = newArray1.concat(array2);
  setTodos(mergedArray);
}

const addNewPost = (newPost) =>
{
  const array1 = posts.filter(x => x.userId == newPost.userId)
  const newArray1 = array1.map(x => {
    return {...x,id : x.id + 1}})
  newArray1.unshift(newPost)
  const array2 = posts.filter(x => x.userId != newPost.userId)
  const mergedArray = newArray1.concat(array2);
  setPosts(mergedArray);
}

const addNewUser = (newUser) =>
{
  setUsers([...users,newUser]);
}

const deleteUser = (filteredUserList) =>
{
  setUsers(filteredUserList);
}

  return (
    <div >
     
       <UsersComp users = {users} todos = {todos} posts = {posts}  
      updateTodos = {updateTodos} addNewTodo = {addNewTodo} addNewPost = {addNewPost}
       addNewUser = {addNewUser} deleteUser={deleteUser} />
       
    </div>

    
  )
}

export default App
