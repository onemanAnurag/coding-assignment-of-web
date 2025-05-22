# Shopify-like Product Page - Coding Assessment

## Overview

This project is a mock Shopify product page created as a coding assessment. It aims to replicate common e-commerce features found in Shopify themes, built using vanilla HTML, CSS, and JavaScript. The page is designed to be fully responsive, cleanly coded, and mimic a real Shopify storefront layout.

## Features Implemented

1.  **Scrollable Product Images Gallery:**
    *   Main image area with a set of thumbnails below.
    *   Clicking a thumbnail updates the main image.
    *   Thumbnails are horizontally scrollable if they exceed the container width (e.g., more than 4-5 images).
2.  **Size Chart Button with Modal:**
    *   A "Size Chart" button is placed near size options.
    *   Clicking the button opens a modal popup displaying a sample size chart table.
    *   The modal is dismissible via a close button, pressing the ESC key, or clicking on the overlay.
3.  **Product Variants:**
    *   Colour variations are displayed as clickable swatches.
    *   Size variations are displayed as clickable buttons (could also be a dropdown).
    *   Selecting a colour or size updates a visible product state label (e.g., "Selected: Red, M").
4.  **Compare Colours Button (with Modal):**
    *   A "Compare Colours" button.
    *   Clicking it opens a modal where users can select multiple colour swatches to view side-by-side for comparison.
5.  **Pair Well With (Complementary Products):**
    *   A horizontal scrollable row displaying 3-5 "pair well with" product cards (image, title, price, add to cart button).
6.  **Product Bundle Suggestion:**
    *   A static product bundle suggestion shown below the main product.
    *   Includes individual prices of bundled items and a combined total price.
    *   Includes a single "Add Bundle to Cart" button.
7.  **Tabs for Product Info:**
    *   Three tabs: Description, Product Information, Shipping Details.
    *   Tabs toggle content visibility using pure JavaScript.
8.  **Related Products Section:**
    *   A grid displaying 4 related product cards.
    *   Each card includes an image, product name, price, and an optional badge (e.g., "New").

**Bonus Features (Partially Implemented/Considered):**

*   **Micro-interactions:** Basic CSS transitions are used for hover effects, modal appearance, and tab animations.
*   **`localStorage` for Variants:** (Conceptual - JS hooks are present but full implementation to pre-select based on localStorage on page load would require more specific data handling).
*   **Image Zoom on Hover:** A placeholder icon is present; full implementation would require additional JS/CSS.

## Technical Requirements Met

*   Uses **vanilla HTML, CSS, and JavaScript only**.
*   **No external libraries** or Shopify Liquid.
*   Code is structured for **modularity**, is **well-commented**, and is **responsive**.
*   Uses **placeholder data** (dummy images from `https://via.placeholder.com`, product names, prices, etc.).
*   Supports **mobile, tablet, and desktop** views.

## How to run locally

1.  Clone this repository or download and extract the ZIP folder.
2.  Navigate to the project directory (e.g., `shopify-product-page/`).
3.  Open the `index.html` file in your preferred web browser.

## Folder Structure

The project follows a clear folder structure:
