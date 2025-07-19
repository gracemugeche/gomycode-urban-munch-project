# PricingCard Component

A modern, responsive, and reusable pricing card component built with vanilla JavaScript. Perfect for subscription services, SaaS applications, and any website that needs professional pricing displays.

## 🎯 Features

- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Reusable**: Easy to integrate into any project with minimal setup
- **Customizable**: Extensive styling options and custom CSS class support
- **Interactive**: Smooth hover effects, click animations, and custom event handlers
- **Accessible**: Proper semantic HTML and keyboard navigation support
- **Modern Design**: Clean, professional appearance with smooth animations
- **Dynamic Updates**: Update pricing, features, and styling in real-time
- **Featured Cards**: Highlight special offers with customizable badges
- **No Dependencies**: Pure vanilla JavaScript, no external libraries required

## 🚀 Quick Start

### 1. Include the Component

```html
<script src="PricingCard.js"></script>
```

### 2. Create a Basic Card

```javascript
const card = new PricingCard({
    title: "Basic Plan",
    price: 9.99,
    currency: "$",
    period: "/month",
    features: [
        "1 GB Storage",
        "Basic Support",
        "All Core Features"
    ],
    buttonText: "Start Trial",
    onButtonClick: (data) => {
        console.log('Plan selected:', data);
    }
});

document.getElementById('container').appendChild(card.render());
```

## 📖 API Reference

### PricingCard Constructor Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | String | `"Plan"` | The plan title/name |
| `price` | Number/String | `0` | The price value |
| `currency` | String | `"$"` | Currency symbol |
| `period` | String | `"/month"` | Billing period |
| `features` | Array | `[]` | List of features |
| `buttonText` | String | `"Select Plan"` | Button text |
| `featured` | Boolean | `false` | Whether to highlight as featured |
| `featuredLabel` | String | `"Most Popular"` | Text for featured badge |
| `className` | String | `""` | Additional CSS classes |
| `onButtonClick` | Function | Default handler | Click event callback |

### Instance Methods

#### `render()`
Returns the DOM element for the pricing card.

```javascript
const cardElement = card.render();
document.body.appendChild(cardElement);
```

#### `updatePrice(newPrice)`
Updates the price dynamically.

```javascript
card.updatePrice(19.99);
```

#### `updateTitle(newTitle)`
Updates the title dynamically.

```javascript
card.updateTitle("Premium Plan");
```

#### `updateFeatures(newFeatures)`
Updates the features list.

```javascript
card.updateFeatures([
    "10 GB Storage",
    "Priority Support",
    "Advanced Features"
]);
```

#### `setFeatured(featured, label)`
Set or remove featured status.

```javascript
card.setFeatured(true, "Best Value");
card.setFeatured(false); // Remove featured status
```

#### `getCardData()`
Returns the current card configuration.

```javascript
const data = card.getCardData();
console.log(data); // { title, price, currency, period, features, ... }
```

#### `destroy()`
Removes the card from the DOM and cleans up.

```javascript
card.destroy();
```

## 🎨 Advanced Usage

### Using PricingCardContainer

For managing multiple cards:

```javascript
const container = new PricingCardContainer(
    document.getElementById('pricing-section'),
    {
        responsive: true,
        gap: '30px',
        maxWidth: '1200px'
    }
);

// Add multiple cards
container.addCard({
    title: "Basic",
    price: 9.99,
    features: ["1 GB Storage", "Basic Support"]
});

container.addCard({
    title: "Pro",
    price: 19.99,
    featured: true,
    features: ["10 GB Storage", "Priority Support", "Advanced Analytics"]
});

container.addCard({
    title: "Enterprise",
    price: 49.99,
    features: ["Unlimited Storage", "24/7 Support", "Custom Integration"]
});
```

### Custom Styling

Add custom CSS classes:

```javascript
const card = new PricingCard({
    title: "Premium",
    price: 29.99,
    className: "custom-theme dark-mode",
    // ... other options
});
```

```css
.custom-theme {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: 2px solid #764ba2;
}

.custom-theme .pricing-title,
.custom-theme .pricing-features li {
    color: white;
}

.custom-theme .pricing-btn {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
```

### Custom Event Handlers

```javascript
const card = new PricingCard({
    title: "Professional",
    price: 39.99,
    onButtonClick: (cardData) => {
        // Custom logic
        track('pricing_card_click', {
            plan: cardData.title,
            price: cardData.price
        });
        
        // Redirect to checkout
        window.location.href = `/checkout?plan=${cardData.title}&price=${cardData.price}`;
    }
});
```

## 🎯 Examples

### Example 1: Basic Three-Tier Pricing

```javascript
const plans = [
    {
        title: "Starter",
        price: 9.99,
        features: ["1 GB Storage", "Email Support", "Basic Features"]
    },
    {
        title: "Professional",
        price: 29.99,
        featured: true,
        featuredLabel: "Most Popular",
        features: ["10 GB Storage", "Priority Support", "Advanced Features", "Analytics"]
    },
    {
        title: "Enterprise",
        price: 99.99,
        features: ["Unlimited Storage", "24/7 Phone Support", "All Features", "Custom Integration"]
    }
];

const container = document.getElementById('pricing-container');
plans.forEach(plan => {
    const card = new PricingCard(plan);
    container.appendChild(card.render());
});
```

### Example 2: Dynamic Pricing with Discounts

```javascript
let isAnnual = false;

function createPricingCard(basePrice, title, features) {
    const price = isAnnual ? basePrice * 10 : basePrice; // 2 months free annually
    const period = isAnnual ? "/year" : "/month";
    
    return new PricingCard({
        title,
        price,
        period,
        features,
        onButtonClick: (data) => handleSubscription(data, isAnnual)
    });
}

function toggleBilling() {
    isAnnual = !isAnnual;
    // Recreate cards with new pricing
    updatePricingDisplay();
}
```

### Example 3: Integration with Payment Systems

```javascript
const card = new PricingCard({
    title: "Pro Plan",
    price: 19.99,
    onButtonClick: async (cardData) => {
        try {
            // Show loading state
            const button = event.target;
            button.textContent = 'Processing...';
            button.disabled = true;
            
            // Integration with Stripe
            const response = await createCheckoutSession({
                priceId: getPriceId(cardData.title),
                quantity: 1
            });
            
            // Redirect to checkout
            await redirectToCheckout(response.sessionId);
            
        } catch (error) {
            console.error('Payment error:', error);
            button.textContent = 'Try Again';
            button.disabled = false;
        }
    }
});
```

## 🐛 Troubleshooting

### Common Issues

**1. Styles not applying correctly**
- Ensure the component is loaded before creating cards
- Check for CSS conflicts with existing styles
- Verify that the component's CSS is properly injected

**2. Cards not responsive**
- Make sure the viewport meta tag is included:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```

**3. Button clicks not working**
- Check that the `onButtonClick` function is properly defined
- Verify there are no JavaScript errors in the console

**4. Cards not displaying**
- Ensure the container element exists when creating cards
- Check that `card.render()` is called and the result is appended to the DOM

### Performance Tips

1. **Reuse instances**: Instead of creating new cards frequently, update existing ones using the update methods
2. **Batch updates**: When updating multiple properties, batch them together to avoid multiple reflows
3. **Use PricingCardContainer**: For multiple cards, use the container class for better performance and layout management

## 🔧 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- IE 11+ (with polyfills for modern JavaScript features)

## 📄 License

MIT License - feel free to use in commercial and personal projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

---

## 📋 Original Issues Fixed

The original broken component had several critical issues that have been resolved:

### 🔧 HTML/CSS Bugs Fixed:
- ❌ **Broken HTML tag**: `<h2 class="title">Basic Plan<h2>` → ✅ `<h2 class="pricing-title">Basic Plan</h2>`
- ❌ **CSS typo**: `box-shdow` → ✅ `box-shadow`
- ❌ **Poor alignment**: Fixed text alignment and centering
- ❌ **Non-responsive design** → ✅ Added comprehensive responsive breakpoints
- ❌ **Inconsistent spacing** → ✅ Proper margin/padding system
- ❌ **Poor button styling** → ✅ Modern gradient buttons with hover effects

### 🎨 Design Improvements:
- ✅ Modern card design with rounded corners and proper shadows
- ✅ Professional typography with proper font weights
- ✅ Consistent color scheme with accessible contrast
- ✅ Smooth hover animations and transitions
- ✅ Professional pricing display with proper currency formatting
- ✅ Visual feature list with checkmark icons
- ✅ Featured card highlighting system

### ⚡ Functionality Enhancements:
- ✅ Fully reusable component architecture
- ✅ Dynamic content updates
- ✅ Event handling system
- ✅ Container management for multiple cards
- ✅ Custom styling support
- ✅ Accessibility improvements
- ✅ Mobile-responsive layout
- ✅ Touch-friendly interactions

The component is now production-ready and can be easily integrated into any modern web application!
