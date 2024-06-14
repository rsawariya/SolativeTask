import React from 'react';
import './index.css';

interface FieldProps {
    className?: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    onKeyDown?: (key: string) => void;
}

const Field: React.FC<FieldProps> = ({ className = '', type, value, onChange, placeholder, onKeyDown, ...rest }) => {
    return (
        <input
            type={type}
            className={`search-box ${className}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            onKeyDown={(e) => onKeyDown?.(e.key)}
            {...rest}
        />
    );
};

export default React.memo(Field);
