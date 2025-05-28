# These are the website versions of the AIOs

---

## The concept

- The basic pages with only notes n shart will be in markdown, and will be parsed via marked.js and rendered on the "/pages" page
- Anything more specific, for example: the index cards, will be in HTML.
  - These can be rendered on the same page by importing and rendering the html
    - Benefits:
      - Is absolutely possible
      - Can be done in a single page
      - More consistent
    - If we were to use this method: things to consider:
      - Have the table go into more specific tables?
      - The more complex pages that _aren't_ markdown will need to have styles and scripts inline or somet
      - Use fetch to get the pages
  - Or they can be their own pages/sites
    - Benefits:
      - Can be easily shared, specific url for the lowest common denominator
      - Can be more interactive i guess?
      - Less of a mess in the main page
      - I guess easier? for ex: index cards will be in json, then parsed & rendered.
    - If we were to use this method: things to consider:
      - Have the go -> button for those that have independent pages
