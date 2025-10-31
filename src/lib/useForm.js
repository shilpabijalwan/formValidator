import { useState, useCallback } from "react";

/**
 * useForm — Lightweight and extensible form validation hook
 * Supports async validators, partial validation, and custom triggers
 */
export function useForm(
  initialValues = {},
  validationSchema = {},
  options = {}
) {
  const {
    validateOnChange = true,
    validateOnBlur = true,
    validateOnSubmit = true,
    initialErrors = {},
    initialTouched = {},
  } = options;

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState(initialTouched);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Validate a single field (supports async validators)
   */
  const validateField = useCallback(
    async (name, value, allValues = values) => {
      const fieldSchema = validationSchema[name];
      if (!fieldSchema) return null;

      const rules = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema];

      for (const rule of rules) {
        const error = await Promise.resolve(rule(value, allValues));
        if (error) return error;
      }

      return null;
    },
    [validationSchema, values]
  );

  /**
   * Validate multiple or all fields
   */
  const validateFields = useCallback(
    async (fieldsToValidate = Object.keys(validationSchema), vals = values) => {
      const newErrors = {};
      let isValid = true;

      for (const fieldName of fieldsToValidate) {
        const fieldValue = vals[fieldName];
        const error = await validateField(fieldName, fieldValue, vals);

        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      }

      setErrors((prev) => ({ ...prev, ...newErrors }));
      return isValid;
    },
    [validationSchema, values, validateField]
  );

  /**
   * Manual global validation trigger
   */
  const validate = useCallback(async () => {
    return validateFields(Object.keys(validationSchema));
  }, [validateFields, validationSchema]);

  /**
   * Handle input change
   */
  const handleChange = useCallback(
    async (event) => {
      const { name, value, type, checked } = event.target;
      const fieldValue = type === "checkbox" ? checked : value;

      setValues((prev) => ({ ...prev, [name]: fieldValue }));

      // Clear existing error
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }

      // Validate on change
      if (validateOnChange && touched[name]) {
        const nextValues = { ...values, [name]: fieldValue };
        const error = await validateField(name, fieldValue, nextValues);
        if (error) {
          setErrors((prev) => ({ ...prev, [name]: error }));
        }
      }
    },
    [errors, touched, validateOnChange, validateField, values]
  );

  /**
   * Handle blur event
   */
  const handleBlur = useCallback(
    async (event) => {
      const { name } = event.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      if (validateOnBlur) {
        const error = await validateField(name, values[name]);
        if (error) {
          setErrors((prev) => ({ ...prev, [name]: error }));
        }
      }
    },
    [values, validateOnBlur, validateField]
  );

  /**
   * Utility: Check if a field has an error
   */
  const hasError = useCallback(
    (name) => !!errors[name] && !!touched[name],
    [errors, touched]
  );

  /**
   * Manually set field value
   */
  const setValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  /**
   * Manually set field error
   */
  const setError = useCallback((name, error) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  /**
   * Clear a specific field and its error/touched state
   */
  const clearField = useCallback((name) => {
    setValues((prev) => {
      const newValues = { ...prev };
      delete newValues[name];
      return newValues;
    });
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    setTouched((prev) => {
      const newTouched = { ...prev };
      delete newTouched[name];
      return newTouched;
    });
  }, []);

  /**
   * Reset the entire form
   */
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors(initialErrors);
    setTouched(initialTouched);
    setIsSubmitting(false);
  }, [initialValues, initialErrors, initialTouched]);

  /**
   * Clear all form errors
   */
  const clearErrors = useCallback(() => setErrors({}), []);

  /**
   * Get field props (for easy integration)
   */
  const getFieldProps = useCallback(
    (name) => ({
      name,
      value: values[name] ?? "",
      onChange: handleChange,
      onBlur: handleBlur,
    }),
    [values, handleChange, handleBlur]
  );

  /**
   * Form submission handler
   */
  const handleSubmit = useCallback(
    (onSubmit) => {
      return async (event) => {
        event?.preventDefault();
        setIsSubmitting(true);

        if (validateOnSubmit) {
          const isValid = await validate();
          if (!isValid) {
            setIsSubmitting(false);
            return;
          }
        }

        try {
          await onSubmit(values);
        } catch (error) {
          console.error("Form submission error:", error);
        } finally {
          setIsSubmitting(false);
        }
      };
    },
    [values, validateOnSubmit, validate]
  );

  return {
    // State
    values,
    errors,
    touched,
    isSubmitting,

    // Handlers
    handleChange,
    handleBlur,
    handleSubmit,

    // Methods
    setValue,
    setError,
    clearField,
    reset,
    clearErrors,
    validate,
    validateField,
    validateFields,
    getFieldProps,
    hasError,
  };
}
