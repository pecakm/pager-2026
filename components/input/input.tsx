import { InputProps } from './input.types';
import { Container } from './input.styled';

export default function Input({ className, ...rest }: InputProps) {
  return <Container className={className} {...rest} />;
}
