import { WanderoPage } from './app.po';

describe('wandero App', () => {
  let page: WanderoPage;

  beforeEach(() => {
    page = new WanderoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
