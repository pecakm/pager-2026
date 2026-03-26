import { getTranslations } from 'next-intl/server';

export type DashboardTranslator = Awaited<ReturnType<typeof getTranslations<'dashboard'>>>;
