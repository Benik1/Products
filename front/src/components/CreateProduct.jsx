import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Products from "./Products";
import { Grid, TextField, Button, DialogActions } from "@mui/material";
import { getAllProducts, addProduct } from "../Store";

const CreateProduct = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  },[]);

  const onSubmit = (values, helpers) => {
    if (values.name === "" || values.price === "") return;
    dispatch(addProduct(values))
      .then(() => {
        helpers.resetForm();
      });
    };

  const formik = useFormik({
    onSubmit,
    enableReinitialize: true,
    // validationSchema: singUpSchema,
    initialValues: {
      name: "",
      price: "",
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              fullWidth
              label="name"
              name="name"
              // disabled={formik.isSubmitting}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              label="price"
              name="price"
              type='number'
              // disabled={formik.isSubmitting}
              value={formik.values.price}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </Grid>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              value="send"
              // disabled={formik.isSubmitting}
            >
              Send
            </Button>
          </DialogActions>
        </Grid>
      </form>
      <Products />
    </>
  );
};

export default CreateProduct;
