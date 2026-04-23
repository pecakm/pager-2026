import { useTranslations } from 'next-intl';

import {
  Container,
  Hero,
  HeroIcon,
  Title,
  Description,
  StepsSection,
  StepsTitle,
  StepsList,
  StepItem,
} from './page.styled';

export default function Home() {
  const t = useTranslations('home');

  return (
    <Container>
      <Hero>
        <HeroIcon src="/icons/bell.svg" alt="" aria-hidden="true" />
        <Title>{t('title')}</Title>
        <Description>{t('description')}</Description>
      </Hero>
      <StepsSection>
        <StepsTitle>{t('stepsTitle')}</StepsTitle>
        <StepsList>
          <StepItem>{t('step1')}</StepItem>
          <StepItem>{t('step2')}</StepItem>
          <StepItem>{t('step3')}</StepItem>
          <StepItem>{t('step4')}</StepItem>
        </StepsList>
      </StepsSection>
    </Container>
  );
}
