import React, { useEffect, useState } from "react";
import Header from "../Shared/Header";
import logo from "../../assets/header.png";
import { axiosInstance, FAVS_URLS, ImageURL } from "../../urls";
import NoData from "../Shared/NoData";
export default function FavList() {
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const recipesPerPage = 3;

  // Calculate pagination
  const totalPages = Math.ceil(filteredFavorites.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const currentRecipes = filteredFavorites.slice(
    startIndex,
    startIndex + recipesPerPage
  );

  const getAlluserRecipes = async () => {
    try {
      setLoading(true);
      let response = await axiosInstance.get(FAVS_URLS.GET_RECEPIES);
      console.log(response);
      setFavorites(response.data.data);
      setFilteredFavorites(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const toggleFavorite = (recipe) => {
    setRecipeToDelete(recipe);
    setShowDeleteModal(true);
  };

  const applyFilters = (favoritesToFilter = favorites) => {
    let filtered = [...favoritesToFilter];

    // Filter by name
    if (nameFilter.trim()) {
      filtered = filtered.filter((fav) =>
        fav.recipe.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    // Filter by price
    if (priceFilter.trim()) {
      const maxPrice = Number.parseFloat(priceFilter);
      if (!isNaN(maxPrice)) {
        filtered = filtered.filter((fav) => fav.recipe.price <= maxPrice);
      }
    }

    // Filter by category
    if (categoryFilter.trim()) {
      filtered = filtered.filter((fav) =>
        fav.recipe.category.some((cat) =>
          cat.name.toLowerCase().includes(categoryFilter.toLowerCase())
        )
      );
    }

    setFilteredFavorites(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = () => {
    applyFilters();
  };

  const clearFilters = () => {
    setNameFilter("");
    setPriceFilter("");
    setCategoryFilter("");
    setFilteredFavorites(favorites);
    setCurrentPage(1);
  };

  useEffect(() => {
    getAlluserRecipes();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [nameFilter, priceFilter, categoryFilter]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Actual delete function
  const confirmDelete = async () => {
    if (!recipeToDelete) return;

    try {
      setDeleting(true);
      // Call API to remove from favorites
      await axiosInstance.delete(
        `${FAVS_URLS.DELETE_RECEPIE(recipeToDelete.id)}`
      );

      // Remove from local state
      const updatedFavorites = favorites.filter(
        (fav) => fav.id !== recipeToDelete.id
      );
      setFavorites(updatedFavorites);
      applyFilters(updatedFavorites);

      // Close modal and reset state
      setShowDeleteModal(false);
      setRecipeToDelete(null);
      setDeleting(false);
    } catch (error) {
      console.log(error);
      setDeleting(false);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setRecipeToDelete(null);
  };
  return (
    <div>
      <Header
        imgPath={logo}
        title={"Favorite Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />

      <div className="container  w-full">
        <div className="row mb-3 mx-auto w-full justify-content-center align-items-center  g-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name..."
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Enter max price..."
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by category..."
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button
              className="btn btn-outline-secondary me-2"
              onClick={clearFilters}
            >
              <i className="bi bi-x-circle"></i> Clear
            </button>
          </div>
        </div>

        {/* Recipe Cards */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4 ">
            {filteredFavorites.length === 0 ? (
              <NoData />
            ) : (
              currentRecipes.map((recipe) => (
                <div key={recipe.id} className="col-md-4">
                  <div className="card h-100 shadow-sm">
                    <div className="position-relative">
                      <img
                        src={ recipe.recipe.imagePath ? 
                          ImageURL + recipe.recipe.imagePath :
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO5kCepNdhZvDKJtmPAIWnloSdTal7N1CQaA&s"
                        }
                        className="card-img-top"
                        alt={recipe.title}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <button
                        className="btn position-absolute top-0 end-0 m-2 p-2"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "none",
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                        }}
                        onClick={() => toggleFavorite(recipe)}
                      >
                        <i
                          className={`bi bi-heart-fill text-danger`}
                          style={{ fontSize: "1.2rem" }}
                        ></i>
                      </button>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{recipe.recipe.name}</h5>
                      <p className="card-text flex-grow-1">
                        {recipe.recipe.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="row mt-2">
            <div className="col-12">
              <nav aria-label="Recipe pagination">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                  </li>

                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <li
                        key={page}
                        className={`page-item ${
                          currentPage === page ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => goToPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    );
                  })}

                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}

        {/* Page Info */}
        {filteredFavorites.length > 0 && (
          <div className="row my-2">
            <div className="col-12 text-center">
              <small className="text-muted">
                Showing {startIndex + 1}-
                {Math.min(
                  startIndex + recipesPerPage,
                  filteredFavorites.length
                )}{" "}
                of {filteredFavorites.length} recipes
              </small>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-exclamation-triangle text-warning me-2"></i>
                 {deleting ? "Removing" :  "Remove from Favorites" }
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelDelete}
                  disabled={deleting}
                ></button>
              </div>
              <div className="modal-body">
                <div className="text-center">
                  {recipeToDelete && (
                    <>
                      {recipeToDelete.recipe.imagePath ? (
                        <img
                          src={
                            ImageURL + recipeToDelete.recipe.imagePath ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO5kCepNdhZvDKJtmPAIWnloSdTal7N1CQaA&s"
                          }
                          alt={recipeToDelete.recipe.name}
                          className="img-fluid rounded mb-3"
                          style={{ maxHeight: "150px", objectFit: "cover" }}
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
                      <h6 className="mb-3">{recipeToDelete.recipe.name}</h6>
                    </>
                  )}
                  <p className="text-muted">
                    Are you sure you want to remove this recipe from your
                    favorites? This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelDelete}
                  disabled={deleting}
                >
                  <i className="bi bi-x-circle me-1"></i>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Removing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-heart-break me-1"></i>
                      Remove from Favorites
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
