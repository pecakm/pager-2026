import { useTranslations } from 'next-intl';

import Step1Img from './images/step1.webp';
import Step2Img from './images/step2.webp';
import Step3Img from './images/step3.webp';
import Step4aImg from './images/step4a.webp';
import Step4bImg from './images/step4b.webp';
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
  StyledImage,
} from './page.styled';

export default function Home() {
  const t = useTranslations('home');

  return (
    <Container>
      <Hero>
        <HeroIcon src="/icons/bell.svg" alt="" aria-hidden="true" width={120} height={120} />
        <Title>{t('title')}</Title>
        <Description>{t('description')}</Description>
      </Hero>
      <StepsSection>
        <StepsTitle>{t('stepsTitle')}</StepsTitle>
        <StepsList>
          <StepItem>
            {t('step1')}
            <StyledImage src={Step1Img} alt="" aria-hidden="true" width={1170} height={1598} />
          </StepItem>
          <StepItem>
            {t('step2')}
            <StyledImage src={Step2Img} alt="" aria-hidden="true" width={1170} height={866} />
          </StepItem>
          <StepItem>
            {t('step3')}
            <StyledImage src={Step3Img} alt="" aria-hidden="true" width={1170} height={788} />
          </StepItem>
          <StepItem>
            {t('step4')}
            <StyledImage src={Step4aImg} alt="" aria-hidden="true" width={1170} height={279} />
            <StyledImage src={Step4bImg} alt="" aria-hidden="true" width={1170} height={329} />
          </StepItem>
        </StepsList>
      </StepsSection>
    </Container>
  );
}
