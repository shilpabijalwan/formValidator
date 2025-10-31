/**
 * React Form Validator Library
 * Main entry point
 */

export { useForm } from "./useForm.js";
export { validators } from "./validators.js";

// Default export
export default {
  useForm: () => {
    throw new Error(
      'Please use named import: import { useForm } from "react-form-validator"'
    );
  },
  validators: () => {
    throw new Error(
      'Please use named import: import { validators } from "react-form-validator"'
    );
  },
};
