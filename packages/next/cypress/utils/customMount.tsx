import { RouterContext } from 'next/dist/shared/lib/router-context';
import type { NextRouter } from 'next/router';

const createRouter: () => React.ProviderProps<NextRouter>['value'] = () => ({
  pathname: '/',
  isLocaleDomain: true,
  defaultLocale: 'pt',
  locales: ['pt', 'en'],
  isPreview: true,
  isReady: true,
  route: '/',
  query: {},
  asPath: '/',
  isFallback: true,
  basePath: '',
  events: { emit: cy.spy().as('emit'), off: cy.spy().as('off'), on: cy.spy().as('on') },
  push: cy.spy().as('push'),
  replace: cy.spy().as('replace'),
  locale: 'pt',
  reload: cy.spy().as('reload'),
  back: cy.spy().as('back'),
  prefetch: cy.stub().as('prefetch').resolves(),
  beforePopState: cy.spy().as('beforePopState'),
});

export default function customMount(elem: JSX.Element) {
  const router = createRouter();
  return cy.mount(<RouterContext.Provider value={router}>{elem}</RouterContext.Provider>);
}
