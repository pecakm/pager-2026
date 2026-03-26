import { InputProps } from './input.types';
import { Container } from './input.styled';

export default function Input({
  className,
  placeholder,
  id,
  type,
  name,
  autoComplete,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  inputRef,
  maxLength,
}: InputProps) {
  return (
    <Container
      className={className}
      placeholder={placeholder}
      id={id}
      type={type}
      name={name}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      inputRef={inputRef}
      inputProps={maxLength !== undefined ? { maxLength } : undefined}
    />
  );
}
