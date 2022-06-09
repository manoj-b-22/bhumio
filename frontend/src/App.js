import "./App.css";
import React from "react";
import axios from 'axios';
import { connect } from "react-redux";
import store from "./Component/store";
import Button from "./Component/CustomButton";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Popper from "@mui/material/Popper";

function App({ login }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [files, setFiles] = React.useState([]);
  const [deleteFile, setDeleteFile] = React.useState([]);
  const fileRef = React.createRef();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const trigger = ()=>{
    fileRef.current.click();
  }

  const googleDrive = () => {
    if (!login) {
      setTimeout(() => {
        console.log("Connected to Google Drive");
        store.dispatch({ type: "loginSuccess" });
      }, 1000);
    } else {
      setTimeout(() => {
        console.log("Disconnected from Google Drive");
        store.dispatch({ type: "logOut" });
      }, 1000);
    }
  };

  const upload = () => {
    let formData = new FormData()
    for (let i = 0 ; i < files.length ; i++) {
      formData.append("file", files[i])
    }
    console.log(formData);
    axios({
        method: "POST",
        url: "http://localhost:5000/submit",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => {
        console.log("Posted Files");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fileUpload = (e)=>{
    let uploaded = e.target.files[0];
    if(uploaded !== undefined) setFiles(prevFiles=>[...prevFiles,uploaded])
    console.log(`${uploaded.name} file uploaded to browser`);
  }

  const selectFile = (id)=>{
    const div = document.getElementById(id);
    const color = div.style.backgroundColor;
    if (color === 'white'){
      console.log(`${div.innerHTML} is selected`);
      div.style.backgroundColor = "blue";
      setDeleteFile([...files,div.innerHTML])
    }
    else{
      console.log(`${div.innerHTML} is disselected`);
      div.style.backgroundColor = "white";
      setDeleteFile(files.filter((f)=> f.name !== div.innerHTML))
    }
  }

  const removeSelectedFiles = ()=>{
    if(deleteFile.length>0){
      setFiles(files.filter((f)=> !deleteFile.includes(f.name)));
      console.log('Removed Selected Files');
    }
    setDeleteFile([]);
  }

  return (
    <div className="App">
      <h1>BHUMIO INC</h1>
      <div className="main_container">
        <input type='file' ref={fileRef} multiple onChange={fileUpload} />
        <Box
          sx={{ width: "100%" }}
          display="flex"
          justifyContent="space-between"
        >
          <Button
            color={"primary"}
            text={login ? "Logout - Google Drive" : "Connect to Google Drive"}
            onClickFunc={googleDrive}
          />
          &nbsp; &nbsp;
          <Popper
            open={open}
            anchorEl={anchorEl}
            placement={placement}
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    color={"primary"}
                    text={'Browse this computer'}
                    icon={"laptop"}
                    onClickFunc={trigger}
                  />
                  <Button
                    color={"primary"}
                    text={"Browse Google Drive"}
                    icon={"cloud"}
                  />
                </Box>
              </Fade>
            )}
          </Popper>
          <Button
            color={"primary"}
            onClickFunc={handleClick("top-start")}
            text={"Add Attachment"}
            icon={"attach"}
          />
        </Box>
        <p className="heading">Selected file ...</p>
        <div className="selected">
          {files.map((f,i) => 
            <div key={i} id={i} style={{backgroundColor:'white'}} onClick={()=>selectFile(i)} className="file">{f.name}</div>
          )}
        </div>
        <Box
          sx={{ width: "100%" }}
          display="flex"
          justifyContent="space-between"
        >
          <Button color={"primary"} text={"Remove Selected File"} onClickFunc={removeSelectedFiles} />
          &nbsp; &nbsp;
          <Button color={"primary"} text={"Upload Files"} onClickFunc={upload} />
        </Box>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.loginSuccess,
  };
};

export default connect(mapStateToProps)(App);