/**
 * @swagger
 *  tags:
 *      name: Roles
 *      description: all routes roles
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateNewRole:
 *              type: object
 *              required:
 *                  -   title
 *                  -   permissions
 *              properties:
 *                  title: 
 *                      type: string
 *                      description: the title of role
 *                  description:
 *                      type: string
 *                      description: the description of role
 *                  permissions:
 *                      type: array
 *                      description: the permissionID of role
 */

/**
 * @swagger
 *  definitions:
 *      ListOfRole:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties:
 *                      role: 
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "69d4a761b54458cea26811fb"
 *                                  title: 
 *                                      type: string
 *                                      example: "the title of role"
 *                                  description: 
 *                                      type: string
 *                                      example: "the description of role"
 *                                  permissions:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              _id: 
 *                                                  type: integer
 *                                                  example: 200
 *                                              name: 
 *                                                  type: string
 *                                                  example: "the name of permission"
 *                                              description: 
 *                                                  type: string
 *                                                  example: "the description of permission"
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateRole:
 *              type: object
 *              properties:
 *                  title: 
 *                      type: string
 *                      description: the title of role
 *                  description:
 *                      type: string
 *                      description: the description of role
 *                  permissions:
 *                      type: array
 *                      description: the permissionsId of role
 */

/**
 * @swagger
 *  /api/role/add:
 *      post:
 *          tags: [Roles]
 *          summary: create role
 *          description: create new role
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/CreateNewRole"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/CreateNewRole"
 *          responses:
 *              201:
 *                  description: create role successfully
 */

/**
 * @swagger
 *  /api/role/edit/{id}:
 *      patch:
 *          tags: [Roles]
 *          summary: update role
 *          description: update role by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: the id of role
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateRole"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateRole"
 *          responses:
 *              200:
 *                  description: edit role successfully
 */

/**
 * @swagger
 *  /api/role/list:
 *      get:
 *          tags: [Roles]
 *          summary: list roles
 *          description: get all roles
 *          responses:
 *              200:
 *                  description: listRoles Successfully
 *                  content:
 *                      application/json:
 *                          $ref: "#/definitions/ListOfRole"
 */
