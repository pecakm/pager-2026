import styled from 'styled-components';

import { Button } from '@/components';
import { Color } from '@/ui';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: min(100%, 34rem);
  padding: 1rem;
  border: 1px solid ${Color.Border};
  border-radius: 10px;
  background-color: #fff;
`;

export const SendButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: fit-content;
`;

export const ErrorMessage = styled.p`
  margin-top: -0.125rem;
  font-size: 0.825rem;
  color: #b91c1c;
`;
