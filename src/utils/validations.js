import { body } from "express-validator";

const emptyErr = "is required"
const lengthErr = "must be between"
const typeErr = "must be of type"

export const validatePost = [
    body()
        .notEmpty().withMessage(`Post data ${emptyErr}`),
    body("title")
        .trim()
        .notEmpty().withMessage(`Title ${emptyErr}`)
        .isLength({ min: 3, max: 100 }).withMessage(`Title ${lengthErr} 3 and 100 characters`),
    body("content")
        .trim()
        .notEmpty().withMessage(`Content ${emptyErr}`)
        .isLength({ min: 3, max: 255 }).withMessage(`Content ${lengthErr} 3 and 255 characters`),
    body("visibility")
        .optional()
        .isIn(["PUBLIC", "PRIVATE"]).withMessage(`Visibility ${typeErr} PUBLIC or PRIVATE`),
]

export const validatePostUpdate = [
    body()
        .notEmpty().withMessage(`Post data ${emptyErr}`),
    body("title")
        .trim()
        .optional()
        .isLength({ min: 3, max: 100 }).withMessage(`Title ${lengthErr} 3 and 100 characters`),
    body("content")
        .trim()
        .optional()
        .isLength({ min: 3, max: 255 }).withMessage(`Content ${lengthErr} 3 and 255 characters`),
    body("visibility")
        .optional()
        .isIn(["PUBLIC", "PRIVATE"]).withMessage(`Visibility ${typeErr} PUBLIC or PRIVATE`),
]

export const validateComment = [
    body()
        .notEmpty().withMessage(`Comment data ${emptyErr}`),
        body("content")
        .trim()
        .notEmpty().withMessage(`Content ${emptyErr}`)
        .isLength({ min: 1, max: 255 }).withMessage(`Comment ${lengthErr} 1 and 255 characters`),
    body("author_id")
        .notEmpty().withMessage(`Author ${emptyErr}`),
    body("post_id")
        .notEmpty().withMessage(`Post ${emptyErr}`)
]

export const validateCommentUpdate = [
    body()
        .notEmpty().withMessage(`Comment data ${emptyErr}`),
    body("content")
        .trim()
        .optional()
        .isLength({ min: 1, max: 255 }).withMessage(`Comment ${lengthErr} 1 and 255 characters`),
    body("author_id")
        .optional(),
    body("post_id")
        .optional()
]

export const validateUser = [
    body()
        .notEmpty().withMessage(`Request body ${emptyErr}`),
    body("username")
        .trim()
        .notEmpty().withMessage(`Username ${emptyErr}`)
        .isLength({ min: 3, max: 100 }).withMessage(`Username ${lengthErr} 3 and 100 characters`),
    body("email")
        .trim()
        .notEmpty().withMessage(`Email ${emptyErr}`)
        .isEmail().withMessage(`Email ${typeErr} email`)
        .isLength({ min: 3, max: 100 }).withMessage(`Email ${lengthErr} 3 and 100 characters`),
    body("bio")
        .trim()
        .optional()
        .isLength({ min: 1, max: 100 }).withMessage(`Bio ${lengthErr} 1 and 255 characters`),
    body("password")
        .isString().withMessage(`Password ${typeErr} string`)
        .notEmpty().withMessage(`Password ${emptyErr}`)
        .isLength({ min: 8, max: 50 }).withMessage(`Password ${lengthErr} 8 and 50 characters`),
    body("confirmPassword")
        .notEmpty().withMessage(`Password confirmation ${emptyErr}`)
]

export const validateUserUpdate = [
    body()
        .notEmpty().withMessage(`Request body ${emptyErr}`),
    body("username")
        .trim()
        .optional()
        .isLength({ min: 3, max: 100 }).withMessage(`Username ${lengthErr} 3 and 100 characters`),
    body("email")
        .trim()
        .optional()
        .isEmail().withMessage(`Email ${typeErr} email`)
        .isLength({ min: 3, max: 100 }).withMessage(`Email ${lengthErr} 3 and 100 characters`),
    body("bio")
        .trim()
        .optional()
        .isLength({ min: 1, max: 100 }).withMessage(`Bio ${lengthErr} 1 and 255 characters`),
]
