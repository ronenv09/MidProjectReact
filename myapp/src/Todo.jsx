import { useState,useEffect } from "react"; 
function TodoComp(props) {


  const handleMarkCompleted = () =>
  {
    props.updateTodo(props.todo);
  }
  //console.log("props.todoooo",props.todo)
  return (
    <div style={{marginBottom: '10px', border: '2px solid gray', width: '450px'}}>
        <div style={{marginLeft: '10px'}}>
          <span style={{textDecorationLine : 'underline', textDecorationColor : 'blue'}}>Title : </span><span style={{marginLeft:'20px',wordWrap:'break-word'}}>{props.todo.title}</span> <br/>
          <span style={{textDecorationLine : 'underline', textDecorationColor : 'blue'}}>Completed : </span><span style={{marginLeft:'20px'}}>{props.todo.completed.toString()}</span> 
          {!props.todo.completed && (
                
                <button onClick={handleMarkCompleted} style={{marginLeft : '135px',marginBottom: '10px',backgroundColor : '#FFD133', padding: '3px 15px'}}>Mark Completed</button>

                
                )}
          <br/>
        </div>
       
    </div>
  )
}

export default TodoComp
