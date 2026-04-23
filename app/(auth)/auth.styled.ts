import Link from 'next/link';
import styled from 'styled-components';

import { Color } from '@/ui';

export const Container = styled.main`
  width: min(100%, 480px);
  margin: 0 auto;
  padding: 2rem 1rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: ${Color.Primary};
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid ${Color.Border};
  border-radius: 10px;
  background-color: #fff;
`;

export const ErrorMessage = styled.p`
  margin: 0.125rem 0 0;
  font-size: 0.825rem;
  line-height: 1.4;
  color: ${Color.Error};
`;

export const SuccessMessage = styled.p`
  margin: 0.125rem 0 0;
  font-size: 0.825rem;
  line-height: 1.4;
  color: ${Color.TextSecondary};
`;

export const Footer = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${Color.TextSecondary};
`;

export const FooterLink = styled(Link)`
  color: ${Color.Primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: ${Color.PrimaryHover};
    text-decoration: underline;
  }
`;
