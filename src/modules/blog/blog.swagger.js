/**
 * @swagger
 *  tags:
 *      name: Blogs
 *      description: all routes blog
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          createBlog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of blog
 *                  short_text:
 *                      type: string
 *                      description: the short text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  category:
 *                      type: string
 *                      description: the id of category of blog
 *                  tags:
 *                      type: array
 *                      description: the tags of blog
 *                      items:
 *                          type: string
 *                  image:
 *                      type: file
 *                      format: binary
 *                      description: the image of blog
 */

/**
 * @swagger
 *  /api/blog/add:
 *      post:
 *          tags: [Blogs]
 *          summary: create blog
 *          description: create new blog
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/createBlog"
 *          responses:
 *              201:
 *                  description: AddBlog Successfully
 */