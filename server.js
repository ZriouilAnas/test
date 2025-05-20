const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simple Form API",
      version: "1.0.0",
      description: "A simple API to save form data to a JSON file",
    },
  },
  apis: ["./server.js"], // This tells Swagger to look for annotations in this file
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /api/form:
 *   post:
 *     summary: Submit form data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *     responses:
 *       200:
 *         description: Data saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data saved successfully!
 */

app.post("/api/form", (req, res) => {
  const formData = req.body;

  // Read existing data
  let data = [];
  if (fs.existsSync("db.json")) {
    const jsonData = fs.readFileSync("db.json");
    data = JSON.parse(jsonData);
  }

  // Add new form data
  data.push(formData);

  // Save back to JSON file
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));

  res.json({ message: "Data saved successfully!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger UI at http://localhost:${PORT}/api-docs`);
});
