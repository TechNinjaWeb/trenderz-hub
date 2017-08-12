import { TrenderzHubPage } from './app.po';

describe('trenderz-hub App', () => {
  let page: TrenderzHubPage;

  beforeEach(() => {
    page = new TrenderzHubPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
