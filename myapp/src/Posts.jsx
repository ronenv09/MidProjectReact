import { useState,useEffect } from "react";
import PostComp from "./Post";
function PostsComp(props) {

   const [isAddNewPostClicked, setIsAddNewPostClicked] = useState(false);
   const [newPost, setNewPost] = useState({userId :props.userId ,id : 0 ,title : '',body : ''});

   const handleAddNewPost = () =>
  {
    setIsAddNewPostClicked(true)
  }

  const handleCancelAddNewPost = () =>
  {
    setIsAddNewPostClicked(false)
  }

  const handleAddPost = () =>
  {
    setIsAddNewPostClicked(false);
    props.addNewPost(newPost);
  }
  return (
    <div style={{position: 'absolute' , top: '360px',marginLeft: '450px'}}>
    
      {isAddNewPostClicked == false && ( <div> <div> Posts - User {props.userId} <button onClick={handleAddNewPost} style={{marginBottom: '5px',backgroundColor : '#FFD133', padding: '2px 10px',marginLeft : '310px'}}>Add</button></div>
       
      <div style={{ padding: '10px', textAlign: 'left', border: '2px solid gray', width: '455px'}}>
      
      {
        props.topTwoUserPosts.map((post)=>
        {
          
          return <PostComp key = {post.id} post = {post}/>
        })
      }
      </div><br/>
    </div>)}

    {isAddNewPostClicked &&  (<div style={{marginTop : '100px'}}>New Post - User {props.userId}
        
      </div>)}
      {isAddNewPostClicked &&  (<div style={{border: '2px solid gray', width: '475px',height : '200px'}} >
        
        <div style={{marginLeft: '100px', marginTop : '20px',textDecorationLine : 'underline', textDecorationColor : 'blue'}}>
        Title: <input type="text" onChange={(e) => setNewPost({...newPost,title : e.target.value})} style={{marginLeft: '20px'}} /><br/><br/>
        Body: <input type="text" onChange={(e) => setNewPost({...newPost,body : e.target.value})} style={{marginLeft: '15px'}} />
          </div>
          <div style={{marginLeft : '350px',marginTop: '70px'}}>
          <button onClick={handleCancelAddNewPost} style={{backgroundColor : '#FFD133',padding: '2px 4px'}}>Cancel</button>
          <button onClick={handleAddPost} style={{backgroundColor : '#FFD133',marginLeft : '10px',padding: '2px 10px'}}>Add</button>
        </div>
      </div>)}
      
       
    </div>
  )
}

export default PostsComp
