import { test, expect } from '@playwright/test';

test('Додавання завдання через форму', async ({ page }) => {
  await page.goto('http://localhost:5173'); 

  const input = page.getByPlaceholder(/Add item..../i);
  await input.fill('Написати звіт по лабі');

  await page.getByText('+').click();

  await expect(page.locator('text=Написати звіт по лабі')).toBeVisible();
});