import Link from 'next/link';
import styled from 'styled-components';

import { Color } from '@/ui';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid ${Color.Border};
  background-color: #fff;
`;

export const BrandLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.02em;

  &:hover {
    opacity: 0.7;
  }
`;

export const LoggedInActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
`;

export const UserEmail = styled.span`
  font-size: 0.8125rem;
  color: rgba(0, 0, 0, 0.5);
  max-width: 14rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const NavLink = styled(Link)`
  flex-shrink: 0;
  font-size: 0.875rem;
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;
