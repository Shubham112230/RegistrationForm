import React, { useEffect, useState } from "react";
import "./Login.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addData, updateData ,getData} from "../../Services/services";
// import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import state from "./Data";

const Form = () => {
  const [formData, setFormData] = useState({
    // firstName: "",
    // middleName: "",
    // lastName: "",
    // email: "",
    // contactNo: "",
    // gender: "",
    // state: "",
    // dob: "",
    // terms: false,
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    contactNo: "",
    gender: "",
    state: "",
    dob: "",
    terms: false,
  });

  const location = useLocation();

  useEffect(() => {
    const data_ = {
      
      // "firstName":location.state.First,
      // "middleName":location.state.Middle,
      // "lastName":location.state.Last,
      // "email":location.state.Email,
      // "contactNo":location.state.Contact,
      // "gender":location.state.Gender,
      // "state": location.state.State,
      // "Dob": location.state.Date
      firstName: location.state ? location.state.First : '',
      middleName: location.state ? location.state.Middle : '',
      lastName: location.state ? location.state.Last : '',
      email: location.state ? location.state.Email : '',
      contactNo: location.state ? location.state.Contact : '',
      gender: location.state ? location.state.Gender : '',
      state: location.state ? location.state.State : '',
      Dob: location.state ? location.state.Date : '',
    }
    console.log(location.state)
    setFormData({ ...data_, terms: false });
  }, [location.state]);

  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];

  const validateField = (name, value) => {
    let errorMsg = "";
    const today = new Date().toISOString().split("T")[0];

    if (name === "firstName" || name === "lastName") {
      if (!value) {
        errorMsg =
          name === "firstName"
            ? "First name is required."
            : "Last name is required.";
      } else if (!/^[A-Za-z]+$/.test(value)) {
        errorMsg =
          name === "firstName"
            ? "First name should contain only alphabets."
            : "Last name should contain only alphabets.";
      } else if (value.length < 2) {
        errorMsg =
          name === "firstName"
            ? "First name must be at least 2 characters long."
            : "Last name must be at least 2 characters long.";
      } else {
        errorMsg = "";
      }
    } else if (name === "middleName") {
      if (!/^[A-Za-z]*$/.test(value)) {
        errorMsg = "Middle name should contain only alphabets.";
      } else {
        errorMsg = "";
      }
    } else if (name === "email") {
      if (!/^\S+@\S{3,}\.\S{2,}$/.test(value)) {
        errorMsg = "Email is not valid.";
      } else {
        errorMsg = "";
      }
    } else if (name === "contactNo") {
      if (!/^[0-9]{10}$/.test(value)) {
        errorMsg = "Contact number should be 10 digits.";
      } else {
        errorMsg = "";
      }
    } else if (name === "gender") {
      if (!value) {
        errorMsg = "Gender is required.";
      } else {
        errorMsg = "";
      }
    } else if (name === "state") {
      if (!value) {
        errorMsg = "State is required.";
      } else {
        errorMsg = "";
      }
    } else if (name === "dob") {
      if (!value) {
        errorMsg = "Date of birth is required.";
      } else if (value > today) {
        errorMsg = "Date of birth cannot be in the future.";
      } else {
        errorMsg = "";
      }
    } else if (name === "terms") {
      if (!value) {
        errorMsg = "You must accept the terms and conditions.";
      } else {
        errorMsg = "";
      }
    } else {
      errorMsg = "";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));

    validateField(name, fieldValue);
  };

  const validate = () => {
    let tempErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!formData.firstName || !/^[A-Za-z]+$/.test(formData.firstName)) {
      tempErrors.firstName =
        "First name is required and should contain only alphabets.";
    } else if (formData.firstName.length < 2) {
      tempErrors.firstName = "First name must be at least 2 characters long.";
    } else {
      tempErrors.firstName = "";
    }

    if (!formData.lastName || !/^[A-Za-z]+$/.test(formData.lastName)) {
      tempErrors.lastName =
        "Last name is required and should contain only alphabets.";
    } else if (formData.lastName.length < 2) {
      tempErrors.lastName = "Last name must be at least 2 characters long.";
    } else {
      tempErrors.lastName = "";
    }

    tempErrors.middleName = /^[A-Za-z]*$/.test(formData.middleName)
      ? ""
      : "Middle name should contain only alphabets.";

    tempErrors.email = /^\S+@\S{3,}\.\S+$/.test(formData.email)
      ? ""
      : "Email is not valid.";

    tempErrors.contactNo = /^[0-9]{10}$/.test(formData.contactNo)
      ? ""
      : "Contact number should be 10 digits.";

    tempErrors.gender = formData.gender ? "" : "Gender is required.";

    tempErrors.state = formData.state ? "" : "State is required.";

    tempErrors.dob = formData.dob
      ? formData.dob <= today
        ? ""
        : "Date of birth cannot be in the future."
      : "Date of birth is required.";

    tempErrors.terms = formData.terms
      ? ""
      : "You must accept the terms and conditions.";
    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (validate()) {
      // let existingData = JSON.parse(localStorage.getItem("formData")) || [];
      // const existingData = await getData();
      
      // const formDataObject = location.state
      //   ? { ...formData, ID: location.state.ID}
      //   : { ...formData, ID: existingData.length + 1 };

      // if (location.state) {
      //   const index = existingData.findIndex(
      //     (item) => item._id === location.state._id
      //   );

      //   if (index !== -1) {
      //     existingData[index] = formDataObject;
      //   }
      // } else {
      //   existingData.push(formDataObject);
      // }

       const data_ = {
        "First":formData.firstName,
        "Middle":formData.middleName,
        "Last":formData.lastName,
        "Email":formData.email,
        "Contact":parseInt(formData.contactNo),
        "Gender":formData.gender,
        "State": formData.state,
        "Date": formData.dob
      }
      
      if(location.state){
        await updateData(location.state._id, data_);
      }
      else{
        await addData(data_);
      }
     
      // location.state?await updateData(_id,data_) :await addData(data_)

      // localStorage.setItem("formData", JSON.stringify(existingData));

      location.state ? navigate("/data-table") : window.location.reload();
    } else {
      console.log("Form validation failed");
    }
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("https://fakestoreapi.com/products/1");
  //       console.log("Fetched data:", response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);


  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom className="heading">
        Registration Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="First Name"
              name="firstName"
              variant="outlined"
              fullWidth
              value={formData.firstName}
              onChange={handleChange}
              {...(errors.firstName && {
                error: true,
                helperText: errors.firstName,
              })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Middle Name"
              name="middleName"
              variant="outlined"
              fullWidth
              value={formData.middleName}
              onChange={handleChange}
              {...(errors.middleName && {
                error: true,
                helperText: errors.middleName,
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              name="lastName"
              variant="outlined"
              fullWidth
              value={formData.lastName}
              onChange={handleChange}
              {...(errors.lastName && {
                error: true,
                helperText: errors.lastName,
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              {...(errors.email && { error: true, helperText: errors.email })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contact No."
              name="contactNo"
              type="text"
              variant="outlined"
              fullWidth
              value={formData.contactNo}
              onChange={handleChange}
              {...(errors.contactNo && {
                error: true,
                helperText: errors.contactNo,
              })}
            />
          </Grid>

          <Grid container item xs={12} className="gender">
            <FormControl component="fieldset" error={errors.gender}>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="radio-group"
              >
                <FormLabel component="legend" className="gender">
                  Gender
                </FormLabel>
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label={<span className="radio-label">Male</span>}
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label={<span className="radio-label">Female</span>}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label={<span className="radio-label">Other</span>}
                />
              </RadioGroup>
              {errors.gender && (
                <FormHelperText>{errors.gender}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth error={errors.state}>
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                name="state"
                value={formData.state}
                onChange={handleChange}
                label="State"
              >
                {state.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {index === 0 ? <em>None</em> : item}
                  </MenuItem>
                ))}
              </Select>
              {errors.state && <FormHelperText>{errors.state}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.dob}
              onChange={handleChange}
              inputProps={{
                max: today,
              }}
              {...(errors.dob && { error: true, helperText: errors.dob })}
            />
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                  />
                }
                label="I accept the terms and conditions"
              />
              {errors.terms && (
                <FormHelperText error>{errors.terms}</FormHelperText>
              )}
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {location.state ? "Edit" : "Submit"}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="button"
              variant="contained"
              color="warning"
              fullWidth
              onClick={() => navigate("/data-table")}
            >
              Show Data
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Form;
