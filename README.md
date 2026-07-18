# IAFPA 2026 Academic Poster

This folder contains a single-page A0 portrait academic conference poster for:

**“AI-ccent Judgements: Accent Stereotypes Persist with AI-Generated Voices”**  
Jun Liu, Department of Computational Linguistics, University of Zurich

## Files

- `index.html` — complete editable poster content
- `styles.css` — screen and print styling for A0 portrait export

No build system, package manager, external CSS framework, external font, or JavaScript framework is required.

## Open locally

Open `index.html` directly in Google Chrome.

## Edit content

Edit the text directly in `index.html`. Clearly labelled placeholders are included for missing information, including:

- University of Zurich logo
- IAFPA 2026 logo
- QR code
- verified thesis figure images

## Replace figures and logos

Search `index.html` for `REPLACE` comments. These comments mark the exact locations for:

- University of Zurich logo
- IAFPA 2026 logo
- QR code
- Figure 1
- Figure 2

For images, insert an `<img>` element inside the marked placeholder, for example:

```html
<img src="figures/figure-1.svg" alt="Model-estimated ratings by accent type">
```

SVG is recommended for charts and logos. PNG also works if the resolution is high enough for A0 printing.

## Export to PDF in Chrome

1. Open the final poster in Chrome.
2. Select Print.
3. Destination: Save as PDF.
4. Paper size: A0.
5. Orientation: Portrait.
6. Margins: None.
7. Scale: 100%.
8. Enable Background graphics.
9. Disable Headers and footers.
10. Confirm that the preview shows exactly one page.
11. Do not save the PDF if the preview shows A4 or more than one page.

## Final PDF check

Before submission, confirm that:

- the PDF contains exactly one page
- the page size is exactly **841 mm × 1189 mm**
- no content is clipped, overlapping, or spilling onto a second page
- all placeholders have either been filled or intentionally left clearly labelled
- all figures, logos, and the QR code are readable at A0 size
