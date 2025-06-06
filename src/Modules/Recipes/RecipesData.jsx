import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance, CATEGORIES_URLS, RECEPIE_URLS, TAGS_URLS } from "../../urls";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
export default function RecipesData() {
const { id } = useParams();

  const navigate = useNavigate()
  const [Tags, setTags] = useState([]);
  const [Categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
     setValue,
     reset,
    formState: { errors, isSubmitting },
  } = useForm();
const [loading,setLoading] = useState(false)

  const appendToFormData = (data) => {
    const formData = new FormData(); 
    console.log(data)
formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append("tagId", data.tagId);
  formData.append("categoriesIds", data.categoriesIds); // assumes single category, not array

  // Add image only if provided
  if (data.recipeImage && data.recipeImage[0]) {
    formData.append("recipeImage", data.recipeImage[0]);
  }
    return formData
  }

  const onSubmit = async (data) => {
    let recipeData = appendToFormData(data)
    
console.log(recipeData)
    try {
          if (id) {
      let  response = await axiosInstance.put(RECEPIE_URLS.DELETE_RECEPIE(id), recipeData);
        console.log(response,"jjjh");
                    toast.success(response.data.message);
 navigate("/dashboard/recipes")
      } else {
   let     response = await axiosInstance.post(RECEPIE_URLS.CREATE_RECEPIE, recipeData);
          console.log(response,"jjjh");
                      toast.success(response.data.message);
 navigate("/dashboard/recipes")
      }
       

        } catch (error) {
                toast.error(error.response?.data?.message || "create failed");
          
        }
  };

   const getRecipeById = async (id) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(RECEPIE_URLS.DELETE_RECEPIE(id));
      const recipe = res.data;
console.log(res.data,'h')
      // Prefill form
      setValue("name", recipe.name);
      setValue("price", recipe.price);
      setValue("description", recipe.description);
      setValue("categoriesIds", recipe.category[0].id); // if multiple, use array
      setValue("tagId", recipe.tag.id);
setLoading(false);
        reset({
      name: recipe.name,
      price: recipe.price,
      description: recipe.description,
      categoriesIds: recipe.category[0]?.id || "", // or array if multiple
      tagId: recipe.tag?.id || "",
    });

    } catch (error) {
      setLoading(false);
      toast.error("Failed to load recipe");
    }
  };

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

   useEffect(() => {
    getAlltags();
    getAllCategories();
    if (id) {
      getRecipeById(id); // 🟡 Fetch data if in edit mode
    }
  }, [id]);

  return (
    <>

      <div className="container recipe-header mt-2 mb-5 rounded-2 p-4">
        <div className="row">
          <div className="col-md-8 d-flex align-items-center">
            <div>
              <h5>Fill the Recipes !</h5>
              <p>
                you can now fill the meals easily using the table and form ,
                click here and sill it with the table !
              </p>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-end align-items-center">
            <button onClick={()=> navigate("/dashboard/recipes")
} className="btn btn-success">
              All Recipes{" "}
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="w-75 m-auto p-2">
        {
          loading ? <div className="w-100 d-flex h-100 mt-5 justify-content-center align-items-center"> <div
  className="spinner-border text-success"
  style={{ width: "5rem", height: "5rem" }}
  role="status"
></div></div> : 
  <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Recipe Name"
            {...register("name", { required: "Recipe name is required" })}
          />
          {errors.name && (
            <div className="text-danger">{errors.name.message}</div>
          )}

          <select
            className="form-control my-2"
            {...register("tagId", { required: "field is required" })}
          >
            <option value="">Select Tag</option>
            {Tags.map((tag) => (
              <option value={tag.id}>{tag.name}</option>
            ))}
          </select>

          {errors.tagId && (
            <div className="text-danger">{errors.tagId.message}</div>
          )}

         <input
  type="number"
  min="0"
  step="any"
  className={`form-control ${errors.price ? "is-invalid" : ""}`}
  placeholder="Recipe price"
  {...register("price", {
    required: "Recipe price is required",
    min: {
      value: 0.01,
      message: "Price must be a positive number",
    },
  })}
/>
{errors.price && (
  <div className="text-danger">{errors.price.message}</div>
)}

          <select
            className="form-control my-2"
            {...register("categoriesIds", { required: "field is required" })}
          >
              <option value="">Select Category</option>
            {Categories.length > 0 &&
              Categories.map((cat) => (
                <option value={cat.id}>{cat.name}</option>
              ))}
          </select>
          {errors.categoriesIds && (
            <div className="text-danger">{errors.categoriesIds.message}</div>
          )}
          <textarea
            type="text"
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            placeholder="Recipe description "
            {...register("description", {
              required: "Recipe description  is required",
            })}
          />
          {errors.description && (
            <div className="text-danger">{errors.description.message}</div>
          )}
          <input
            type="file"
            {...register("recipeImage")}
            className="form-control my-2"
          />
          <div className="btns d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-success mx-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
            <button className="btn btn-outline-success" onClick={()=>navigate("/dashboard/recipes")} disabled={isSubmitting}>
              Cancel
            </button>
          </div>
        </form>
        }
     
      </div>
    </>
  );
}
