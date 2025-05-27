import React, { useEffect, useState } from "react";
import Header from "../Shared/Header";
import logo from "../../assets/header.png";
import axios from "axios";
import NoData from "../Shared/NoData";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../Shared/DeleteConfirmation";
import { useForm } from "react-hook-form";
import { axiosInstance, CATEGORIES_URLS } from "../../urls";
export default function CategoriesList() {
  let {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [catID, setCatid] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCatid(id);
    setShow(true);
  };
  const [showAdd, setShowAdd] = useState(false);

  const handleAdd = () => setShowAdd(false);
  const handleShowAdd = () => {
    setIsEdit(false);
    reset(); // clear form

    setShowAdd(true);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState(null);

  const getAllcategories = async (pageSize,pageNumber) => {
    try {
      let response = await axiosInstance.get(CATEGORIES_URLS.GET_CATEGORIES, {
        params: { pageSize, pageNumber },
      });
      console.log(response);
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [viewCategory, setViewCategory] = useState(null);
  const [showView, setShowView] = useState(false);

  const handleView = (category) => {
    setViewCategory(category);
    setShowView(true);
  };

  const handleCloseView = () => {
    setViewCategory(null);
    setShowView(false);
  };
  const deleteCategory = async () => {
    try {
      let response = await axiosInstance.delete(
CATEGORIES_URLS.DELETE_CATEGORY(catID)  
      );
      console.log(response);
      handleClose();
      getAllcategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowEdit = (category) => {
    setIsEdit(true);
    setEditID(category.id);
    reset({ name: category.name }); // prefill form
    setShowAdd(true);
  };

  const handleAddEdit = async (data) => {
    try {
      if (isEdit) {
        // Edit mode
        const response = await axiosInstance.put(
          CATEGORIES_URLS.DELETE_CATEGORY(editID),
          data
        );
        console.log("Edit success", response);
      } else {
        // Add mode
        const response = await axiosInstance.post(
          CATEGORIES_URLS.GET_CATEGORIES,
          data
        );
        console.log("Add success", response);
      }

      handleAdd(); // hide modal
      getAllcategories(5,1); // refresh list
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllcategories(3,1);
  }, []);

  return (
    <div className="w-100">
      <Header
        imgPath={logo}
        title={"Categories Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <DeleteConfirmation deleteItem={"Category"} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={deleteCategory}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showAdd} onHide={handleAdd}>
          <Modal.Header closeButton>
            {" "}
            {isEdit ? "Edit Category" : "Add Category"}
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(handleAddEdit)}>
              <div className=" input-group mb-4">
                <input
                  type="text"
                  placeholder="Enter name"
                  className="form-control bg-light py-3 border-0 shadow-none"
                  {...register("name", {
                    required: "name is required",
                  })}
                />
              </div>
              <Button type="submit" variant="success" className="float-end">
                {isEdit ? "Update" : "Save"}
              </Button>
              {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
            </form>
          </Modal.Body>
        </Modal>

        <Modal show={showView} onHide={handleCloseView}>
          <Modal.Header closeButton>
            <Modal.Title>Category Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {viewCategory && (
              <>
                <p>
                  <strong>Name:</strong> {viewCategory.name}
                </p>
                <p>
                  <strong>Created At:</strong> {viewCategory.creationDate}
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
      </>
      <div className="title  d-flex justify-content-between p-4 align-items-center">
        <div className="d-flex flex-column">
        <h3 >Categories Table Details</h3>
        <p>You can check all details</p>
        </div>
        <button onClick={handleShowAdd} className="btn py-3 btn-success">
          Add new category
        </button>
      </div>
      <div
        style={{
          maxHeight: "calc(100vh - 450px)", // adjust based on your header/footer height
          overflowY: "auto",
          width:"100%"
        }}
      >
        <table className=" text-center table table-striped Tablemain  ">
          <thead className="cols-table rounded-3 my-2">
            <th>Name</th>
            <th>Creation Date</th>
            <th>Actions</th>
          </thead>
          <tbody className={`w-100 text-center`}>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.creationDate}</td>
                  <td>
                    <i
                      className="bi bi-eye cursor-pointer"
                      onClick={() => handleView(category)}
                      aria-hidden="true"
                    ></i>
                    <i
                      onClick={() => handleShowEdit(category)}
                      className="bi bi-pencil-square mx-2 text-warning cursor-pointer"
                      aria-hidden="true"
                    ></i>
                    <i
                      onClick={() => handleShow(category.id)}
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
  );
}
