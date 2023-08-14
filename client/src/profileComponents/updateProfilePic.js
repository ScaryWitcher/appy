import { useState } from "react";
import { GetUserID } from "../customHooks/userid";

import { UploadImage } from "../components/uploadImage";
import axios from "axios";

 export const UpdateProfilePic = ()=>{
    const [user, setUser] = useState({})
    const userID = GetUserID();
    const [uploaded , setUploaded] = useState(false)
 const onImageUpload = async(url)=>{
   
   try{
    const response = await axios.put(`http://localhost:3001/auth/updateProfilePicture/${userID}`,
    {profilePicture: url})
    setUser(response.data)
    setUploaded(true)
  
   }catch(err){
    console.log(err)
   }
  
 }
 
   
   return (
        
       <div> <UploadImage onImageUpload={onImageUpload}/>
       {uploaded && <h2>Profile picture Updated</h2>}
     
       </div>
    
   )
}





