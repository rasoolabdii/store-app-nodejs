module.exports = {
    MongoIDPattern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    ROLES: Object.freeze({
        USER: "USER",
        ADMIN: "ADMIN",
        WRITER: "WRITER",
        TEACHER: "TEACHER",
        SUPPLIER: "SUPPLIER"
    }),
    PERMISSIONS: Object.freeze({
        USER: ["profile"],
        ADMIN: ["all"],
        SUPERADMIN: ["all"],
        CONTENT_MANAGER: ["course" , "blog" , "category" , "product"],
        TEACHER: ["course" , "blog"],
        SUPPLIER: ["product"],
        ALL: "all"
    })
}