import styled from 'styled-components';
import { Button } from '@mui/material';

import { Color } from '@/ui';

export const Container = styled(Button)`
  && {
    background-color: ${Color.Primary};

    &:hover {
      background-color: ${Color.PrimaryHover};
    }
  }
`;
