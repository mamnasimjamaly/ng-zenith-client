import { NgZenithWebsitePage } from './app.po';

describe('ng-zenith-website App', function() {
  let page: NgZenithWebsitePage;

  beforeEach(() => {
    page = new NgZenithWebsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
