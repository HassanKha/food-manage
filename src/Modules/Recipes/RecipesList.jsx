import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/header.png";
import Header from "../Shared/Header";
import {
  axiosInstance,
  CATEGORIES_URLS,
  FAVS_URLS,
  ImageURL,
  RECEPIE_URLS,
  TAGS_URLS,
} from "../../urls";
import NoData from "../Shared/NoData";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../Shared/DeleteConfirmation";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

export default function RecipesList() {
  const [Tags, setTags] = useState([]);
  const { LoggedData } = useContext(AuthContext);
  const [Categories, setCategories] = useState([]);
  const [viewRecipe, setViewRecipe] = useState(null);
  const [showView, setShowView] = useState(false);
  const [loading, setLoading] = useState(false);
    const [Favloading, setFavLoading] = useState(false);
  const [Pages, setArrayOfPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
  const getAllRecipes = async (
    pageSize,
    pageNumber,
    name,
    tagId,
    categoryId
  ) => {
    try {
      setLoading(true);
      let response = await axiosInstance.get(RECEPIE_URLS.GET_RECEPIES, {
        params: { pageSize, pageNumber, name, tagId, categoryId },
      });
      console.log(response);
      setRecipes(response.data.data);
      setLoading(false);
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, index) => index + 1)
      );
      setCurrentPage(pageNumber);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const [favorites, setFavorites] = useState([]);
  const deleteRecipe = async () => {
    try {
      let response = await axiosInstance.delete(
        RECEPIE_URLS.DELETE_RECEPIE(recID)
      );
      console.log(response.data);
      toast.success("deleted sucess");
      handleClose();
      getAllRecipes(2, 1);
    } catch (error) {
      console.log(error);
      toast.success(error.response?.data?.message);
    }
  };

   const getAlluserRecipes = async () => {
      try {
   
        let response = await axiosInstance.get(FAVS_URLS.GET_RECEPIES);
        console.log(response);
        setFavorites(response.data.data);
      

      } catch (error) {
    
        console.log(error);
      }
    };

  const [inputName, setInput] = useState("");


  useEffect(() => {
    getAllRecipes(2, 1, "");
    getAlltags();
    getAllCategories(10, 1);
    if (LoggedData?.userGroup === "SystemUser") {
      getAlluserRecipes()
    }
  }, []);

  let getAlltags = async () => {
    try {
      const response = await axiosInstance.get(TAGS_URLS.GET_TAGS);

      console.log(response.data);
      setTags(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  let getAllCategories = async () => {
    try {
      const response = await axiosInstance.get(CATEGORIES_URLS.GET_CATEGORIES);

      console.log(response.data);
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [inputCat, setInputCat] = useState("");
  const [inputTag, setInputTag] = useState("");
  const GetTag = (e) => {
    setInputTag(e.target.value);
    getAllRecipes(2, 1, inputName, e.target.value, inputCat);
  };

  const GetCat = (e) => {
    setInputCat(e.target.value);
    getAllRecipes(2, 1, inputName, inputTag, e.target.value);
  };

  const SearchFor = (e) => {
    setInput(e.target.value);
    getAllRecipes(2, 1, e.target.value, inputTag, inputCat);
  };

  const AddtoFav = async (recipeId) => {
    console.log(recipeId)
    try {
     setFavLoading(true);
      let response = await axiosInstance.post(FAVS_URLS.CREATE_RECEPIE, {recipeId} );
      console.log(response);
        toast.success("added to favorites successfully");
        setFavLoading(false);
    } catch (error) {
      console.log(error);
      setFavLoading(false);
        toast.success(error.response?.data?.message);
    }
  };
const isFavorite = (recipe) => {
  return favorites.some(fav => fav.recipe.id === recipe.id);
};
  
  return (
    <div>
      <Header
        imgPath={logo}
        title={"Recipes Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <div className="title  d-flex justify-content-between p-3 align-items-center">
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
              {LoggedData?.userGroup !== "SystemUser" ? (
                ""
              ) : ( 
                <button
                  className="btn btn-success d-flex justify-content-center align-items-center gap-2 p-2 text-center rounded m-auto"
                  onClick={() => AddtoFav(viewRecipe.id)}
                  disabled={Favloading ? true : isFavorite(viewRecipe) ? true : false}

                >
                  {
                    Favloading ? "adding..."  : isFavorite(viewRecipe) ? "Added to Favorites" : "Add to Favorites"
                  }
             { isFavorite(viewRecipe) &&      <i
                          className={`bi bi-heart-fill text-danger`}
                          style={{ fontSize: "1.2rem" }}
                        ></i> }
                </button>
              )}
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
        className="row mb-2 d-flex
      "
      >
        <div className="col-md-6">
          <input
            onChange={SearchFor}
            type="text"
            placeholder="Search for ..."
            className="form-control  mx-2 rounded-2 bg-light py-3 border-0 shadow-none"
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control   mx-2 rounded-2 bg-light py-3 border-0 shadow-none"
            onChange={GetTag}
          >
            <option value="">Select Tag</option>
            {Tags.map((tag) => (
              <option value={tag.id}>{tag.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            onChange={GetCat}
            className="form-control  mx-2 rounded-2 bg-light py-3 border-0 shadow-none"
          >
            <option value="">Select Category</option>
            {Categories.length > 0 &&
              Categories.map((cat) => (
                <option value={cat.id}>{cat.name}</option>
              ))}
          </select>
        </div>
      </div>

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
                  <tr className="text-center h-100 w-100" key={item.id}>
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
                    <td className="  ">
                      <i
                        className="bi mx-1 bi-eye cursor-pointer"
                        onClick={() => handleView(item)}
                      ></i>
                      {LoggedData?.userGroup === "SystemUser" && isFavorite(item)
                      && 
                           <i
                          className={`bi mx-1 bi-heart-fill text-danger`}
                     
                        ></i>
                      }
                      {LoggedData?.userGroup !== "SystemUser" ? (
                        <>
                          <i
                            onClick={() =>
                              navigate(`/dashboard/recipe-data/${item.id}`)
                            }
                            className="bi mx-1 bi-pencil-square  text-warning cursor-pointer"
                          ></i>
                          <i
                            onClick={() => handleShow(item.id)}
                            className="bi mx-1 bi-trash text-danger cursor-pointer"
                          ></i>
                        </>
                      ) : (
                        ""
                      )}
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
        {Recipes.length !== 0 && (
          <nav className="mx-2" aria-label="Page navigation example">
            <ul class="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => {
                    if (currentPage > 1) {
                      getAllRecipes(2, currentPage - 1);
                    }
                  }}
                >
                  Previous
                </button>
              </li>

              {Pages.filter(
                (page) =>
                  page === 1 ||
                  page === Pages.length ||
                  Math.abs(page - currentPage) <= 2
              ).map((page, index, arr) => {
                const prevPage = arr[index - 1];
                const isEllipsis = prevPage && page - prevPage > 1;

                return (
                  <React.Fragment key={page}>
                    {isEllipsis && (
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    )}
                    <li
                      className={`page-item ${
                        currentPage === page ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => getAllRecipes(2, page)}
                      >
                        {page}
                      </button>
                    </li>
                  </React.Fragment>
                );
              })}

              <li
                className={`page-item ${
                  currentPage === Pages.length ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => {
                    if (currentPage < Pages.length) {
                      getAllRecipes(2, currentPage + 1);
                    }
                  }}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
