// @ts-check
import { test, expect } from '@playwright/test'

const LOCALHOST = 'http://localhost:5173/'
export const IMAGE_PREFIX_CAT_URL = 'https://cataas.com'

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST)

  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(IMAGE_PREFIX_CAT_URL)).toBeTruthy()
})
