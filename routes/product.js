const { getOneProduct, getAllProducts, updateProduct, deleteProduct, createProduct } = require('../controllers/productController');
const uploads = require('../middlewares/multer');
// const { validateProduct } = require('../middlewares/validator');


const router = require('express').Router();

/** 
 * @swagger
 * /api/v1/create/product:
 *   post:
 *     summary: Create a new product
 *     requestBody: 
 *       required: true
 *       content: 
 *         multipart/form-data:
 *           schema: 
 *             type: object
 *             properties: 
 *               productName: 
 *                 type: string
 *                 description: Name of the product
 *                 example: Smartphone
 *               description: 
 *                 type: string
 *                 description: Detailed description of the product
 *                 example: A high-end smartphone with 128GB storage
 *               productPrice: 
 *                 type: number
 *                 description: Price of the product
 *                 example: 750
 *               image: 
 *                 type: string
 *                 format: binary
 *                 description: Image file of the product
 *     responses: 
 *       201:
 *         description: Product Created Successfully
 *       500:
 *         description: Internal Server Error
 */
router.post("/create/product", uploads.single("image"), createProduct);

/** 
 * @swagger
 * /api/v1/product/{productId}:
 *   get:
 *     summary: Get details of a single product
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses: 
 *       200:
 *         description: Product details retrieved successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/product/:productId", getOneProduct);

/** 
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products in the database
 *     responses: 
 *       200:
 *         description: List of all products
 *       500:
 *         description: Internal Server Error
 */
router.get("/products", getAllProducts);

/** 
 * @swagger
 * /api/v1/update/{productId}:
 *   put:
 *     summary: Update a product's details
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update
 *     requestBody: 
 *       required: true
 *       content: 
 *         multipart/form-data:
 *           schema: 
 *             type: object
 *             properties: 
 *               productName: 
 *                 type: string
 *                 description: Updated name of the product
 *                 example: Smartphone Pro
 *               description: 
 *                 type: string
 *                 description: Updated description of the product
 *                 example: An advanced smartphone with 256GB storage
 *               productPrice: 
 *                 type: number
 *                 description: Updated price of the product
 *                 example: 900
 *               image: 
 *                 type: string
 *                 format: binary
 *                 description: Updated image file of the product
 *     responses: 
 *       200:
 *         description: Product Updated Successfully
 *       404:
 *         description: Product Not Found
 *       500:
 *         description: Internal Server Error
 */
router.put("/update/:productId", uploads.single("image"), updateProduct);

/** 
 * @swagger
 * /api/v1/delete/{productId}:
 *   delete:
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to delete
 *     responses: 
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/delete/:productId", deleteProduct);

module.exports = router;
