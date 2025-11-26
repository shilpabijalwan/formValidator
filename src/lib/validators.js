/**
 * formease - Built-in Validation Rules
 * ------------------------------------
 * Modular, composable, and extensible validation system.
 * Each validator returns a curried function => (value, allValues) => error | null
 */

//
// ─── STRING VALIDATORS ───────────────────────────────────────────────
//
const stringValidators = {
  required:
    (message = "This field is required") =>
    (value) => {
      if (value === undefined || value === null || value === "") return message;
      return null;
    },

  email:
    (message = "Please enter a valid email") =>
    (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) return message;
      return null;
    },

  minLength: (length, message) => (value) => {
    if (value && value.length < length)
      return message || `Must be at least ${length} characters`;
    return null;
  },

  maxLength: (length, message) => (value) => {
    if (value && value.length > length)
      return message || `Must be at most ${length} characters`;
    return null;
  },

  pattern:
    (regex, message = "Invalid format") =>
    (value) => {
      if (value && !regex.test(value)) return message;
      return null;
    },

  strongPassword:
    (
      message = "Password must include uppercase, lowercase, number, special character, and be at least 8 characters long"
    ) =>
    (value, _allValues) => {
      if (!value) return null;

      const strongRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!strongRegex.test(value)) {
        return message;
      }
      return null;
    },

  alpha:
    (message = "Only letters allowed") =>
    (value) => {
      if (value && !/^[A-Za-z]+$/.test(value)) return message;
      return null;
    },

  alphaNumeric:
    (message = "Only letters and numbers allowed") =>
    (value) => {
      if (value && !/^[A-Za-z0-9]+$/.test(value)) return message;
      return null;
    },

  url:
    (message = "Invalid URL format") =>
    (value) => {
      if (!value) return null;
      try {
        new URL(value);
        return null;
      } catch {
        return message;
      }
    },
  dropdown:
    (options = [], message = "Please select a valid option") =>
    (value, _allValues) => {
      // ⿡ Check if value is empty or default
      if (
        value === undefined ||
        value === null ||
        value === "" ||
        value === "default"
      ) {
        return "Please select an option";
      }

      // ⿢ If options are provided, ensure the selected value exists in the list
      if (
        Array.isArray(options) &&
        options.length > 0 &&
        !options.includes(value)
      ) {
        return message;
      }

      return null;
    },
};

//
// ─── NUMBER VALIDATORS ───────────────────────────────────────────────
//
const numberValidators = {
  number:
    (message = "Must be a number") =>
    (value) => {
      if (value && isNaN(Number(value))) return message;
      return null;
    },

  minValueAllowed: (min, message) => (value) => {
    const num = Number(value);
    if (value !== "" && !isNaN(num) && num < min)
      return message || `Must be at least ${min}`;
    return null;
  },

  maxValueAllowed: (max, message) => (value) => {
    const num = Number(value);
    if (value !== "" && !isNaN(num) && num > max)
      return message || `Must be at most ${max}`;
    return null;
  },
};

//
// ─── DATE VALIDATORS ───────────────────────────────────────────────
//
const dateValidators = {
  date:
    (message = "Invalid date") =>
    (value) => {
      if (value && isNaN(Date.parse(value))) return message;
      return null;
    },

  futureDate:
    (message = "Date must be in the future") =>
    (value) => {
      if (value && new Date(value) <= new Date()) return message;
      return null;
    },
};

//
// ─── LOGICAL / CONDITIONAL VALIDATORS ───────────────────────────────
//
const logicalValidators = {
  match:
    (fieldName, message = "Values do not match") =>
    (value, allValues) => {
      if (value !== allValues?.[fieldName]) return message;
      return null;
    },

  requiredIf:
    (fieldName, expectedValue, message = "This field is required") =>
    (value, allValues) => {
      if (allValues?.[fieldName] === expectedValue && !value) return message;
      return null;
    },

  differentFrom:
    (fieldName, message = "Must be different") =>
    (value, allValues) => {
      if (value === allValues?.[fieldName]) return message;
      return null;
    },
};

//
// ─── BOOLEAN VALIDATOR ───────────────────────────────────────────────
//
const miscValidators = {
  boolean:
    (message = "Must be true or false") =>
    (value) => {
      if (value !== true && value !== false) return message;
      return null;
    },

  custom:
    (validatorFn, message = "Invalid value") =>
    (value, allValues) => {
      const isValid = validatorFn(value, allValues);
      return isValid ? null : message;
    },
};

//
// ─── COMBINED EXPORT ───────────────────────────────────────────────
//
export const validators = {
  ...stringValidators,
  ...numberValidators,
  ...dateValidators,
  ...logicalValidators,
  ...miscValidators,
};
