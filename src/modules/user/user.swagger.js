/**
 * @swagger
 *  tags:
 *      name: Users
 *      description: the routes users
 */

/**
 * @swagger
 *  definitions:
 *      ListOfUsers:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      users:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id: 
 *                                      type: string
 *                                      example: "69b319ac4abcbe99e5dec91b"
 *                                  mobile: 
 *                                      type: string
 *                                      example: "0910123"
 *                                  first_name:
 *                                      type: string
 *                                      example: Ana
 *                                  last_name:
 *                                      type: string
 *                                      example: Sadry
 *                                  email:
 *                                      type: string
 *                                      example: Ana@yahoo.com
 *                                  username: 
 *                                      type: string
 *                                      example: Ana
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateProfile:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                      description: the first name of user
 *                  last_name:
 *                      type: string
 *                      description: the last name of user
 *                  email: 
 *                      type: string
 *                      description: the email of user
 *                  username: 
 *                      type: string
 *                      description: the username of user
 * 
 */

/**
 * @swagger
 *  /api/user/update-profile:
 *      patch:
 *          tags: [Users]
 *          summary: update profile
 *          description: update profile
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateProfile"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateProfile"
 *          responses:
 *              200:
 *                  description: updateProfile Successfully
 */


/**
 * @swagger
 * /api/user/list:
 *      get:
 *          tags: [Users]
 *          summary: get all users
 *          description: get all users
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: search 
 *                  description: search of users
 *          responses:
 *              200:
 *                  description: getAllUsers Successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/ListOfUsers"
 */

/**
 * @swagger
 *  /api/user/profile:
 *      get:
 *          tags: [Users]
 *          summary: get profile user
 *          description: get user profile
 *          responses:
 *              200:
 *                  description: getProfile Successfully
 */