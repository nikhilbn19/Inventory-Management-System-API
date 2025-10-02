const sequelize = require("./db");
const app = require("./app");
const Product = require("./models/product");

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("DB connection error", err);
  }
})();
