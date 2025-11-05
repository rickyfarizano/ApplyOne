export const puppeteerConfig = {
  headless: process.env.SCRAPE_HEADLESS === "true",
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-notifications",
    "--start-maximized",
  ],
  defaultViewport: null
}
