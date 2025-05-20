import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox", { name: "Name:" }).click();
  await page.getByRole("textbox", { name: "Name:" }).fill("asdasda");
  await page.getByRole("textbox", { name: "Email:" }).click();
  await page.getByRole("textbox", { name: "Email:" }).fill("asfasfasd");
  await page.getByRole("button", { name: "Send" }).click();
  await page.getByText("Data saved successfully!").click();
  await expect(page.getByRole("textbox", { name: "Name:" })).toBeVisible();
  await page.getByRole("textbox", { name: "Email:" }).click();
  await page.getByRole("button", { name: "Send" }).click();
  await page.getByText("Data saved successfully!").click();
  await expect(page.getByRole("textbox", { name: "Name:" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Email:" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Send" })).toBeVisible();
  await expect(page.getByText("Data saved successfully!")).toBeVisible();
});
