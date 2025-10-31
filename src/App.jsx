import { useForm, validators } from './lib/index.js'
import './App.css'

function App() {
  const onSubmit = async (values) => {
    console.log('Form submitted with values:', values);
    alert('Form is valid! Check console for values.');
  };

  console.log(validators)
  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    reset,
    getFieldProps,
  } = useForm(
    {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      website: '',
      minimumNumberAllowed: '',
      maximumNumberAllowed: '',
    },
    {
      firstName: [validators.required('First name is required')],
      lastName: [validators.required('Last name is required')],
      email: [
        validators.required('Email is required'),
        validators.email('Please enter a valid email address'),
      ],
      password: [
        validators.required('Password is required'),
        validators.minLength(4, 'Password must be at least 4 characters'),
        // validators.maxLength(6, 'Password must be at most 6 characters'),
        validators.strongPassword(),
      ],
      confirmPassword: [
        validators.required('Please confirm your password'),
        validators.match('password', 'Passwords do not match'),
      ],
      age: [
        validators.number('Age must be a number'),
        validators.minValueAllowed(18, 'Must be at least 18 years old'),
        validators.maxValueAllowed(120, 'Please enter a valid age'),
      ],
      website: [
        validators.pattern(
          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
          'Please enter a valid URL'
        ),
      ],

    },
    {
      validateOnChange: true,
      validateOnBlur: true,
    }
  );

  return (
    <div className="container">
      <h1>React Form Validator Demo</h1>
      <p className="subtitle">A lightweight React form validation library</p>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            {...getFieldProps('firstName')}
            className={errors.firstName && touched.firstName ? 'error' : ''}
          />
          {errors.firstName && touched.firstName && (
            <span className="error-message">{errors.firstName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            {...getFieldProps('lastName')}
            className={errors.lastName && touched.lastName ? 'error' : ''}
          />
          {errors.lastName && touched.lastName && (
            <span className="error-message">{errors.lastName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            {...getFieldProps('email')}
            className={errors.email && touched.email ? 'error' : ''}
          />
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            {...getFieldProps('password')}
            className={errors.password && touched.password ? 'error' : ''}
          />
          {errors.password && touched.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password *</label>
          <input
            type="password"
            id="confirmPassword"
            {...getFieldProps('confirmPassword')}
            className={errors.confirmPassword && touched.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="age">Age (18-120)</label>
          <input
            type="number"
            id="age"
            {...getFieldProps('age')}
            className={errors.age && touched.age ? 'error' : ''}
          />
          {errors.age && touched.age && (
            <span className="error-message">{errors.age}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="website">Website (optional)</label>
          <input
            type="url"
            id="website"
            {...getFieldProps('website')}
            className={errors.website && touched.website ? 'error' : ''}
            placeholder="https://example.com"
          />
          {errors.website && touched.website && (
            <span className="error-message">{errors.website}</span>
          )}
        </div>

        <div className="form-actions">
          <button type="button" onClick={reset} className="btn btn-secondary">
            Reset
          </button>
          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>

      <div className="code-example">
        <h2>Usage Example</h2>
        <pre>{`import { useForm, validators } from 'react-form-validator';

const MyForm = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldProps,
  } = useForm(
    { email: '', password: '' },
    {
      email: [
        validators.required('Email is required'),
        validators.email('Invalid email'),
      ],
      password: [
        validators.required('Password is required'),
        validators.minLength(8, 'Min 8 characters'),
      ],
    }
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...getFieldProps('email')} />
      {errors.email && touched.email && (
        <span>{errors.email}</span>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};`}</pre>
      </div>
    </div>
  )
}

export default App
