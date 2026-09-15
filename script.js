// Klassic Furniture Mobile JavaScript - Lightweight & High Performance
const WHATSAPP_PHONE = "2349066685585";

// Product Data store for instant modal population without network overhead
const productsData = {
  "luxury-sofa-set": {
    name: "Royal Velvet Sofa Set (3+2+1)",
    category: "Living Room",
    price: "₦480,000",
    oldPrice: "₦540,000",
    imageWebp: "images/luxury-sofa-set.webp",
    imageJpg: "images/luxury-sofa-set.jpg",
    desc: "Crafted for royalty, this set features plush high-density foam cushions wrapped in stain-resistant velvet fabric. Constructed on a solid hardwood internal frame guaranteed to last decades.",
    specs: [
      "Set includes: 1 Three-Seater, 1 Two-Seater, 1 Single Armchair",
      "Material: Premium Velvet & Solid Teak Frame",
      "Warranty: 3-Year Structural Warranty",
      "Delivery: 3 - 5 Business Days across Nigeria"
    ]
  },
  "royal-living-room": {
    name: "Grand Sovereign Lounge Suite",
    category: "Living Room",
    price: "₦750,000",
    oldPrice: "₦820,000",
    imageWebp: "images/royal-living-room.webp",
    imageJpg: "images/royal-living-room.jpg",
    desc: "An architectural statement for spacious living rooms. Includes custom curved accent armchairs, modular sectionals, and a matching handcrafted marble-top coffee table.",
    specs: [
      "Custom layout configurations available",
      "Material: Italian Leatherette & Mahogany accents",
      "Includes accent pillows & center coffee table",
      "Delivery: Free within Lagos & Abuja"
    ]
  },
  "king-executive-bed": {
    name: "Executive King Tufted Bed Frame",
    category: "Bedroom",
    price: "₦390,000",
    oldPrice: "₦430,000",
    imageWebp: "images/king-executive-bed.webp",
    imageJpg: "images/king-executive-bed.jpg",
    desc: "Transform your bedroom into a 5-star hotel suite. Standard 6x6ft king bed featuring hand-tufted padded headboard, reinforced slats, and discrete side storage drawers.",
    specs: [
      "Size: 6ft x 6ft (King Size)",
      "Features: Dual Under-bed Pull-out Storage Drawers",
      "Headboard: High-back Diamond Velvet Tufting",
      "Custom mattress fitting available on request"
    ]
  },
  "modern-dining-table": {
    name: "Klassic 6-Seater Solid Dining Set",
    category: "Dining Room",
    price: "₦340,000",
    oldPrice: "₦380,000",
    imageWebp: "images/modern-dining-table.webp",
    imageJpg: "images/modern-dining-table.jpg",
    desc: "Gather family around this elegant 6-seater dining set. Made from kiln-dried hardwood with a smooth scratch-resistant lacquer finish and comfortable padded chairs.",
    specs: [
      "Set includes: 1 Dining Table + 6 Padded Chairs",
      "Table Dimensions: 180cm x 90cm x 76cm",
      "Easy wipe-clean surface finish",
      "Sturdy anti-wobble timber legs"
    ]
  },
  "premium-lounge-armchair": {
    name: "Nordic Luxe Accent Armchair",
    category: "Living Room",
    price: "₦125,000",
    oldPrice: "₦145,000",
    imageWebp: "images/premium-lounge-armchair.webp",
    imageJpg: "images/premium-lounge-armchair.jpg",
    desc: "The perfect reading corner companion. Ergonomically contoured with sculpted wooden armrests and dense lumbar-support cushioning.",
    specs: [
      "Dimensions: 80cm W x 85cm D x 90cm H",
      "Material: Breathable Linen Blend Fabric & Ash Wood",
      "Available in Navy, Emerald Green, and Mustard Yellow"
    ]
  },
  "minimalist-office-desk": {
    name: "Executive Modern Office Desk",
    category: "Office",
    price: "₦185,000",
    oldPrice: "₦210,000",
    imageWebp: "images/minimalist-office-desk.webp",
    imageJpg: "images/minimalist-office-desk.jpg",
    desc: "Maximize workplace productivity with this spacious executive office desk. Features cable management ports, soft-close locking drawers, and solid frame stability.",
    specs: [
      "Dimensions: 140cm L x 70cm W x 75cm H",
      "Features: Built-in Lockable Drawer Unit",
      "Finish: Scratch & Water Resistant Veneer"
    ]
  }
};

// Filter Category Logic
document.addEventListener('DOMContentLoaded', () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const productCards = document.querySelectorAll('.product-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all tabs
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

// WhatsApp Order Helper Function
function orderProductWhatsApp(productName, price) {
  const message = `Hello Klassic Furniture, I'm interested in buying the *${productName}* priced at *${price}*. Please let me know the availability and delivery details.`;
  const encodedMsg = encodeURIComponent(message);
  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`;
  window.open(waUrl, '_blank');
}

// Open Product Modal
function openProductModal(productId) {
  const product = productsData[productId];
  if (!product) return;

  const modalBody = document.getElementById('modalBody');
  const modal = document.getElementById('productModal');

  const specsListHtml = product.specs.map(s => `<li>${s}</li>`).join('');
  const waMessage = `Hello Klassic Furniture, I'm interested in the *${product.name}* (${product.price}). Can you provide more details?`;
  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMessage)}`;

  modalBody.innerHTML = `
    <div class="modal-img-wrap">
      <picture>
        <source srcset="${product.imageWebp}" type="image/webp">
        <img src="${product.imageJpg}" alt="${product.name}">
      </picture>
    </div>
    <span class="product-cat">${product.category}</span>
    <h2 class="modal-title">${product.name}</h2>
    <div class="modal-price">${product.price} <span class="old-price">${product.oldPrice || ''}</span></div>
    <p class="product-desc" style="-webkit-line-clamp: initial; display: block; margin-bottom: 14px;">${product.desc}</p>

    <div class="modal-specs">
      <strong>Product Highlights & Specifications:</strong>
      <ul style="margin-top: 6px;">
        ${specsListHtml}
      </ul>
    </div>

    <a href="${waUrl}" target="_blank" class="modal-wa-btn">
      <svg viewBox="0 0 24 24" class="wa-icon-bar" style="width: 22px; height: 22px;"><path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2zm0 1.66c2.2 0 4.27.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.53c-.25-.13-1.47-.72-1.7-.81-.23-.08-.4-.13-.57.13-.17.25-.66.82-.81.99-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.57-1.37-.78-1.88-.2-.5-.41-.43-.57-.44h-.49c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.3z"/></svg>
      <span>Order This Item on WhatsApp</span>
    </a>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

// Close Product Modal
function closeProductModal() {
  const modal = document.getElementById('productModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
