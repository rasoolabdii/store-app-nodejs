/**
 * @swagger
 *  tags:
 *      name: Products
 *      description: all routes products
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Color:
 *              type: array
 *              items:
 *                  type: string
 *                  enum:
 *                      -   black
 *                      -   white
 *                      -   gray
 *                      -   red
 *                      -   blue
 *                      -   green
 *                      -   pink
 *                      -   orange
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddProduct:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   category
 *                  -   tags
 *                  -   price
 *                  -   discount
 *                  -   count
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                  short_text:
 *                      type: string
 *                      description: the short text of product
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                  category:
 *                      type: string
 *                      description: the category of product
 *                  tags:
 *                      type: array
 *                      description: the tags of product
 *                  colors:
 *                      $ref: "#/components/schemas/Color"
 *                  price:
 *                      type: number
 *                      description: the price of product
 *                  discount:
 *                      type: number
 *                      description: the discount of product
 *                  count:
 *                      type: number
 *                      description: the count of product
 *                  type:
 *                      type: string
 *                      description: the type of product
 *                      enum:
 *                          -   physical
 *                          -   virtual
 *                  format:
 *                      type: string
 *                      description: the format of product
 *                      example: "pdf"
 *                  height:
 *                      type: string
 *                      description: the height of product packet
 *                  weight:
 *                      type: string
 *                      description: the weight of product packet
 *                  width:
 *                      type: string
 *                      description: the width of product packet
 *                  length:
 *                      type: string
 *                      description: the width of product packet
 *                  images:
 *                      type: array
 *                      description: the images of product
 *                      items:
 *                          type: string
 *                          format: binary
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateProduct:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                  short_text:
 *                      type: string
 *                      description: the short text of product
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                  category:
 *                      type: string
 *                      description: the category of product
 *                  tags:
 *                      type: array
 *                      description: the tags of product
 *                  colors:
 *                      $ref: "#/components/schemas/Color"
 *                  price:
 *                      type: number
 *                      description: the price of product
 *                  discount:
 *                      type: number
 *                      description: the discount of product
 *                  count:
 *                      type: number
 *                      description: the count of product
 *                  type:
 *                      type: string
 *                      description: the type of product
 *                      enum:
 *                          -   physical
 *                          -   virtual
 *                  format:
 *                      type: string
 *                      description: the format of product
 *                      example: "pdf"
 *                  height:
 *                      type: string
 *                      description: the height of product packet
 *                  weight:
 *                      type: string
 *                      description: the weight of product packet
 *                  width:
 *                      type: string
 *                      description: the width of product packet
 *                  length:
 *                      type: string
 *                      description: the width of product packet
 *                  images:
 *                      type: array
 *                      description: the images of product
 *                      items:
 *                          type: string
 *                          format: binary
 */

/**
 * @swagger
 *  /api/product/add:
 *      post:
 *          tags: [Products]
 *          summary: create product
 *          description: create new product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/AddProduct"
 *          responses:
 *              201:
 *                  description: AddProduct Successfully
 */

/**
 * @swagger
 *  /api/product/update/{id}:
 *      patch:
 *          tags: [Products]
 *          summary: update product
 *          description: update product by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: the id of product
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateProduct"
 *          responses:
 *              200:
 *                  description: update product successfully
 */

/**
 * @swagger
 *  /api/product/list:
 *      get:
 *          tags: [Products]
 *          summary: list products
 *          description: get all list of products
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: the search of produdcts
 *          responses:
 *              200:
 *                  description: getAllList Successfully
 */
