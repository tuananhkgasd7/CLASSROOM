import React, {useState, useEffect}  from "react";
import { Login,UserDetail,VerifyClass,ClassDetail,ClassInfo,Register, Classes,ClassExercise,Grade, Assign,LoginAdmin,RegisterAdmin, Verify,ManageAdmin,ManageUser,ManageClass, AdminDetail} from "./components";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import classroomAPI from "./api/classroomAPI";
import assignmentAPI from "./api/assignmentAPI";
import userAPI from "./api/userAPI";
function App() {
  const [classesList, setClassesList] = useState([]);
  const [assignList, setAssignList] = useState([]);
  const [adminList, setAdminList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [classList, setClassList] = useState([]);
  const token = JSON.parse(localStorage.getItem("user") || "[]");
  useEffect(() => {
    const fetchClassesList = async () => {
      try {
        const classesResponse = await classroomAPI.getAllClasses(token.id);
        if(classesResponse)
        {
        setClassesList(classesResponse.data);
        }
      } catch (error) {
        console.log("Fail to fetch", error);
      }
    };
    fetchClassesList();
  }, [token.id]);

  useEffect(() => {
    const fetchClassesList = async () => {
      try {
        const userResponse = await userAPI.getUserList();
        setUserList(userResponse.data);
        }
      catch (error) {
        console.log("Fail to fetch", error);
      }
    };
    fetchClassesList();
  }, []);

  useEffect(() => {
    const fetchClassesList = async () => {
      try {
        const classResponse = await userAPI.getClassList();
        setClassList(classResponse.data);
        }
      catch (error) {
        console.log("Fail to fetch", error);
      }
    };
    fetchClassesList();
  }, []);

  useEffect(() => {
    const fetchClassesList = async () => {
      try {
        const adminResponse = await userAPI.getAdminList();
        setAdminList(adminResponse.data);
        }
      catch (error) {
        console.log("Fail to fetch", error);
      }
    };
    fetchClassesList();
  }, []);

  useEffect(() => {
    const fetchClassesList = async () => {
      try {
        const assignResponse = await assignmentAPI.getAllAssignment();
        setAssignList(assignResponse.data);
        }
      catch (error) {
        console.log("Fail to fetch", error);
      }
    };
    fetchClassesList();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/> 
        <Route path='/classes' element={<Classes c_list={classesList}/>}/>  
        <Route path='/admin' element={<LoginAdmin/>}/> 
        <Route path='/admin/manage/admin' element={<ManageAdmin/>}/> 
        <Route path='/admin/manage/user' element={<ManageUser/>}/> 
        <Route path='/admin/manage/class' element={<ManageClass/>}/> 
        <Route path='/verify' element={<Verify/>}/> 
        <Route path='/verify/class' element={<VerifyClass/>}/> 
        <Route path="/admin/register" element={<RegisterAdmin/>}/> 

        {adminList.map((admin) => 
          <Route path={"/admin/manage/admin/" + admin.id} element={ 
            <div><AdminDetail items={admin}/></div>
          }></Route>
        )}
        {userList.map((user) => 
          <Route path={"/admin/manage/user/" + user.id} element={ 
            <div><UserDetail items={user}/></div>
          }></Route>
        )}
        {classList.map((classAdmin) => 
          <Route path={"/admin/manage/class/" + classAdmin.id} element={ 
            <div><ClassDetail items={classAdmin}/></div>
          }></Route>
        )}
        {classesList.map((classroom) => 
          <Route path={"/" + classroom.id} element={<div><ClassInfo items={classroom}/></div>}></Route>
        )}
        {classesList.map((classroom) => 
          <Route path={"/" + classroom.id + "/excercises"} element={ 
            <div><ClassExercise items={classroom}/></div>
          }></Route>
        )}
        {classesList.map((classroom) => 
          <Route path={"/" + classroom.id + "/grade"} element={ 
            <div>
                <Grade items={classroom}/>
            </div>
          }></Route>
        )}
        {assignList.map((assign) => 
          <Route path={"/assign/" + assign.id} element={ 
            <div><Assign items={assign}/></div>
          }></Route>
        )}
      </Routes>
    </Router>
  );
}
export default App;
