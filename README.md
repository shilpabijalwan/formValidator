# React Form Validator

A lightweight, zero-dependency React form validation library with hooks-based API. Built with performance and developer experience in mind.

## 🎯 Overview

React Form Validator provides a complete solution for form validation in React applications:

- **20+ Built-in Validators** - String, number, date, and logical validators
- **Async Support** - Native async/await validation
- **Conditional Logic** - Smart validation rules based on other fields
- **Flexible Configuration** - Granular control over validation triggers
- **Developer Friendly** - Simple API with comprehensive error handling
- **Production Ready** - Battle-tested, optimized, and maintainable

## ✨ Features

- 🎯 **Simple API** - Intuitive hooks-based design
- 🚀 **Lightweight** - Zero dependencies (~4KB gzipped)
- 🔧 **Flexible** - 20+ built-in validators + custom validation
- ⚡ **Performant** - Optimized re-renders with React hooks
- 🔄 **Async Support** - Built-in async validation support
- 📝 **Type-safe** - Full TypeScript support (coming soon)
- 🎨 **Composable** - Mix and match validators easily
- 🔍 **Conditional** - Smart conditional validation rules
- 🎛️ **Configurable** - Granular control over validation triggers

## 📦 Installation

```bash
npm install react-form-validator
```

## 🚀 Quick Start

```jsx
import { useForm, validators } from "react-form-validator";

function LoginForm() {
  const { errors, touched, handleSubmit, getFieldProps } = useForm(
    { email: "", password: "" },
    {
      email: [
        validators.required("Email is required"),
        validators.email("Please enter a valid email"),
      ],
      password: [
        validators.required("Password is required"),
        validators.minLength(8)("Password must be at least 8 characters"),
      ],
    }
  );

  const onSubmit = async (values) => {
    console.log("Form values:", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input type="email" {...getFieldProps("email")} />
        {errors.email && touched.email && <span>{errors.email}</span>}
      </div>

      <div>
        <input type="password" {...getFieldProps("password")} />
        {errors.password && touched.password && <span>{errors.password}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```

## 📚 API Reference

### `useForm(initialValues, validationSchema, options?)`

Main hook for form management and validation.

#### Parameters

**`initialValues`** (Object)

- Initial values for form fields
- Example: `{ email: '', password: '', age: 18 }`

**`validationSchema`** (Object)

- Validation rules for each field
- Each field can have single validator or array of validators
- Example:
  ```jsx
  {
    email: validators.email(),
    password: [
      validators.required(),
      validators.minLength(8)()
    ]
  }
  ```

**`options`** (Object) - Optional configuration

- `validateOnChange` (boolean) - Validate on input change (default: `true`)
- `validateOnBlur` (boolean) - Validate on blur event (default: `true`)
- `validateOnSubmit` (boolean) - Validate on form submit (default: `true`)
- `initialErrors` (Object) - Initial error state (default: `{}`)
- `initialTouched` (Object) - Initial touched state (default: `{}`)

#### Returns

**State:**

- `values` (Object) - Current form values
- `errors` (Object) - Current validation errors
- `touched` (Object) - Touched state for each field
- `isSubmitting` (boolean) - Form submission state

**Handlers:**

- `handleChange` (Function) - Input change handler
- `handleBlur` (Function) - Input blur handler
- `handleSubmit` (Function) - Form submit handler

**Methods:**

- `setValue(name, value)` - Manually set field value
- `setError(name, error)` - Manually set field error
- `clearField(name)` - Clear field and its state
- `reset()` - Reset form to initial state
- `clearErrors()` - Clear all errors
- `validate()` - Validate all fields
- `validateField(name, value)` - Validate single field
- `validateFields(fields)` - Validate specific fields
- `hasError(name)` - Check if field has error
- `getFieldProps(name)` - Get props for field integration

---

## 🎯 Built-in Validators

### String Validators

#### `validators.required(message?)`

Validates that field is not empty.

```jsx
required: validators.required("This field is required");
required: validators.required(); // Default message
```

#### `validators.email(message?)`

Validates email format using RFC standard regex.

```jsx
email: validators.email("Please enter a valid email");
```

#### `validators.minLength(length, message?)`

Validates minimum string length.

```jsx
password: validators.minLength(8)("Must be at least 8 characters");
password: validators.minLength(8)(); // Default message
```

#### `validators.maxLength(length, message?)`

Validates maximum string length.

```jsx
username: validators.maxLength(20)("Username too long");
```

#### `validators.pattern(regex, message?)`

Validates using custom regular expression.

```jsx
phone: validators.pattern(/^\d{10}$/, "Invalid phone number");
```

#### `validators.strongPassword(message?)`

Validates strong password with uppercase, lowercase, number, and special character.

```jsx
password: validators.strongPassword("Weak password!");
```

#### `validators.alpha(message?)`

Validates only alphabetic characters.

```jsx
firstName: validators.alpha("Only letters allowed");
```

#### `validators.alphaNumeric(message?)`

Validates alphanumeric characters.

```jsx
username: validators.alphaNumeric("Only letters and numbers");
```

#### `validators.url(message?)`

Validates URL format.

```jsx
website: validators.url("Invalid URL");
```

### Number Validators

#### `validators.number(message?)`

Validates numeric value.

```jsx
age: validators.number("Must be a number");
```

#### `validators.minValueAllowed(min, message?)`

Validates minimum numeric value.

```jsx
age: validators.minValueAllowed(18, "Must be at least 18");
```

#### `validators.maxValueAllowed(max, message?)`

Validates maximum numeric value.

```jsx
age: validators.maxValueAllowed(120, "Invalid age");
```

### Date Validators

#### `validators.date(message?)`

Validates date format.

```jsx
birthday: validators.date("Invalid date");
```

#### `validators.futureDate(message?)`

Validates that date is in the future.

```jsx
appointmentDate: validators.futureDate("Must be future date");
```

### Logical / Conditional Validators

#### `validators.match(fieldName, message?)`

Validates field matches another field (e.g., password confirmation).

```jsx
confirmPassword: validators.match("password", "Passwords must match");
```

#### `validators.requiredIf(fieldName, expectedValue, message?)`

Conditional required validation.

```jsx
licenseNumber: validators.requiredIf("hasLicense", true, "License required");
```

#### `validators.differentFrom(fieldName, message?)`

Validates field is different from another field.

```jsx
newPassword: validators.differentFrom("oldPassword", "Must be different");
```

### Miscellaneous Validators

#### `validators.boolean(message?)`

Validates boolean value.

```jsx
terms: validators.boolean("Must accept terms");
```

#### `validators.custom(validatorFn, message?)`

Custom validation function. Return truthy for valid, falsy for invalid.

```jsx
custom: validators.custom((value, allValues) => {
  return value.includes("@");
}, "Must contain @");
```

---

## 💡 Usage Examples

### Basic Form

```jsx
const { errors, touched, handleSubmit, getFieldProps } = useForm(
  { username: "", email: "" },
  {
    username: [
      validators.required("Username is required"),
      validators.minLength(3)(),
    ],
    email: [validators.required(), validators.email("Invalid email format")],
  }
);

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...getFieldProps("username")} />
    {errors.username && touched.username && <span>{errors.username}</span>}

    <input {...getFieldProps("email")} />
    {errors.email && touched.email && <span>{errors.email}</span>}

    <button type="submit">Submit</button>
  </form>
);
```

### Password Confirmation

```jsx
const validationSchema = {
  password: [
    validators.required(),
    validators.minLength(8)(),
    validators.strongPassword(),
  ],
  confirmPassword: [
    validators.required(),
    validators.match("password", "Passwords do not match"),
  ],
};
```

### Conditional Validation

```jsx
const validationSchema = {
  hasLicense: validators.boolean(),
  licenseNumber: validators.requiredIf("hasLicense", true),
  licenseState: validators.requiredIf("hasLicense", true),
};
```

### Custom Async Validation

```jsx
const validationSchema = {
  username: [
    validators.required(),
    validators.minLength(3)(),
    validators.custom(async (value) => {
      const exists = await checkUsernameExists(value);
      return !exists;
    }, "Username already taken"),
  ],
};
```

### Manual Control

```jsx
const { setValue, setError, validateField, reset } = useForm(...);

// Programmatically set value
setValue('username', 'new_username');

// Manually set error
setError('username', 'Username taken');

// Validate specific field
const error = await validateField('email', 'test@example.com');

// Reset entire form
reset();
```

### Partial Validation

```jsx
const { validateFields, values } = useForm(...);

// Validate only specific fields
await validateFields(['email', 'password']);

// Validates all fields by default
const isValid = await validateFields();
```

### Check Field State

```jsx
const { hasError, values, errors, touched } = useForm(...);

// Check if field has error
if (hasError('email')) {
  console.log('Email field has validation error');
}

// Direct access
if (errors.email && touched.email) {
  console.log('Email error:', errors.email);
}
```

---

## ⚙️ Configuration Options

### Validation Triggers

Control when validation occurs:

```jsx
const form = useForm(initialValues, validationSchema, {
  validateOnChange: true, // Validate on input change
  validateOnBlur: true, // Validate on blur
  validateOnSubmit: true, // Validate on submit
});
```

### Initial State

Set initial form state:

```jsx
const form = useForm({ email: "user@example.com" }, validationSchema, {
  initialErrors: { email: "Please verify email" },
  initialTouched: { email: true },
});
```

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server with demo
npm run dev

# Build library
npm run build:lib

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 📝 License

MIT

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 Full Example

See the `src/App.jsx` file for a complete working example with all validators and features.
