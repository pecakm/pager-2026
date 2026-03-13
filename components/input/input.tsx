import { InputProps } from './input.types';
import { Container } from './input.styled';

export default function Input({ className, type, placeholder }: InputProps) {
  return (
    <Container className={className} type={type} placeholder={placeholder} />
  );
}
