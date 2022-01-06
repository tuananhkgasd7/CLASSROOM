import {Button, Menu, MenuItem} from "@material-ui/core";
import {Assignment} from "@material-ui/icons"
import {useLocalContext} from '../../context/context';
import React, {useState, useEffect}  from 'react';
import {FormEx, FormClassEx, FormConfirmDelete, Assign} from '..';
import "./ClassExercise.css";
import HeaderClass from "../Header/HeaderClass";
import assignmentAPI from "../../api/assignmentAPI";
import {Add} from '@material-ui/icons';
import Fade from '@material-ui/core/Fade';
import {Link} from 'react-router-dom';
const ClassExercise = (props) => {
  var disable = false;
  const user = JSON.parse(localStorage.getItem("user") || "[]");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClickButton = (event) => setAnchorEl2(event.currentTarget);

  const handleClose = () => setAnchorEl(null);
  const handleClose2 = () => setAnchorEl2(null);

  const {setFormExDialog, setFormClassExDialog, setFormConfirmDeleteDialog} = useLocalContext();

  const handleFormEx= () => {
    handleClose();
    setFormExDialog(true);
  };
  const handleFormClassEx = () =>{
    handleClose();
    setFormClassExDialog(true);
  };

  const handleFormDelete = () =>{
    handleClose();
    setFormConfirmDeleteDialog(true);
  };

  const [assignList, setAssignList] = useState([]);

  useEffect(() => {
    const fetchAssignList = async () => {
      try {
        const response = await assignmentAPI.getAssignmentInClass(props.items.id);
        if(response){
          setAssignList(response.data);
        };
      } catch (error) {
        console.log("Fail to fetch", error);
      }
    };
    fetchAssignList();
    if(user.roles[0] === "ROLE_TEACHER"){
      disable = true;
    };
  }, [props.items.id]);
  console.log(user.roles[0]);
  return (
    <div>
    <div className="main">
      <HeaderClass items={props.items}/>
      <div className="main__wrapper">
        <div className="main__announce">
          <div className="main__status">
            <Button disabled={disable} onClick={handleClick}>+ Create</Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={handleFormEx}>Exercise</MenuItem>
                <MenuItem onClick={handleFormClassEx}>Exam Exercise</MenuItem>   
            </Menu>
          </div>
          <div className="main__announcements">
            <div className="main__ancContent">
                  <h1>Assignments</h1>
                  <hr className="mt-2"/>
                  <div className="assign__list">
                      {assignList.map((assign) => 
                      <div key={assign.id}>
                        <div className="assign__form assign_btn"><Link to={"/assign/" + assign.id} className="assign__form"><Assignment/><span>&nbsp;{assign.assignmentTitle}</span></Link>
                          <div className="form_btn_add">
                          <Add aria-controls="fade-menu" aria-haspopup="true" onClick={handleClickButton}></Add>
                          <Menu
                            id="fade-menu"
                            anchorEl={anchorEl2}
                            keepMounted
                            open={Boolean(anchorEl2)}
                            onClose={handleClose2}
                            TransitionComponent={Fade}
                          >
                            <MenuItem onClick={handleFormDelete}>Delete</MenuItem>
                            <MenuItem onClick={handleClose2}>Change</MenuItem>
                          </Menu>
                          </div>
                          <FormConfirmDelete 
                            assign_id ={assign.id} 
                            class_id = {props.items.id}/>
                        </div>
                        <hr/>
                        </div>
                      )}
                  </div>
            </div>
          </div>
        </div>
        <FormEx items={props.items}/>
        <FormClassEx items={props.items}/>
      </div>
    </div>
    {/* <Routes>
    {assignList.map((assign) =>
      <Route path={"/"+props.items.id+"/excercises/"+assign.id} element={<Login/>}/>
    )}
    </Routes> */}
    </div>
  );
};

export default ClassExercise;