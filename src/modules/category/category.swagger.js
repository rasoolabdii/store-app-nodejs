/**
 * @swagger
 *  tags: 
 *      name: Category
 *      description: all routes category
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddCategory:
 *              type: object
 *              required: 
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  parent:
 *                      type: string
 *                      description: the parent of category
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          EditCategoryTitle:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 */


/**
 * @swagger
 *  /api/category/add:
 *      post:
 *          tags: [Category]
 *          summary: add category
 *          description: add new category
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/AddCategory"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/AddCategory"
 *          responses:
 *              201:
 *                  description: addNewCategory Successfully
*/

/**
 * @swagger
 *  /api/category/edit/{id}:
 *      patch:
 *          tags: [Category]
 *          summary: edit category
 *          description: edit title of category          
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: the id of category
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/EditCategoryTitle"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/EditCategoryTitle"
 *          responses: 
 *              200:
 *                  description: editCategory Successfully
 */

/**
 * @swagger
 *  /api/category/list:
 *      get:
 *          tags: [Category]
 *          summary: get category
 *          description: get all category
 *          responses:
 *              200:
 *                  description: getListCategory Successfully
 */

/**
 * @swagger
 *  /api/category/list/{id}:
 *      get:
 *          tags: [Category]
 *          summary: get category by id
 *          description: get category by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: the id of category
 *          responses:
 *              200:
 *                  description: getCategory Successfully
 */

/**
 * @swagger
 *  /api/category/remove/{id}:
 *      delete:
 *          tags: [Category]
 *          summary: remove category
 *          description: remove category by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: the id of category
 *          responses:  
 *              200:
 *                  description: removeCategory Successfully
 */