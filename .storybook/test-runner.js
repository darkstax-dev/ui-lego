module.exports = {
  async postRender(page, context) {
    // Take a screenshot for visual regression testing
    const screenshot = await page.screenshot();
    // The test-runner will automatically compare screenshots
    expect(screenshot).toMatchSnapshot();
  },
};
