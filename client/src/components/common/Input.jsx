import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  type = 'text',
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <input
        ref={ref}
        type={type}
        className={`input-field ${error ? 'input-error' : ''}`}
        {...props}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
