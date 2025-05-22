document.addEventListener('DOMContentLoaded', () => {
    // --- Helper: Manage active classes ---
    function setActiveClass(elements, activeElement, className = 'active') {
        elements.forEach(el => el.classList.remove(className));
        if (activeElement) {
            activeElement.classList.add(className);
        }
    }

    // --- 1. Scrollable Product Images Gallery ---
    const mainProductImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            if (mainProductImage) {
                mainProductImage.src = this.dataset.fullimage;
                mainProductImage.alt = this.alt.replace('Thumbnail', 'Main Product Image');
            }
            setActiveClass(thumbnails, this);
        });
    });

    // --- Modal Handling (Generic) ---
    const allModals = document.querySelectorAll('.modal');
    
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
            modal.setAttribute('aria-hidden', 'false');
            const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) firstFocusable.focus();
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = ''; // Restore scroll
            modal.setAttribute('aria-hidden', 'true');
            // Return focus to the button that opened the modal if possible
            const triggerButton = document.querySelector(`[data-modal-target="${modal.id}"]`);
            if (triggerButton) triggerButton.focus();
        }
    }

    allModals.forEach(modal => {
        // Close buttons inside modal
        modal.querySelectorAll('[data-dismiss="modal"]').forEach(button => {
            button.addEventListener('click', () => closeModal(modal));
        });
        // Overlay click
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => closeModal(modal));
        }
    });

    // ESC key to close modals
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const openModalElement = document.querySelector('.modal.open');
            if (openModalElement) {
                closeModal(openModalElement);
            }
        }
    });
    
    // --- 2. Size Chart Button with Modal ---
    const sizeChartBtn = document.getElementById('sizeChartBtn');
    if (sizeChartBtn) {
        sizeChartBtn.setAttribute('data-modal-target', 'sizeChartModal'); // For focus return
        sizeChartBtn.addEventListener('click', () => openModal('sizeChartModal'));
    }

    // --- 3. Product Variants ---
    const colorSwatches = document.querySelectorAll('.color-swatches .swatch');
    const sizeButtons = document.querySelectorAll('.size-options .size-btn');
    const selectedColorNameSpan = document.getElementById('selectedColorName');
    const selectedSizeNameSpan = document.getElementById('selectedSizeName');
    const variantDisplayP = document.querySelector('.selected-variant-display');

    let currentSelectedColor = 'Red'; // Default
    let currentSelectedSize = 'M';   // Default

    function updateVariantDisplay() {
        if (selectedColorNameSpan) selectedColorNameSpan.textContent = currentSelectedColor;
        if (selectedSizeNameSpan) selectedSizeNameSpan.textContent = currentSelectedSize;
        if (variantDisplayP) variantDisplayP.textContent = `Selected: ${currentSelectedColor}, ${currentSelectedSize}`;
        
        // Bonus: Persist to localStorage (simple example)
        // try {
        //    localStorage.setItem('productVariantSelection', JSON.stringify({ color: currentSelectedColor, size: currentSelectedSize }));
        // } catch (e) { console.warn("LocalStorage not available or quota exceeded."); }
    }
    updateVariantDisplay(); // Initial call

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            setActiveClass(colorSwatches, this);
            currentSelectedColor = this.dataset.color;
            updateVariantDisplay();
            // Example: Update main image if color-specific images are available
            // This assumes a naming convention like `Main+Image+2_Blue` if thumbnails carry color info
            const colorSpecificImage = Array.from(thumbnails).find(t => t.dataset.fullimage.includes(`_${currentSelectedColor}`));
            if (colorSpecificImage && mainProductImage) {
                mainProductImage.src = colorSpecificImage.dataset.fullimage;
                setActiveClass(thumbnails, colorSpecificImage);
            }
        });
    });

    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            setActiveClass(sizeButtons, this);
            currentSelectedSize = this.dataset.size;
            updateVariantDisplay();
        });
    });

    // --- Quantity Selector ---
    const quantityInput = document.getElementById('quantity');
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            if (this.dataset.action === 'increase') {
                quantityInput.value = currentValue + 1;
            } else if (this.dataset.action === 'decrease' && currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    });

    // --- 4. Compare Colours Button with Modal ---
    const compareColorsBtn = document.getElementById('compareColorsBtn');
    const compareColorsModal = document.getElementById('compareColorsModal');
    const compareSwatchOptionsContainer = compareColorsModal ? compareColorsModal.querySelector('.compare-swatch-options') : null;
    const colorComparisonArea = compareColorsModal ? compareColorsModal.querySelector('.color-comparison-area') : null;
    const clearComparisonBtn = document.getElementById('clearComparisonBtn');
    let selectedColorsForCompare = [];

    function renderCompareSwatches() {
        if (!compareSwatchOptionsContainer) return;
        compareSwatchOptionsContainer.innerHTML = ''; // Clear existing
        colorSwatches.forEach(originalSwatch => {
            const compareSwatch = originalSwatch.cloneNode(true);
            compareSwatch.classList.remove('active'); // Ensure no 'active' from main page
            if (selectedColorsForCompare.find(c => c.color === originalSwatch.dataset.color)) {
                compareSwatch.classList.add('selected-for-compare');
            }
            compareSwatch.addEventListener('click', function() {
                const colorData = {
                    color: this.dataset.color,
                    value: this.dataset.colorValue || this.style.backgroundColor
                };
                const index = selectedColorsForCompare.findIndex(c => c.color === colorData.color);
                if (index > -1) { // Already selected, so deselect
                    selectedColorsForCompare.splice(index, 1);
                    this.classList.remove('selected-for-compare');
                } else { // Not selected, so select
                    selectedColorsForCompare.push(colorData);
                    this.classList.add('selected-for-compare');
                }
                renderComparisonArea();
            });
            compareSwatchOptionsContainer.appendChild(compareSwatch);
        });
    }

    function renderComparisonArea() {
        if (!colorComparisonArea) return;
        colorComparisonArea.innerHTML = '';
        selectedColorsForCompare.forEach(colorData => {
            const block = document.createElement('div');
            block.classList.add('compared-color-block');
            block.style.backgroundColor = colorData.value;
            block.setAttribute('aria-label', `Comparing ${colorData.color}`);
            colorComparisonArea.appendChild(block);
        });
    }

    if (compareColorsBtn) {
        compareColorsBtn.setAttribute('data-modal-target', 'compareColorsModal');
        compareColorsBtn.addEventListener('click', () => {
            selectedColorsForCompare = []; // Reset on open or keep state? Let's reset.
            renderCompareSwatches();
            renderComparisonArea();
            openModal('compareColorsModal');
        });
    }
    if (clearComparisonBtn) {
        clearComparisonBtn.addEventListener('click', () => {
            selectedColorsForCompare = [];
            renderCompareSwatches(); // Re-render options to remove 'selected-for-compare' class
            renderComparisonArea();
        });
    }

    // --- 7. Tabs for Product Info ---
    const tabButtons = document.querySelectorAll('.tab-navigation .tab-button');
    const tabContents = document.querySelectorAll('.tab-content-area .tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            setActiveClass(tabButtons, this);
            const targetTabId = this.dataset.tab;
            tabContents.forEach(content => {
                if (content.id === targetTabId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // Bonus: Initial load from localStorage (example snippet)
    // (This would need more robust data mapping if variants affect pricing/images directly)
    // try {
    //     const savedVariant = JSON.parse(localStorage.getItem('productVariantSelection'));
    //     if (savedVariant) {
    //         console.log("Loading variant from localStorage:", savedVariant);
    //         const savedColorSwatch = Array.from(colorSwatches).find(s => s.dataset.color === savedVariant.color);
    //         const savedSizeButton = Array.from(sizeButtons).find(b => b.dataset.size === savedVariant.size);
    //         if (savedColorSwatch) savedColorSwatch.click();
    //         if (savedSizeButton) savedSizeButton.click();
    //     }
    // } catch(e) { console.warn("Could not load variant from localStorage."); }

    console.log("Product page script loaded and initialized.");
});