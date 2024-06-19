const apiUrl = "http://localhost:5000/api";

export const addData = async (data) => {
  try {
    const response = await fetch(`${apiUrl}/add-data`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Data added successfully:", result);
    return result;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error;
  }
};

export const deleteData = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/delete-data/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({id:id})
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Data deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export const getData = async () => {
  try {
    const response = await fetch(`${apiUrl}/get-data`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Data fetch succesfully:", data);
    return data;    
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const updateData = async (id,updateData) => {
    try {
      const response = await fetch(`${apiUrl}/update-data/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({id,updateData:updateData})
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Update data successfully:", result);
      return result;
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
}