/**
 * @swagger
 *  tags:
 *      name: Chapters
 *      description: all routes chapters
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateChapter:
 *              type: object
 *              required: 
 *                  -   id
 *                  -   title
 *                  -   text
 *              properties:
 *                  id:
 *                      type: string
 *                      description: id of course
 *                  title:
 *                      type: string
 *                      description: title of chapter
 *                  text:
 *                      type: string
 *                      description: text of chapter
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateChapter:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of chapter
 *                  text:
 *                      type: string
 *                      description: text of chapter
 */

/**
 * @swagger
 *  /api/chapter/add:
 *      post:
 *          tags: [Chapters]
 *          summary: add chapter
 *          description: add new chapter to course
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/CreateChapter"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/CreateChapter"
 *          responses:
 *              201:
 *                  description: CreateChapter Successfully
 */

/**
 * @swagger
 *  /api/chapter/update/{id}:
 *      patch:
 *          tags: [Chapters]
 *          summary: update chapter
 *          description: update chapter by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: id of chapter
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateChapter"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateChapter"
 *          responses:
 *              200:
 *                  description: updateChapter successfully
 */

/**
 * @swagger
 *  /api/chapter/list/{id}:
 *      get:
 *          tags: [Chapters]
 *          summary: get chapter
 *          description: get chapter from course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: id of course
 *          responses:
 *              200:
 *                  description: getChapter successfully
 */

/**
 * @swagger
 *  /api/chapter/remove/{id}:
 *      delete:
 *          tags: [Chapters]
 *          summary: remove chapter
 *          description: remopve chapters of course by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: id of chapter
 *          responses:
 *              200:
 *                  description: removeChapter Successfully
 */