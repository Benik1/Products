const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");

/* ============ sequelize ============ */

const sequelize = new Sequelize("postgres", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

const User = sequelize.define(
  "user",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {}
);

const Product = sequelize.define(
  "products",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
    },
  },
  {}
);

/* ============ express ============ */

const app = express();
const port = 4001;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

// const addUser = async (req, res) => {
//   try {
//     const body = req.body;
//     const users = await User.create(body);
//     res.json(users);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

const addProduct = async (req, res) => {
  try {
    const body = req.body;
    const products = await Product.create(body);
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const allProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ order: ['createdAt'] });
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const delProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({ where: { id: id } });
    const products = await Product.findAll({ order: ['createdAt'] });
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

// app.post("/users", addUser);
// app.get("/users", getAllUsers);

const updateById = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.update(req.body, { where: { id } });
    const products = await Product.findAll({ order: ['createdAt'] });
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

app.get("/products", allProducts);
app.post("/products", addProduct);
app.delete("/products/:id", delProduct);
app.put("/products/:id", updateById);

app.listen(port, async () => {
  sequelize.sync();
  console.log(`Example app listening on port ${port}`);
});
