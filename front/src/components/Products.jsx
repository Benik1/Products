import "./products.css";
import { useState } from "react";
import { useFormik } from "formik";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct,deleteProduct} from '../Store';

const Products = (props) => {
  const dispatch = useDispatch();

  const products = useSelector(state => state.data);


  const deleting = (id) => (e) => {
      dispatch(deleteProduct(id))
  };

  const [id, setId] = useState();

  const onSubmit = (values, helpers) => {
    console.log('values ', values)
    dispatch(updateProduct(id, values))
      .then(() => {
        helpers.resetForm();
        setId(null);
      })
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

  const onSelect = (item) => (e) => {
    setId(item.id);
    formik.setFieldValue("name", item.name);
    formik.setFieldValue("price", item.price);
  };

  return (
    <>
      <Grid container spacing={0}>
        {products.map((el) => (


          <Grid container alignItems='center' key={el.id} width='100vw' mt={4}>
            <Grid item container xs={3} alignItems='center' sx={{ height: 50 }}>
              <Button onClick={deleting(el.id)}>delete</Button>
              <Button onClick={onSelect(el)}>update</Button>

              <Typography>{el.name}</Typography>
              <Typography>:</Typography>
              <Typography>{el.price}</Typography>
            </Grid>

            <form style={{ width: 800 }} onSubmit={formik.handleSubmit}>
              <Grid container alignItems='center' spacing={1} sx={{ maxWidth: 600, width: '100%' }}>
                {id === el.id && (
                  <>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="name"
                        label="name"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        type="number"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="price"
                        label="price"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Button type="submit" variant="contained">Add</Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </form>

          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Products;
