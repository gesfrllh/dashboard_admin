import React from 'react';
import { BaseInputProps } from '../types/component';

const BaseInput: React.FC<BaseInputProps> = ({ value, onChange, type = 'text', placeholder = '', label, name }) => {
  return (
    <div className="base-input">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
};

export default BaseInput;
