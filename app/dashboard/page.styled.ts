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

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: ${Color.Primary};
`;

export const Messages = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  overflow: hidden;
`;

export const MessagesHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 0;
  border-bottom: 1px solid ${Color.Border};
`;

export const MessagesTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: #171717;
`;

export const MessageItem = styled.li`
  margin-top: 0.5rem;
  padding: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
  font-size: 0.8rem;
  line-height: 1.45;
  color: #262626;
`;
