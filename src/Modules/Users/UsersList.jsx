import React, { useEffect, useState } from 'react'
import Header from '../Shared/Header'
import logo from "../../assets/header.png";
import NoData from '../Shared/NoData';
import { axiosInstance, USERS_URLS } from '../../urls';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../Shared/DeleteConfirmation";

export default function UsersList() {
    const [Users, setUsers] = useState([]);

     const [show, setShow] = useState(false);
      const [userID, setuserid] = useState(0);
      const handleClose = () => setShow(false);
      const handleShow = (id) => {
        setuserid(id);
        setShow(true);
      };


        const [viewUser, setViewUser] = useState(null);
        const [showView, setShowView] = useState(false);
      
        const handleView = (user) => {
          setViewUser(user);
          setShowView(true);
        };
      
        const handleCloseView = () => {
          setViewUser(null);
          setShowView(false);
        };
    const getAllusers = async (pageSize,pageNumber) => {
        try {
          let response = await axiosInstance.get(USERS_URLS.GET_USERS, {
            params: { pageSize, pageNumber },
          });
          console.log(response);
          setUsers(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
          getAllusers(3,1);
        }, []);

         const deleteUser = async () => {
            try {
              let response = await axiosInstance.delete(
        USERS_URLS.DELETE_USERS(userID)  
              );
              console.log(response);
              handleClose();
              getAllusers();
            } catch (error) {
              console.log(error);
            }
          };

      
  return (
    <div>
            <Header
              imgPath={logo}
              title={"Users List"}
              description={
                "You can now add your items that any user can order it from the Application and you can edit"
              }
            />

        <Modal show={showView} onHide={handleCloseView}>
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {viewUser && (
              <>
                <p>
                  <strong>userName:</strong> {viewUser.userName}
                </p>
                <p>
                  <strong>country:</strong> {viewUser.country}
                </p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseView}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
               <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <DeleteConfirmation deleteItem={"User"} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={deleteUser}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
                  <div className="title  d-flex justify-content-between p-4 align-items-center">
        <div className="d-flex  flex-column">
        <h3 >Users Table Details</h3>
        <p>You can check all details</p>
        </div>

      </div>
      
         <div
                style={{
                  maxHeight: "calc(100vh - 450px)", // adjust based on your header/footer height
                  overflowY: "auto",
                  width:"100%"
                }}
              >
                <table className=" font-poppins fs-6 text-center table table-striped Tablemain ">
                  <thead className="cols-table rounded-3 my-2">
                 <td>{"userName"}</td>
                          <td>{"country"}</td>
                          <td>{"email"}</td>
                          <td>{"phoneNumber"}</td>
                          <td>{"Actions"}</td>
                  </thead>
                  <tbody className={`cols-table   w-100 text-center`}>
                    {Users.length > 0 ? (
                      Users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.userName}</td>
                          <td>{user.country}</td>
                          <td>{user.email}</td>
                          <td>{user.phoneNumber}</td>
                          <td>
                            <i
                              className="bi bi-eye cursor-pointer"
                              onClick={() => handleView(user)}
                              aria-hidden="true"
                            ></i>
                            <i
                              onClick={() => handleShow(user.id)}
                              className="bi bi-trash text-danger cursor-pointer"
                              aria-hidden="true"
                            ></i>
                          </td>
                        </tr>
                      ))
                    ) : (
                       <tr>
            <td colSpan={3}>
              <NoData />
            </td>
          </tr>
                    )}
                  </tbody>
                </table>
              </div>
    </div>
  )
}
