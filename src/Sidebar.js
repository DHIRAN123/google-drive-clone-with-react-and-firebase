import React, { useState } from 'react'
import "./css/sidebar.css"
import  MobileScreenShareIcon  from "@material-ui/icons/MobileScreenShare";
import DevicesIcon from "@material-ui/icons/Devices";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import QueryBuilderOutlinedIcon from "@material-ui/icons/QueryBuilderOutlined";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import DeleteOutlineOutlinedIcon  from "@material-ui/icons/DeleteOutlineOutlined";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import {Modal} from '@material-ui/core';
import {db, storage } from './firebase';
import firebase from "firebase"


function Sidebar() {
    const [open,setOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);
    const handleClose=()=>{
        setOpen(false);
    } 
    const handleOpen=()=>{
        setOpen(true);
    }
    const handleChange=(e)=>{
if(e.target.files[0])
{
setFile(e.target.files[0])
}
    }
    const handleUpload=(event)=>{
     event.preventDefault();
     setUploading(true);

     storage.ref(`files/${file.name}`).put(file).then(snapshot=>{
         storage.ref("files").child(file.name).getDownloadURL().then(url=>{
             db.collection("myfiles").add({
                 timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                 filename:file.name,
                 fileURL:url,
                 size:snapshot._delegate.bytesTransferred
             })

             setUploading(false);
             setFile(null);
             setOpen(false);

         })
     })
            }
    return(
         <>
         <Modal open={open} onClose={handleClose}>
<div className="modal_pop">
    <form>
        <div className="modalHeading">
            <h3>Select the file which u want to upload or create</h3>
        </div>
<div className="modalBody">
    {
        uploading ?(<p className="uploading">uploading</p>) : (
        <><input type="file" onChange={handleChange}/>
        <input type="submit" className="post__submit" onClick={handleUpload}/></>
        ) 
}
   
</div>
    </form>
</div>
         </Modal>
        <div className="sidebar">
            <div className="sidebar_btn">
                <button onClick={handleOpen}>
                <img src="https://img.icons8.com/material-outlined/24/000000/add.png"/>
                  <span>New</span>
                    </button>
            </div>
          
            <div className="sidebar_options">
                <div className="sidebar_option sidebar_option-Active">
                    <MobileScreenShareIcon/>
                    <span><b>My folder</b></span>
                </div>

            <div className="sidebar_options">
                <div className="sidebar_option">
                    <PeopleAltOutlinedIcon/>
                    <span>Share with me</span>
                </div>

                <div className="sidebar_option">
                    <DevicesIcon/>
                    <span>Computers</span>
                </div>

                <div className="sidebar_option">
                    <QueryBuilderOutlinedIcon/>
                    <span>Recent</span>
                </div>

                <div className="sidebar_option">
                    <StarBorderOutlinedIcon/>
                    <span>Starred</span>
                </div>

                <div className="sidebar_option">
                    <DeleteOutlineOutlinedIcon/>
                    <span>Trash</span>
                </div>
                <hr/>

                <div className="sidebar_option">
                    <div className="sidebar_option">
                    <CloudQueueIcon/>
                    <span>Storage</span>
                    </div>

                    <div className="progress_bar">
                        <progress size="tiny" value="50" max="100"/>
                        <span>6.45GB of 15 GB used</span>
                    </div>
                   
                </div>
            </div>
        </div>
</div>
</>
    )
}

export default Sidebar 
