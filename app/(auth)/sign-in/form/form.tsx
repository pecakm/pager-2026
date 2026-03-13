import { FormContainer as Container } from '../../auth.styled';

export default function Form() {
  return (
    <Container>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Sign In</button>
    </Container>
  );
}
