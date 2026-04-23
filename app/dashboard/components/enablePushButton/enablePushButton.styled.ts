import styled from 'styled-components';

import { Button } from '@/components';
import { Color } from '@/ui';

export const Container = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  && {
    background-color: #1976d2;

    &:hover {
      background-color: #1565c0;
    }
  }
`;

export const ErrorMessage = styled.p`
  margin-top: 0.5rem;
  font-size: 0.825rem;
  color: ${Color.Error};
`;

export const BlockedText = styled.p`
  font-size: 0.875rem;
  color: ${Color.TextSecondary};
`;
