import React from "react";

function EditCategory() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "pending",
  });

  const [existingData, setExistingData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${server}/category`)
        .then((response) => {
          setExistingData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    };
    fetchData();
  }, []);

  const handleSubmit = (itemId) => {
    const config = { header: { "Content-Type": "application/json" } };
    axios
      .put(`${server}/category/${itemId}`, formData, config)
      .then(() => {
        console.log("data added successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log("message: " + error);
      });
  };

  const goBack = () => {
    navigate("/");
    console.log("set go back navigation");
  };
  return (
    <div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-dark" onClick={goBack}>
          Go back
        </button>
      </div>
      <h1>Product form</h1>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-row justify-content-around">
          <div>
            <label htmlFor="name">Category name: </label>
            <input type="text" id="name" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <input type="text" id="description" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="status">Status: </label>
            <input type="text" id="status" onChange={handleChange} />
          </div>
        </div>

        <div className="d-flex flex-end">
          <button className="btn btn-outline-warning rounded-pill border border-dark">
            cancel
          </button>
          &nbsp;
          <button type="submit" className="btn btn-success rounded-pill">
            save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCategory;
