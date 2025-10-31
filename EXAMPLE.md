# Usage Examples

## Basic Form

```jsx
import { useForm, validators } from 'react-form-validator';

function BasicForm() {
  const { errors, touched, handleSubmit, getFieldProps } = useForm(
    { username: '', email: '' },
    {
      username: [
        validators.required('Username is required'),
        validators.minLength(3)('Must be at least 3 characters'),
      ],
      email: [
        validators.required('Email is required'),
        validators.email('Invalid email format'),
      ],
    }
  );

  const onSubmit = async (values) => {
    console.log('Submitted:', values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...getFieldProps('username')} placeholder="Username" />
      {errors.username && touched.username && <span>{errors.username}</span>}
      
      <input {...getFieldProps('email')} placeholder="Email" />
      {errors.email && touched.email && <span>{errors.email}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Password Confirmation

```jsx
function SignUpForm() {
  const { errors, touched, handleSubmit, getFieldProps } = useForm(
    { password: '', confirmPassword: '' },
    {
      password: [
        validators.required('Password is required'),
        validators.minLength(8)('Password must be at least 8 characters'),
      ],
      confirmPassword: [
        validators.required('Please confirm your password'),
        validators.match('password', 'Passwords do not match'),
      ],
    }
  );

  const onSubmit = async (values) => {
    // Handle signup
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="password" {...getFieldProps('password')} />
      {errors.password && touched.password && <span>{errors.password}</span>}
      
      <input type="password" {...getFieldProps('confirmPassword')} />
      {errors.confirmPassword && touched.confirmPassword && (
        <span>{errors.confirmPassword}</span>
      )}
      
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

## Custom Validator

```jsx
function CustomForm() {
  const { errors, touched, handleSubmit, getFieldProps } = useForm(
    { username: '' },
    {
      username: [
        validators.required('Username is required'),
        validators.custom(
          (value, allValues) => !value.includes('admin'),
          'Username cannot contain "admin"'
        ),
      ],
    }
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...getFieldProps('username')} />
      {errors.username && touched.username && <span>{errors.username}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Manual Control

```jsx
function ManualForm() {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setValue,
    setError,
    reset,
    validateAll,
  } = useForm({ name: '', email: '' }, { /* schema */ });

  const handleAsyncValidation = async () => {
    // Check if username is available
    const available = await checkUsername(values.name);
    if (!available) {
      setError('name', 'Username is already taken');
    }
  };

  return (
    <form>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.name && <span>{errors.name}</span>}
      
      <button type="button" onClick={validateAll}>
        Validate All
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
}
```

## Conditional Validation

```jsx
function ConditionalForm() {
  const { errors, touched, getFieldProps, values } = useForm(
    { age: '', hasLicense: false },
    {
      age: [
        validators.required('Age is required'),
        validators.number('Age must be a number'),
      ],
      licenseNumber: [
        // Only validate if hasLicense is true
        validators.custom(
          (value, allValues) => {
            if (!allValues.hasLicense) return true;
            return !!value;
          },
          'License number is required if you have a license'
        ),
      ],
    }
  );

  return (
    <form>
      <input type="number" {...getFieldProps('age')} />
      
      <label>
        <input
          type="checkbox"
          {...getFieldProps('hasLicense')}
        />
        I have a driver's license
      </label>
      
      {values.hasLicense && (
        <>
          <input {...getFieldProps('licenseNumber')} />
          {errors.licenseNumber && touched.licenseNumber && (
            <span>{errors.licenseNumber}</span>
          )}
        </>
      )}
    </form>
  );
}
```

