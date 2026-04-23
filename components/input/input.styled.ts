import styled from 'styled-components';
import { TextField } from '@mui/material';

import { Color } from '@/ui';

export const Container = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      border-radius: 10px;
      background-color: #fff;
      color: ${Color.Primary};
      font-size: 0.95rem;

      .MuiOutlinedInput-notchedOutline {
        border-color: ${Color.Border};
      }

      &:hover .MuiOutlinedInput-notchedOutline {
        border-color: ${Color.TextSecondary};
      }

      &.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: ${Color.Primary};
        border-width: 1px;
      }

      &.Mui-error .MuiOutlinedInput-notchedOutline {
        border-color: ${Color.Error};
      }
    }

    .MuiInputBase-input {
      padding: 0.675rem 0.875rem;
      line-height: 1.4;
    }

    .MuiInputBase-input::placeholder {
      color: ${Color.TextSecondary};
      opacity: 1;
    }

    .MuiFormHelperText-root {
      margin: 0.35rem 0.125rem 0;
      font-size: 0.825rem;
      color: ${Color.TextSecondary};
    }

    .MuiFormHelperText-root.Mui-error {
      color: ${Color.Error};
    }
  }
`;
