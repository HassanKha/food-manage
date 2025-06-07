import React, { useEffect, useState } from "react";
import Header from "../Shared/Header";
import logo from "../../assets/header.png";
import NoData from "../Shared/NoData";
import { axiosInstance, USERS_URLS } from "../../urls";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../Shared/DeleteConfirmation";

export default function UsersList() {
  const [Users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [userID, setuserid] = useState(0);
   const [Pages, setArrayOfPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
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
  const getAllusers = async (pageSize, pageNumber,userName) => {
    try {
      setLoading(true);
      let response = await axiosInstance.get(USERS_URLS.GET_USERS, {
        params: { pageSize, pageNumber,userName },
      });
      console.log(response);
      setUsers(response.data.data);
      setLoading(false);
           setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_, index) => index + 1));
       setCurrentPage(pageNumber); 
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllusers(2, 1,"");
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

  const SearchFor = (e) => {

getAllusers(2,1,e.target.value);

}

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
          <h3>Users Table Details</h3>
          <p>You can check all details</p>
        </div>
      </div>
    <input
         onChange={SearchFor}
                  type="text"
                  placeholder="Search for ..."
                  className="form-control mx-2 rounded-2  bg-light py-3 border-0 shadow-none"
                   />
      <div
        style={{
          maxHeight: "calc(100vh - 450px)", // adjust based on your header/footer height
          overflowY: "auto",
          width: "100%",
        }}
      >
        {loading ? (
          <div
            className="w-100 d-flex justify-content-center align-items-center"
            style={{ minHeight: "300px" }}
          >
            <div
              className="spinner-border text-success"
              style={{ width: "4rem", height: "4rem" }}
              role="status"
            ></div>
          </div>
        ) : (
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
        )}
        {
          Users.length !== 0 &&
           <nav className="mx-2" aria-label="Page navigation example">
          <ul class="pagination">
         <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => {
                  if (currentPage > 1) {
                    getAllusers(2, currentPage - 1);
                  }
                }}
              >
                Previous
              </button>
            </li>
        
           {Pages.filter(page =>
              page === 1 ||
              page === Pages.length ||
              Math.abs(page - currentPage) <= 2
            ).map((page, index, arr) => {
              const prevPage = arr[index - 1];
              const isEllipsis = prevPage && page - prevPage > 1;
        
              return (
                <React.Fragment key={page}>
                  {isEllipsis && <li className="page-item disabled"><span className="page-link">...</span></li>}
                  <li className={`page-item ${currentPage === page ? "active" : ""}`}>
                    <button className="page-link" onClick={() => getAllusers(2, page)}>{page}</button>
                  </li>
                </React.Fragment>
              );
            })}
        
           <li className={`page-item ${currentPage === Pages.length ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => {
                  if (currentPage < Pages.length) {
                    getAllusers(2, currentPage + 1);
                  }
                }}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
        }
           
      </div>
    </div>
  );
}
