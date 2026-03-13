import { FormContainer as Container } from '../../auth.styled';

export default function Form() {
  return (
    <Container>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm Password" />
      <button type="submit">Sign Up</button>
    </Container>
  );
}
