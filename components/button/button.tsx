import { ButtonProps } from './button.types';
import { Container } from './button.styled';

export default function Button({ className, children, type = 'button' }: ButtonProps) {
  return (
    <Container className={className} type={type}>
      {children}
    </Container>
  );
}
