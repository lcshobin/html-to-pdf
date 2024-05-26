import { body, ValidationChain } from "express-validator";

export const pdfSchemaValidation: ValidationChain[] = [
  body("format")
    .isString()
    .isIn(["A4", "Letter"])
    .withMessage('Format must be either "A4" or "Letter"'),
  body("printBackground")
    .isBoolean()
    .withMessage("PrintBackground must be a boolean"),
  body("width")
    .matches(/^\d+px$/)
    .withMessage('Width must be a number followed by "px"'),
  body("height")
    .matches(/^\d+px$/)
    .withMessage('Height must be a number followed by "px"'),
  body("html").isString().withMessage("HTML content must be a string"),
  body("headerTemplate")
    .isString()
    .withMessage("HeaderTemplate must be a string"),
  body("footerTemplate")
    .isString()
    .withMessage("FooterTemplate must be a string"),
  body("margin").isObject().withMessage("Margin must be an object"),
  body("margin.top")
    .matches(/^\d+(\.\d+)?in$/)
    .withMessage('Margin top must be a number followed by "in"'),
  body("margin.right")
    .matches(/^\d+(\.\d+)?in$/)
    .withMessage('Margin right must be a number followed by "in"'),
  body("margin.bottom")
    .matches(/^\d+(\.\d+)?in$/)
    .withMessage('Margin bottom must be a number followed by "in"'),
  body("margin.left")
    .matches(/^\d+(\.\d+)?in$/)
    .withMessage('Margin left must be a number followed by "in"'),
];
