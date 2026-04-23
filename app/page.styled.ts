import Image from 'next/image';
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

export const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.9rem;
  padding: 1.25rem 1.25rem 2rem;
  border: 1px solid ${Color.Border};
  border-radius: 14px;
  background-color: #fff;
`;

export const HeroIcon = styled(Image)`
  width: 6rem;
  height: 6rem;
  object-fit: contain;
  display: block;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 8vw, 2.75rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: ${Color.Primary};
`;

export const Description = styled.p`
  margin: 0;
  max-width: 34ch;
  font-size: 1rem;
  line-height: 1.65;
  color: ${Color.TextSecondary};
`;

export const StepsSection = styled.section`
  margin-top: 0.5rem;
`;

export const StepsTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: ${Color.Primary};
`;

export const StepsList = styled.ol`
  margin: 0.75rem 0 0;
  padding: 0;
  list-style: none;
  counter-reset: step;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const StepItem = styled.li`
  counter-increment: step;
  position: relative;
  padding-left: 2.35rem;
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${Color.TextSecondary};

  &::before {
    content: counter(step);
    position: absolute;
    left: 0;
    top: 0.05rem;
    width: 1.6rem;
    height: 1.6rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    border: 1px solid ${Color.Primary};
    font-size: 0.82rem;
    font-weight: 700;
    line-height: 1;
    color: ${Color.Primary};
    box-shadow: 0 2px 6px rgba(25, 76, 255, 0.12);
  }
`;

export const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
`;
