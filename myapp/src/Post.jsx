import { useState,useEffect } from "react"; 
function PostComp(props) {

  
  return (
    <div style={{marginBottom: '10px', border: '2px solid gray', width: '450px'}}>
    <div style={{marginLeft: '10px'}}>
       <span style={{textDecorationLine : 'underline', textDecorationColor : 'blue'}}>Title : </span><br/><span style={{wordWrap:'break-word'}} >{props.post.title}</span> <br/>
       <span style={{textDecorationLine : 'underline', textDecorationColor : 'blue'}}>Body : </span><br/><span style={{wordWrap:'break-word'}}>{props.post.body}</span> 

    </div>
    

   
    
    </div>
  )
}

export default PostComp
