/**
 * PricingCard - A reusable pricing card component
 * 
 * Usage:
 * const card = new PricingCard({
 *   title: "Basic Plan",
 *   price: 9.99,
 *   currency: "$",
 *   period: "/month",
 *   features: ["1 GB Storage", "Basic Support", "All Core Features"],
 *   buttonText: "Start Trial",
 *   featured: false,
 *   onButtonClick: (cardData) => { console.log('Plan selected:', cardData); }
 * });
 * 
 * document.getElementById('container').appendChild(card.render());
 */

class PricingCard {
    constructor(options = {}) {
        this.options = {
            title: options.title || "Plan",
            price: options.price || 0,
            currency: options.currency || "$",
            period: options.period || "/month",
            features: options.features || [],
            buttonText: options.buttonText || "Select Plan",
            featured: options.featured || false,
            featuredLabel: options.featuredLabel || "Most Popular",
            onButtonClick: options.onButtonClick || this.defaultClickHandler,
            className: options.className || "",
            ...options
        };
        
        this.element = null;
        this.setupStyles();
    }

    setupStyles() {
        // Only add styles once
        if (!document.getElementById('pricing-card-styles')) {
            const style = document.createElement('style');
            style.id = 'pricing-card-styles';
            style.textContent = this.getStyles();
            document.head.appendChild(style);
        }
    }

    getStyles() {
        return `
            .pricing-card {
                width: 300px;
                min-height: 400px;
                background-color: #fff;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                border-radius: 12px;
                padding: 30px 20px;
                text-align: center;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                border: 1px solid #e0e0e0;
                position: relative;
                overflow: hidden;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                box-sizing: border-box;
            }

            .pricing-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
            }

            .pricing-card.featured {
                border: 2px solid #007bff;
                position: relative;
            }

            .pricing-card.featured::before {
                content: attr(data-featured-label);
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #007bff, #0056b3);
                color: white;
                padding: 8px;
                font-size: 12px;
                font-weight: bold;
                text-transform: uppercase;
            }

            .pricing-card.featured .pricing-title {
                margin-top: 20px;
            }

            .pricing-title {
                font-size: 24px;
                font-weight: 700;
                color: #333;
                margin: 0 0 15px 0;
            }

            .pricing-price {
                font-size: 36px;
                font-weight: 800;
                color: #007bff;
                margin: 0 0 5px 0;
                display: flex;
                align-items: baseline;
                justify-content: center;
                gap: 5px;
            }

            .pricing-currency {
                font-size: 20px;
                font-weight: 600;
            }

            .pricing-period {
                font-size: 14px;
                color: #666;
                margin-bottom: 25px;
            }

            .pricing-features {
                list-style: none;
                padding: 0;
                margin: 0 0 30px 0;
                text-align: left;
            }

            .pricing-features li {
                padding: 12px 0;
                border-bottom: 1px solid #f0f0f0;
                color: #555;
                position: relative;
                padding-left: 25px;
                font-size: 14px;
                line-height: 1.4;
            }

            .pricing-features li:last-child {
                border-bottom: none;
            }

            .pricing-features li::before {
                content: "✓";
                position: absolute;
                left: 0;
                color: #28a745;
                font-weight: bold;
                font-size: 16px;
            }

            .pricing-btn {
                background: linear-gradient(135deg, #007bff, #0056b3);
                color: white;
                padding: 14px 30px;
                border: none;
                border-radius: 6px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                width: 100%;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .pricing-btn:hover {
                background: linear-gradient(135deg, #0056b3, #004085);
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
            }

            .pricing-btn:active {
                transform: translateY(0);
            }

            .pricing-btn:focus {
                outline: none;
                box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
            }

            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .pricing-card {
                    width: 100%;
                    max-width: 350px;
                    margin-bottom: 20px;
                }
            }

            @media (max-width: 480px) {
                .pricing-card {
                    padding: 20px 15px;
                }
                
                .pricing-title {
                    font-size: 20px;
                }
                
                .pricing-price {
                    font-size: 28px;
                }
            }
        `;
    }

    render() {
        const card = document.createElement('div');
        card.className = `pricing-card ${this.options.featured ? 'featured' : ''} ${this.options.className}`;
        
        if (this.options.featured) {
            card.setAttribute('data-featured-label', this.options.featuredLabel);
        }

        card.innerHTML = `
            <h2 class="pricing-title">${this.escapeHtml(this.options.title)}</h2>
            <div class="pricing-price">
                <span class="pricing-currency">${this.escapeHtml(this.options.currency)}</span>
                <span>${this.formatPrice(this.options.price)}</span>
            </div>
            <div class="pricing-period">${this.escapeHtml(this.options.period)}</div>
            
            <ul class="pricing-features">
                ${this.options.features.map(feature => 
                    `<li>${this.escapeHtml(feature)}</li>`
                ).join('')}
            </ul>
            
            <button class="pricing-btn" type="button">
                ${this.escapeHtml(this.options.buttonText)}
            </button>
        `;

        const button = card.querySelector('.pricing-btn');
        button.addEventListener('click', (e) => {
            this.addRippleEffect(e, button);
            this.options.onButtonClick(this.getCardData());
        });

        this.element = card;
        return card;
    }

    addRippleEffect(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    }

    defaultClickHandler(cardData) {
        console.log('Plan selected:', cardData);
        alert(`You selected the ${cardData.title} (${cardData.currency}${cardData.price}${cardData.period})`);
    }

    getCardData() {
        return {
            title: this.options.title,
            price: this.options.price,
            currency: this.options.currency,
            period: this.options.period,
            features: [...this.options.features],
            featured: this.options.featured,
            buttonText: this.options.buttonText
        };
    }

    formatPrice(price) {
        if (typeof price === 'number') {
            return price.toFixed(2);
        }
        return price.toString();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Update methods for dynamic changes
    updatePrice(newPrice) {
        this.options.price = newPrice;
        if (this.element) {
            const priceElement = this.element.querySelector('.pricing-price span:last-child');
            if (priceElement) {
                priceElement.textContent = this.formatPrice(newPrice);
            }
        }
    }

    updateTitle(newTitle) {
        this.options.title = newTitle;
        if (this.element) {
            const titleElement = this.element.querySelector('.pricing-title');
            if (titleElement) {
                titleElement.textContent = newTitle;
            }
        }
    }

    updateFeatures(newFeatures) {
        this.options.features = newFeatures;
        if (this.element) {
            const featuresElement = this.element.querySelector('.pricing-features');
            if (featuresElement) {
                featuresElement.innerHTML = newFeatures.map(feature => 
                    `<li>${this.escapeHtml(feature)}</li>`
                ).join('');
            }
        }
    }

    setFeatured(featured, label = "Most Popular") {
        this.options.featured = featured;
        this.options.featuredLabel = label;
        
        if (this.element) {
            if (featured) {
                this.element.classList.add('featured');
                this.element.setAttribute('data-featured-label', label);
            } else {
                this.element.classList.remove('featured');
                this.element.removeAttribute('data-featured-label');
            }
        }
    }

    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
    }
}

// Factory function for easier usage
function createPricingCard(options) {
    return new PricingCard(options);
}

// Container class for managing multiple pricing cards
class PricingCardContainer {
    constructor(containerElement, options = {}) {
        this.container = containerElement;
        this.cards = [];
        this.options = {
            responsive: options.responsive !== false,
            gap: options.gap || '20px',
            maxWidth: options.maxWidth || '1200px',
            ...options
        };
        
        this.setupContainer();
    }

    setupContainer() {
        this.container.style.cssText += `
            display: flex;
            gap: ${this.options.gap};
            justify-content: center;
            flex-wrap: wrap;
            max-width: ${this.options.maxWidth};
            margin: 0 auto;
        `;

        if (this.options.responsive) {
            const mediaStyle = document.createElement('style');
            mediaStyle.textContent = `
                @media (max-width: 768px) {
                    .pricing-container {
                        flex-direction: column;
                        align-items: center;
                    }
                }
            `;
            document.head.appendChild(mediaStyle);
            this.container.classList.add('pricing-container');
        }
    }

    addCard(cardOptions) {
        const card = new PricingCard(cardOptions);
        const cardElement = card.render();
        this.container.appendChild(cardElement);
        this.cards.push(card);
        return card;
    }

    removeCard(cardIndex) {
        if (this.cards[cardIndex]) {
            this.cards[cardIndex].destroy();
            this.cards.splice(cardIndex, 1);
        }
    }

    clearAll() {
        this.cards.forEach(card => card.destroy());
        this.cards = [];
        this.container.innerHTML = '';
    }

    getCards() {
        return [...this.cards];
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PricingCard, createPricingCard, PricingCardContainer };
}

// Global availability
if (typeof window !== 'undefined') {
    window.PricingCard = PricingCard;
    window.createPricingCard = createPricingCard;
    window.PricingCardContainer = PricingCardContainer;
}