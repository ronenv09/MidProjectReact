import { useState,useEffect } from "react";
import TodoComp from "./Todo";
function TodosComp(props) {

  const [isAddNewTodoClicked, setIsAddNewTodoClicked] = useState(false);
  const [newTodo, setNewTodo] = useState({userId :props.userId ,id : 0 ,title : '',completed : false});

  const updateTodo = (updatedTodo) =>
  {   
    if(updatedTodo.completed == false)
    {
      updatedTodo.completed = true;
    }
    else
    {
      updatedTodo.completed = true;
    }    
    props.updateTodo(updatedTodo);
  }

  const handleAddNewTodo = () =>
  {
    setIsAddNewTodoClicked(true);
  }

  const handleCancelAddNewTodo = () =>
  {
    setIsAddNewTodoClicked(false)
  }

  const handleAddTodo = () =>
  {
    setIsAddNewTodoClicked(false);
    props.addNewTodo({...newTodo,completed : false});
  }

  return (
    <div style={{position: 'absolute' ,top: '40px', marginLeft: '450px'}}>
    
        {isAddNewTodoClicked == false && ( <div> <div> Todos - User {props.userId} <button onClick={handleAddNewTodo} style={{marginBottom: '5px',backgroundColor : '#FFD133', padding: '2px 10px',marginLeft : '310px'}}>Add</button></div>
          
          <div style={{ padding: '10px', textAlign: 'left', border: '2px solid gray', width: '455px'}}>
          
          {
            props.topThreeUserTodos.map((todo)=>
            {
              
              return <TodoComp key = {todo.id} todo = {todo} updateTodo = {updateTodo}/>
            })
          }
          </div><br/>
          
          </div>)}
          {isAddNewTodoClicked &&  (<div >New Todo - User {props.userId}
            
          </div>)}
          {isAddNewTodoClicked &&  (<div style={{border: '2px solid gray', width: '475px',height : '200px'}} >
            
            <div style={{marginLeft: '100px', marginTop : '80px' ,textDecorationLine : 'underline', textDecorationColor : 'blue'}}>Title: <input type="text" onChange={(e) => setNewTodo({...newTodo,title : e.target.value})} style={{marginLeft: '20px'}} />
              </div>
              <div style={{marginLeft : '350px',marginTop: '60px'}}>
              <button onClick={handleCancelAddNewTodo} style={{backgroundColor : '#FFD133',padding: '2px 4px'}}>Cancel</button>
              <button onClick={handleAddTodo} style={{backgroundColor : '#FFD133',marginLeft : '10px',padding: '2px 10px'}}>Add</button>
            </div>
          
        </div>)}
    
    
    </div>
  )
}

export default TodosComp
