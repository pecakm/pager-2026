import { ButtonProps } from './button.types';
import { Container } from './button.styled';

export default function Button({
  className,
  children,
  type = 'button',
  onClick,
  disabled
}: ButtonProps) {
  return (
    <Container
      className={className}
      variant="contained"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Container>
  );
}
