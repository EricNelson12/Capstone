import { PerfitDashboardPage } from './app.po';

describe('perfit-dashboard App', () => {
  let page: PerfitDashboardPage;

  beforeEach(() => {
    page = new PerfitDashboardPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
