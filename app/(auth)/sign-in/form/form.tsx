import { Input, Button } from '@/components';

import { FormContainer as Container } from '../../auth.styled';

export default function Form() {
  return (
    <Container>
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button type="submit">Sign In</Button>
    </Container>
  );
}
