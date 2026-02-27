from playwright.sync_api import Page, expect, sync_playwright

def test_tags_deep_link(page: Page):

  # This test verifies that clicking a tag link on the homepage navigates to the tags page
  # and scrolls to the specific tag section.

  # 1. Arrange: Go to the homepage.
  page.goto('file:///app/dist/index.html')

  # 2. Act: Find a tag link and click it.
  # We look for a link that contains a tag. Based on the codebase, tags are prefixed with #.
  # Let's try to find a tag link.
  tag_link = page.locator('a[href^="/tags/#tag-"]').first

  if tag_link.count() > 0:
      tag_href = tag_link.get_attribute('href')
      tag_id = tag_href.split('#')[1]
      print(f'Clicking tag link: {tag_href}')
      tag_link.click()

      # 3. Assert: Confirm the navigation was successful.
      # We expect the URL to contain the tag fragment.
      # Since we are using file:// protocol, the URL might be a bit different, but the fragment should be there.
      expect(page).to_have_url(f'file:///app/dist/tags/index.html#{tag_id}')

      # 4. Assert: Confirm the target element exists and has the correct ID.
      target_element = page.locator(f'#{tag_id}')
      expect(target_element).to_be_visible()

      # 5. Screenshot: Capture the final result for visual verification.
      page.screenshot(path='/app/verification.png')
  else:
      print('No tag links found on the homepage.')
      page.screenshot(path='/app/verification_no_tags.png')

if __name__ == "__main__":
  with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    try:
      test_tags_deep_link(page)
    finally:
      browser.close()
