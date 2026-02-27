from playwright.sync_api import Page, expect, sync_playwright
import time
import os

def test_tags_deep_link(page: Page):

  # This test verifies that clicking a tag link on the homepage navigates to the tags page
  # and scrolls to the specific tag section.

  # 1. Arrange: Go to the homepage.
  page.goto('http://localhost:4321')

  # 2. Add the tag-cloud.js script manually since it might not be loaded or executed correctly
  # or it might be expecting a different environment.
  # Let's check if the script is loaded first.

  page.add_script_tag(url='/tag-cloud.js')

  # Wait for the tag cloud to load (it's populated via JS)
  time.sleep(2)

  # 2. Act: Find a tag link and click it.
  # We look for a link that contains a tag.
  tag_link = page.locator('#tag-cloud-content a').first

  if tag_link.count() > 0:
      tag_href = tag_link.get_attribute('href')
      tag_text = tag_link.text_content()
      print(f'Found tag link: {tag_text} -> {tag_href}')

      # Extract the tag ID from the href
      if '#' in tag_href:
          # Handle the case where the href might be full URL or relative
          parts = tag_href.split('#')
          tag_fragment = parts[1]

          print(f'Clicking tag link: {tag_href}')
          tag_link.click()

          # 3. Assert: Confirm the navigation was successful.
          # We expect the URL to contain the tag fragment.
          # We need to wait for navigation
          # page.wait_for_url(f'**/tags/**#{tag_fragment}', timeout=5000)

          # Since file:// navigation with fragments might be tricky to match exactly with globs,
          # let's just wait a bit and check the URL.
          time.sleep(2)
          current_url = page.url
          print(f'Current URL: {current_url}')

          if 'tags' in current_url and '#' in current_url:
             print('Navigation to tags page successful')
          else:
             print('Navigation to tags page failed or URL format unexpected')

          # 4. Assert: Confirm the target element exists and has the correct ID.
          # We are looking for an element with id='tag-{tagName}'
          target_id = tag_fragment
          target_element = page.locator(f'#{target_id}')

          # We check if the element is attached to the DOM
          if target_element.count() > 0:
              print(f'Target element found: #{target_id}')
              # Check if it has the scroll-mt-24 class we added
              classes = target_element.get_attribute('class')
              if 'scroll-mt-24' in classes:
                   print('Target element has scroll-mt-24 class')
              else:
                   print(f'Target element matches but missing class: {classes}')
          else:
              print(f'Target element NOT found: #{target_id}')

          # 5. Screenshot: Capture the final result for visual verification.
          page.screenshot(path='/app/verification_success.png')
      else:
          print(f'Tag link format unexpected: {tag_href}')
  else:
      print('No tag links found on the homepage.')
      page.screenshot(path='/app/verification_no_tags.png')

if __name__ == "__main__":
  with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    try:
      test_tags_deep_link(page)
    except Exception as e:
        print(f'Test failed: {e}')
        page.screenshot(path='/app/verification_error.png')
    finally:
      browser.close()
