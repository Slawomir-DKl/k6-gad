import { browser } from "k6/browser";
import { check } from "https://jslib.k6.io/k6-utils/1.5.0/index.js";

export const options = {
  scenarios: {
    browser: {
      executor: "shared-iterations",
      options: {
        browser: {
          type: "chromium",
        },
      },
    },
  },
};

export default async function () {
  // Arrange
  const page = await browser.newPage();
  const url = "http://localhost:3000/articles.html";
  const articleTitleLink = page.locator('[data-testid="article-57-title"]');

  // Act
  await page.goto(url);
  await articleTitleLink.click();

  // Assert
  await check(page.locator('#title'), {
    article_title: async (title) => (await title.textContent()) === 'Myth: Testing is only for finding bugs'
  });

  page.close();
}
