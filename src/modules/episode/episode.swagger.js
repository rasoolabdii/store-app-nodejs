/**
 * @swagger
 *  tags:
 *      name: Episodes
 *      description: The episodes managing API
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *        AddNewEpisode:
 *              type: object
 *              required:
 *                  -   courseId
 *                  -   chapterId
 *                  -   title
 *                  -   text
 *                  -   type
 *                  -   video
 *              properties:
 *                  courseId:
 *                      type: string
 *                      description: the course id of episode
 *                  chapterId:
 *                      type: string
 *                      description: the chapter id of episode
 *                  title:
 *                      type: string
 *                      description: the title of episode
 *                      example: "ویدئو شماره یک - متغیرها"
 *                  text:
 *                      type: string
 *                      description: the text of episode
 *                      example: "در این ویديو در رابطه با ... به طور کامل توضیح داده شده است"
 *                  type:
 *                      type: string
 *                      description: the type of episode
 *                      enum:
 *                          -   lock
 *                          -   unlock
 *                  video:
 *                      type: string
 *                      format: binary
 *                      description: the video address of episode
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateEpisode:
 *              type: object
 *              properties:
 *                  chapterId:
 *                      type: string
 *                      description: the chapter id of episode
 *                      example: 6a1bea258671be41b092657d
 *                  title:
 *                      type: string
 *                      description: title of episode
 *                      example: "ویدئو شماره یک - متغیرها"
 *                  text:
 *                      type: string
 *                      description: the text of episode
 *                      example: "در این ویديو در رابطه با ... به طور کامل توضیح داده شده است"
 *                  type:
 *                      type: string
 *                      description: the type of episode
 *                      enum:
 *                          -   lock
 *                          -   unlock
 *                  video:
 *                      type: string
 *                      format: binary
 *                      description: the video address of episode
 */

/**
 * @swagger
 *  /api/episode/add:
 *      post:
 *          tags: [Episodes]
 *          summary: create episode
 *          description: create new episode
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/AddNewEpisode"
 *          responses:
 *              201:
 *                  description: addEpisode Successfully
 */

/**
 * @swagger
 *  /api/episode/update/{episodeId}:
 *      patch:
 *          tags: [Episodes]
 *          summary: update episode
 *          description: update episode by id
 *          parameters:
 *              -   in: path
 *                  name: episodeId
 *                  type: string
 *                  description: the id of episode
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateEpisode"
 *          responses:
 *              200:
 *                  description: update episode successfully
 */

/**
 * @swagger
 *  /api/episode/list:
 *      get:
 *          tags: [Episodes]
 *          summary: get all episode
 *          description: get all episode
 *          responses:
 *              200:
 *                  description: getAllEpisode
 */

/**
 * @swagger
 *  /api/episode/list/{episodeId}:
 *      get:
 *          tags: [Episodes]
 *          summary: get episode
 *          description: get episode by id
 *          parameters:
 *              -   in: path
 *                  name: episodeId
 *                  type: string
 *                  description: episode id of episode
 *          responses:
 *              200:
 *                  description: getEpisode Successfully
 */

/**
 * @swagger
 *  /api/episode/remove/{episodeId}:
 *      delete:
 *          tags: [Episodes]
 *          summary: delete epsiode
 *          description: delete episode by id
 *          parameters:
 *              -   in: path
 *                  name: episodeId
 *                  type: string
 *                  description: episode id of episode
 *          responses:
 *              200:
 *                  description: RemoveEpisode Successfully
 */
