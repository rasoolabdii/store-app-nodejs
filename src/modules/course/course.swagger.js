/**
 * @swagger
 *  tags:
 *      name: Courses
 *      description: all routes courses
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Types: 
 *              type: string
 *              enum:
 *                  -   cash
 *                  -   free
 *                  -   special
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Status:
 *              type: string
 *              enum: 
 *                  -   notStarted
 *                  -   Holding
 *                  -   Completed
 */

/**
 * @swagger
 *  definitions:
 *      ListOfCourses:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: 6a1bea258671be41b091857f
 *                                  title: 
 *                                      type: string
 *                                      example: "title of course"
 *                                  text:
 *                                      type: string
 *                                      exmple: "text of course"
 *                                  short_text:
 *                                      type: string
 *                                      example: "short text of course"
 *                                  status:
 *                                      type: string
 *                                      example: "notStarted | Holding | Completed"
 *                                  time: 
 *                                      type: string
 *                                      example: 10:20:57
 *                                  price:
 *                                      type: integer
 *                                      example: 2500000
 *                                  discount: 
 *                                      type: integer
 *                                      example: 15000
 *                                  studentCount:
 *                                      type: integer
 *                                      example: 260
 *                                  teacher:
 *                                      type: string
 *                                      example: "rasool abdi"
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCourse:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   category
 *                  -   type
 *                  -   image
 *                  -   status
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of course
 *                  text:
 *                      type: string
 *                      description: text of course
 *                  short_text:
 *                      type: string
 *                      description: short text of course
 *                  tags:
 *                      type: array
 *                      items:
 *                          type: string
 *                      description: tags of course
 *                  category:
 *                      type: string
 *                      description: categoryId of course
 *                  price:
 *                      type: number
 *                      description: price of course
 *                  discount:
 *                      type: number
 *                      description: discount of course
 *                  type: 
 *                      type: string
 *                      enum:
 *                          -   cash
 *                          -   free
 *                          -   special
 *                  status:
 *                      type: string
 *                      enum:
 *                          -   notStarted
 *                          -   Holding
 *                          -   Completed
 *                  image:
 *                      type: file
 *                      format: binary
 *                      description: image of course
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateCourse:
 *              type: object
 *              properties:
 *                  title: 
 *                      type: string
 *                      description: title of course
 *                  text:
 *                      type: string
 *                      description: text of course
 *                  short_text:
 *                      type: string
 *                      description: short text of course
 *                  tags:
 *                      type: array
 *                      description: tags of course
 *                      items:
 *                          type: string
 *                  category:
 *                      type: string
 *                      description: category id of course
 *                  price:
 *                      type: number
 *                      description: price of course
 *                  discount:
 *                      type: number
 *                      description: discount of course
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   cash
 *                          -   free
 *                          -   special
 *                      description: type of course
 *                  status:
 *                      type: string
 *                      enum:
 *                          -   notStarted
 *                          -   Holding
 *                          -   Completed
 *                  image:
 *                      type: file
 *                      format: binary
 *                      description: image of course
 */

/**
 * @swagger
 *  /api/course/add:
 *      post:
 *          tags: [Courses]
 *          summary: create course
 *          description: create new course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/CreateCourse"
 *          responses:
 *              201:
 *                  description: createCourse successfully
 */

/**
 * @swagger
 *  /api/course/update/{id}:
 *      patch:
 *          tags: [Courses]
 *          summary: update course
 *          description: update course by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: id of course
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateCourse"
 *          responses:
 *              200:
 *                  description: update successfully
 */

/**
 * @swagger
 *  /api/course/list:
 *      get:
 *          tags: [Courses]
 *          summary: get list course
 *          description: get all list course
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search of course
 *          responses:
 *              200:
 *                  description: successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/ListOfCourses"
 */

/**
 * @swagger
 *  /api/course/list/{id}:
 *      get:
 *          tags: [Courses]
 *          summary: get course
 *          description: get course by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: id of courses
 *          responses:
 *              200:
 *                  description: getCourse successfully
 */