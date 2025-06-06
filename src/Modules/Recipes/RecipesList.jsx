import React, { useEffect, useState } from "react";
import logo from "../../assets/header.png";
import Header from "../Shared/Header";
import { axiosInstance, ImageURL, RECEPIE_URLS } from "../../urls";
import NoData from "../Shared/NoData";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../Shared/DeleteConfirmation";
import { toast } from "react-toastify";

export default function RecipesList() {
  const [viewRecipe, setViewRecipe] = useState(null);
  const [showView, setShowView] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleView = (category) => {
    setViewRecipe(category);
    setShowView(true);
  };

  const handleCloseView = () => {
    setViewRecipe(null);
    setShowView(false);
  };
  const [show, setShow] = useState(false);
  const [recID, setRecid] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setRecid(id);
    setShow(true);
  };
  const [Recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const getAllRecipes = async (pageSize, pageNumber) => {
    try {
      setLoading(true);
      let response = await axiosInstance.get(RECEPIE_URLS.GET_RECEPIES, {
        params: { pageSize, pageNumber },
      });
      console.log(response);
      setRecipes(response.data.data);
          setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const deleteRecipe = async () => {
    try {
      let response = await axiosInstance.delete(
        RECEPIE_URLS.DELETE_RECEPIE(recID)
      );
      console.log(response.data);
      toast.success("deleted sucess");
      handleClose();
      getAllRecipes(5, 1);
    } catch (error) {
      console.log(error);
      toast.success(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllRecipes(3, 1);
  }, []);

  return (
    <div>
      <Header
        imgPath={logo}
        title={"Recipes Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <div className="title  d-flex justify-content-between p-4 align-items-center">
        <div className="d-flex flex-column">
          <h3>Recipe Table Details</h3>
          <p>You can check all details</p>
        </div>
        <button
          className="btn py-3 btn-success"
          onClick={() => navigate("/dashboard/recipe-data")}
        >
          Add new Item
        </button>
      </div>
      <Modal show={showView} onHide={handleCloseView}>
        <Modal.Header closeButton>
          <Modal.Title>Category Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewRecipe && (
            <div className="d-flex justify-content-center align-items-center flex-column">
              <p>
                <strong>Name:</strong> {viewRecipe.name}
              </p>
              <img
                className="rounded ImagSize"
                src={ImageURL + viewRecipe.imagePath}
              />
              <p>
                <strong>description:</strong> {viewRecipe.description}
              </p>
              <p>
                <strong>tag:</strong> {viewRecipe.tag.name}
              </p>
              <p>
                <strong>category name:</strong> {viewRecipe.category[0].name}
              </p>
            </div>
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
          <DeleteConfirmation deleteItem={"Recipe"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteRecipe}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        style={{
          maxHeight: "calc(100vh - 450px)", // adjust based on your header/footer height
          overflowY: "auto",
          width: "100%",
        }}
      >
      {loading ? (
  <div className="w-100 d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
    <div
      className="spinner-border text-success"
      style={{ width: "4rem", height: "4rem" }}
      role="status"
    ></div>
  </div>
) : (
  <table className="w-100 font-poppins fs-6 text-center table table-striped Tablemain">
    <thead className="cols-table rounded-3 my-2">
      <tr>
        <th>Item Name</th>
        <th>Image</th>
        <th>Description</th>
        <th>Tag</th>
        <th>Category</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {Recipes.length > 0 ? (
        Recipes.map((item) => (
          <tr className="text-center" key={item.id}>
            <td>{item.name}</td>
            <td>
              {item.imagePath ? (
                <img
                  className="rounded ImagSize"
                  src={ImageURL + item.imagePath}
                  alt={item.name}
                />
              ) : (
                <i
                  className="bi bi-image text-muted fs-1"
                  style={{
                    width: "100px",
                    height: "100px",
                    lineHeight: "100px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    display: "inline-block",
                  }}
                ></i>
              )}
            </td>
            <td>{item.description}</td>
            <td>{item.tag.name}</td>
            <td>{item.category[0].name}</td>
            <td>
              <i
                className="bi bi-eye cursor-pointer"
                onClick={() => handleView(item)}
              ></i>
              <i
                onClick={() => navigate(`/dashboard/recipe-data/${item.id}`)}
                className="bi bi-pencil-square mx-2 text-warning cursor-pointer"
              ></i>
              <i
                onClick={() => handleShow(item.id)}
                className="bi bi-trash text-danger cursor-pointer"
              ></i>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6}>
            <NoData />
          </td>
        </tr>
      )}
    </tbody>
  </table>
)}

      </div>
    </div>
  );
}
