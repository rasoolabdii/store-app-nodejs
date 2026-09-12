/**
 * @swagger
 *  tags:
 *      name: Auth
 *      description: all routes auth
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          SendOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: mobile of user
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CheckOTP:
 *              type: object
 *              required: 
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: mobile of user
 *                  code:
 *                      type: string
 *                      description: code of mobile
 */

/**
 * @swagger
 *  /api/auth/send-otp:
 *      post:
 *          tags: [Auth]
 *          summary: mobile user
 *          description: get mobile user for send otp
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/SendOTP"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/SendOTP"
 *          responses:
 *              201:
 *                  description: SendOTP Successfully
 */

/**
 * @swagger
 *  /api/auth/check-otp:
 *      post:
 *          tags: [Auth]
 *          summary: check otp
 *          description: check otp
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/CheckOTP"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/CheckOTP"
 *          responses:
 *              200:
 *                  description: check otp successfully
 */

/**
 * @swagger
 *  /api/auth/logout:
 *      post:
 *          tags: [Auth]
 *          summary: logout user
 *          description: logout user
 *          responses:
 *              200:
 *                  description: logout successfully
 */

/**
 * @swagger
 *  /api/auth/refresh-token:
 *      get:
 *          tags: [Auth]
 *          summary: create refresh token
 *          description: create new accessToken and refreshToken
 *          responses:
 *              200:
 *                  description: create new token successfully
 */