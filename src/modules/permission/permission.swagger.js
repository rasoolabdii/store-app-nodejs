/**
 * @swagger
 *  tags:
 *      name: Permission
 *      description: all routes permissioms
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddNewPermission:
 *              type: object
 *              required: 
 *                  -   name
 *              properties:
 *                  name: 
 *                      type: string
 *                      description: the name of permission
 *                  description:
 *                      type: string
 *                      description: the description of permission
 */

/**
 * @swagger
 *  definitions:
 *      ListOfPermissions:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties:
 *                      permissions:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id: 
 *                                      type: string
 *                                      example: "61b329ac6abcbe99e1dec41b"
 *                                  name:
 *                                      type: string
 *                                      example: "the name of permission"
 *                                  description:
 *                                      type: string
 *                                      example: "the description of permission"
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdatePermission:
 *              type: object
 *              properties:
 *                  name: 
 *                      type: string
 *                      description: the name of permission
 *                  description:
 *                      type: string
 *                      description: the description of permission
 */

/**
 * @swagger
 *  /api/permission/add:
 *      post:
 *          tags: [Permission]
 *          summary: add permission
 *          description: add new permission
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/AddNewPermission"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/AddNewPermission"
 *          responses:
 *              201:
 *                  description: AddPermission Successfully
 */

/**
 * @swagger
 *  /api/permission/update/{id}:
 *      patch:
 *          tags: [Permission]
 *          summary: update permission
 *          description: update permission by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: the id of permission
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdatePermission"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdatePermission"
 *          responses:
 *              200:
 *                  description: update permission successfully
 */

/**
 * @swagger
 *  /api/permission/list:
 *      get:
 *          tags: [Permission]
 *          summary: get permission
 *          description: get all permission
 *          responses:
 *              200:
 *                  description: getAllPermission Successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/ListOfPermissions"
 */

/**
 * @swagger
 *  /api/permission/remove/{id}:
 *      delete:
 *          tags: [Permission]
 *          summary: remove permission
 *          description: remove permission
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: the id of permission
 *          responses:
 *              200:
 *                  description: remove permission successfully
 */