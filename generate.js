const fs = require('fs');
const index = fs.readFileSync('index.html', 'utf8');

const headObj = index.match(/([\s\S]*?<\/header>)/)[1];
const footerObj = index.match(/(<!-- ===== FOOTER SECTION ===== -->[\s\S]*)/)[1];

// Update nav links in header to point back to index.html
let newHeader = headObj
  .replace(/href="#home"/g, 'href="index.html#home"')
  .replace(/href="#about"/g, 'href="index.html#about"')
  .replace(/href="#pricing"/g, 'href="index.html#pricing"')
  .replace(/href="#contact"/g, 'href="index.html#contact"');
// And make products link active and point to products.html
newHeader = newHeader
  .replace(/href=\"#products\"\s*class=\"nav__link\"/, 'href="products.html" class="nav__link active"')
  .replace(/href=\"#home\"\s*class=\"nav__link active\"/, 'href="index.html#home" class="nav__link"');

// Update footer links
let newFooter = footerObj
  .replace(/href="#home"/g, 'href="index.html#home"')
  .replace(/href="#about"/g, 'href="index.html#about"')
  .replace(/href="#products"/g, 'href="products.html"')
  .replace(/href="#contact"/g, 'href="index.html#contact"');

const productsContent = `
    <!-- ===== PAGE HERO ===== -->
    <section class="hero page-hero" style="min-height: 40vh; padding-top: 140px; padding-bottom: 60px; background: var(--gray-50); align-items: flex-start;">
        <div class="container">
            <div class="section-header" style="margin-bottom: 0;">
                <span class="section__tag">Our Collection</span>
                <h1 class="section-header__title">Complete <span class="gradient-text">Product Range</span></h1>
                <div class="section-header__line"></div>
                <p class="section-header__desc">Explore our premium refurbished devices and top-tier accessories. Handpicked, quality tested, and backed by exceptional support.</p>
            </div>
        </div>
    </section>

    <!-- ===== ALL PRODUCTS ===== -->
    <section class="section" id="all-products">
        <div class="container">
            <div class="products-grid products-grid--detailed">

                <!-- Product 1 -->
                <div class="product-card detailed-card animate-reveal">
                    <div class="product-card__carousel" data-carousel>
                        <div class="carousel__track">
                            <div class="carousel__slide active"><img src="images/refurbished-mobiles.png" alt="Refurbished Mobile 1" loading="lazy"></div>
                            <div class="carousel__slide"><img src="images/refurbished-mobiles-2.png" alt="Refurbished Mobile 2" loading="lazy"></div>
                            <div class="carousel__slide"><img src="images/refurbished-mobiles.png" alt="Refurbished Mobile 3" loading="lazy"></div>
                        </div>
                        <div class="carousel__dots">
                            <button class="carousel__dot active" data-slide="0"></button>
                            <button class="carousel__dot" data-slide="1"></button>
                            <button class="carousel__dot" data-slide="2"></button>
                        </div>
                        <button class="carousel__btn carousel__btn--prev" aria-label="Previous">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                        </button>
                        <button class="carousel__btn carousel__btn--next" aria-label="Next">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="2" stroke-linecap=\"round\"/></svg>
                        </button>
                    </div>
                    <div class="product-card__body">
                        <span class="product-card__badge">Bestseller</span>
                        <h3 class="product-card__title">Premium Refurbished Mobiles</h3>
                        <p class="product-card__desc">Experience flagship performance at a fraction of the cost. Our certified refurbished smartphones look and feel brand new, passing a rigorous quality check process.</p>
                        
                        <div class="detailed-card__features">
                            <h4>Specifications & Features:</h4>
                            <ul>
                                <li><strong>Quality:</strong> 42-Point QC Passed</li>
                                <li><strong>Battery:</strong> Minimum 85% Health</li>
                                <li><strong>Warranty:</strong> 1-Year Extended Coverage</li>
                                <li><strong>Accessories:</strong> Includes Charger & Cable</li>
                            </ul>
                        </div>

                        <div class="detailed-card__actions">
                            <a href="https://wa.me/917003482511?text=I'm%20interested%20in%20Premium%20Refurbished%20Mobiles" class="btn btn--whatsapp" target="_blank">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.002 0C5.378 0 0 5.373 0 12c0 2.128.555 4.194 1.611 6.012L.425 24l6.126-1.606C8.307 23.447 10.128 24 12.002 24c6.623 0 12-5.373 12-12s-5.377-12-12-12zm0 21.996c-1.8 0-3.565-.483-5.111-1.398l-.367-.217-3.799.996.996-3.704-.239-.379C2.483 15.656 1.996 13.847 1.996 12c0-5.518 4.49-10.005 10.006-10.005 5.515 0 10.003 4.487 10.003 10.005s-4.486 10.004-10.003 10.004z"/></svg>
                                WhatsApp
                            </a>
                            <a href="tel:+917003482511" class="btn btn--call">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Product 2 -->
                <div class="product-card detailed-card animate-reveal" style="--delay: 0.1s">
                    <div class="product-card__carousel" data-carousel>
                        <div class="carousel__track">
                            <div class="carousel__slide active"><img src="images/earbuds.png" alt="Wireless Earbuds 1" loading="lazy"></div>
                            <div class="carousel__slide"><img src="images/earbuds.png" alt="Wireless Earbuds 2" loading="lazy"></div>
                            <div class="carousel__slide"><img src="images/earbuds.png" alt="Wireless Earbuds 3" loading="lazy"></div>
                        </div>
                        <div class="carousel__dots">
                            <button class="carousel__dot active" data-slide="0"></button>
                            <button class="carousel__dot" data-slide="1"></button>
                            <button class="carousel__dot" data-slide="2"></button>
                        </div>
                        <button class="carousel__btn carousel__btn--prev" aria-label="Previous">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                        </button>
                        <button class="carousel__btn carousel__btn--next" aria-label="Next">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                        </button>
                    </div>
                    <div class="product-card__body">
                        <span class="product-card__badge product-card__badge--new">New Arrival</span>
                        <h3 class="product-card__title">True Wireless Earbuds</h3>
                        <p class="product-card__desc">Immerse yourself in crystal-clear audio with Active Noise Cancellation and deep bass response. Engineered for all-day comfort.</p>
                        
                        <div class="detailed-card__features">
                            <h4>Specifications & Features:</h4>
                            <ul>
                                <li><strong>Audio:</strong> Active Noise Cancelling (ANC)</li>
                                <li><strong>Playback:</strong> 30 Hours Battery Life</li>
                                <li><strong>Protection:</strong> IPX4 Water Resistant</li>
                                <li><strong>Drivers:</strong> 11mm Dynamic Drivers</li>
                            </ul>
                        </div>

                        <div class="detailed-card__actions">
                            <a href="https://wa.me/910000000000?text=I'm%20interested%20in%20True%20Wireless%20Earbuds" class="btn btn--whatsapp" target="_blank">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.002 0C5.378 0 0 5.373 0 12c0 2.128.555 4.194 1.611 6.012L.425 24l6.126-1.606C8.307 23.447 10.128 24 12.002 24c6.623 0 12-5.373 12-12s-5.377-12-12-12zm0 21.996c-1.8 0-3.565-.483-5.111-1.398l-.367-.217-3.799.996.996-3.704-.239-.379C2.483 15.656 1.996 13.847 1.996 12c0-5.518 4.49-10.005 10.006-10.005 5.515 0 10.003 4.487 10.003 10.005s-4.486 10.004-10.003 10.004z"/></svg>
                                WhatsApp
                            </a>
                            <a href="tel:+910000000000" class="btn btn--call">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Product 3 -->
                <div class="product-card detailed-card animate-reveal" style="--delay: 0.2s">
                    <div class="product-card__carousel" data-carousel>
                        <div class="carousel__track">
                            <div class="carousel__slide active"><img src="images/headphones.png" alt="Over-ear Headphones" loading="lazy"></div>
                            <div class="carousel__slide"><img src="images/headphones.png" alt="Over-ear Headphones 2" loading="lazy"></div>
                            <div class="carousel__slide"><img src="images/headphones.png" alt="Over-ear Headphones 3" loading="lazy"></div>
                        </div>
                        <div class="carousel__dots">
                            <button class="carousel__dot active" data-slide="0"></button>
                            <button class="carousel__dot" data-slide="1"></button>
                            <button class="carousel__dot" data-slide="2"></button>
                        </div>
                        <button class="carousel__btn carousel__btn--prev" aria-label="Previous">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                        </button>
                        <button class="carousel__btn carousel__btn--next" aria-label="Next">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                        </button>
                    </div>
                    <div class="product-card__body">
                        <span class="product-card__badge">Popular</span>
                        <h3 class="product-card__title">Studio Headphones</h3>
                        <p class="product-card__desc">Studio-grade over-ear headphones with premium drivers and exceptional noise isolation. Perfect for audiophiles and professionals.</p>
                        
                        <div class="detailed-card__features">
                            <h4>Specifications & Features:</h4>
                            <ul>
                                <li><strong>Isolation:</strong> Over-Ear Closed Back</li>
                                <li><strong>Comfort:</strong> Plush Memory Foam Cushions</li>
                                <li><strong>Drivers:</strong> 40mm Neodymium</li>
                                <li><strong>Connectivity:</strong> Bluetooth 5.3 & Wired</li>
                            </ul>
                        </div>

                        <div class="detailed-card__actions">
                            <a href="https://wa.me/910000000000?text=I'm%20interested%20in%20Studio%20Headphones" class="btn btn--whatsapp" target="_blank">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.002 0C5.378 0 0 5.373 0 12c0 2.128.555 4.194 1.611 6.012L.425 24l6.126-1.606C8.307 23.447 10.128 24 12.002 24c6.623 0 12-5.373 12-12s-5.377-12-12-12zm0 21.996c-1.8 0-3.565-.483-5.111-1.398l-.367-.217-3.799.996.996-3.704-.239-.379C2.483 15.656 1.996 13.847 1.996 12c0-5.518 4.49-10.005 10.006-10.005 5.515 0 10.003 4.487 10.003 10.005s-4.486 10.004-10.003 10.004z"/></svg>
                                WhatsApp
                            </a>
                            <a href="tel:+910000000000" class="btn btn--call">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Product 4 -->
                <div class="product-card detailed-card animate-reveal" style="--delay: 0.3s">
                    <div class="product-card__carousel" data-carousel>
                        <div class="carousel__track">
                            <div class="carousel__slide active"><img src="images/speakers.png" alt="Bluetooth Speaker" loading="lazy"></div>
                            <div class="carousel__slide"><img src="images/speakers.png" alt="Bluetooth Speaker 2" loading="lazy"></div>
                            <div class="carousel__slide"><img src="images/speakers.png" alt="Bluetooth Speaker 3" loading="lazy"></div>
                        </div>
                        <div class="carousel__dots">
                            <button class="carousel__dot active" data-slide="0"></button>
                            <button class="carousel__dot" data-slide="1"></button>
                            <button class="carousel__dot" data-slide="2"></button>
                        </div>
                        <button class="carousel__btn carousel__btn--prev" aria-label="Previous">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                        </button>
                        <button class="carousel__btn carousel__btn--next" aria-label="Next">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                        </button>
                    </div>
                    <div class="product-card__body">
                        <span class="product-card__badge product-card__badge--new">Trending</span>
                        <h3 class="product-card__title">Portable Speaker</h3>
                        <p class="product-card__desc">Take the party anywhere with our rugged, waterproof Bluetooth speaker delivering 360° immersive surround sound.</p>
                        
                        <div class="detailed-card__features">
                            <h4>Specifications & Features:</h4>
                            <ul>
                                <li><strong>Sound:</strong> 360° Surround Audio</li>
                                <li><strong>Durability:</strong> IP67 Waterproof & Dustproof</li>
                                <li><strong>Battery:</strong> 20 Hours Playback</li>
                                <li><strong>Pairing:</strong> Multi-speaker Sync</li>
                            </ul>
                        </div>

                        <div class="detailed-card__actions">
                            <a href="https://wa.me/910000000000?text=I'm%20interested%20in%20Portable%20Speakers" class="btn btn--whatsapp" target="_blank">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.002 0C5.378 0 0 5.373 0 12c0 2.128.555 4.194 1.611 6.012L.425 24l6.126-1.606C8.307 23.447 10.128 24 12.002 24c6.623 0 12-5.373 12-12s-5.377-12-12-12zm0 21.996c-1.8 0-3.565-.483-5.111-1.398l-.367-.217-3.799.996.996-3.704-.239-.379C2.483 15.656 1.996 13.847 1.996 12c0-5.518 4.49-10.005 10.006-10.005 5.515 0 10.003 4.487 10.003 10.005s-4.486 10.004-10.003 10.004z"/></svg>
                                WhatsApp
                            </a>
                            <a href="tel:+910000000000" class="btn btn--call">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Product 5 -->
                <div class="product-card detailed-card animate-reveal" style="--delay: 0.4s">
                    <div class="product-card__carousel" data-carousel>
                        <div class="carousel__track">
                            <div class="carousel__slide active"><img src="images/smart-watches.png" alt="Smart Watch" loading="lazy"></div>
                            <div class="carousel__slide"><img src="images/smart-watches.png" alt="Smart Watch 2" loading="lazy"></div>
                            <div class="carousel__slide"><img src="images/smart-watches.png" alt="Smart Watch 3" loading="lazy"></div>
                        </div>
                        <div class="carousel__dots">
                            <button class="carousel__dot active" data-slide="0"></button>
                            <button class="carousel__dot" data-slide="1"></button>
                            <button class="carousel__dot" data-slide="2"></button>
                        </div>
                        <button class="carousel__btn carousel__btn--prev" aria-label="Previous">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                        </button>
                        <button class="carousel__btn carousel__btn--next" aria-label="Next">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                        </button>
                    </div>
                    <div class="product-card__body">
                        <span class="product-card__badge">Bestseller</span>
                        <h3 class="product-card__title">Smart Watches</h3>
                        <p class="product-card__desc">Stay connected and track your health with our premium feature-packed smartwatches. Sleek design meets ultimate functionality.</p>
                        
                        <div class="detailed-card__features">
                            <h4>Specifications & Features:</h4>
                            <ul>
                                <li><strong>Display:</strong> Always-on AMOLED display</li>
                                <li><strong>Sensors:</strong> Heart Rate, SpO2, Sleep Tracking</li>
                                <li><strong>Compatibility:</strong> iOS & Android Supported</li>
                                <li><strong>Battery:</strong> Up to 14 days on typical use</li>
                            </ul>
                        </div>

                        <div class="detailed-card__actions">
                            <a href="https://wa.me/910000000000?text=I'm%20interested%20in%20Smart%20Watches" class="btn btn--whatsapp" target="_blank">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.002 0C5.378 0 0 5.373 0 12c0 2.128.555 4.194 1.611 6.012L.425 24l6.126-1.606C8.307 23.447 10.128 24 12.002 24c6.623 0 12-5.373 12-12s-5.377-12-12-12zm0 21.996c-1.8 0-3.565-.483-5.111-1.398l-.367-.217-3.799.996.996-3.704-.239-.379C2.483 15.656 1.996 13.847 1.996 12c0-5.518 4.49-10.005 10.006-10.005 5.515 0 10.003 4.487 10.003 10.005s-4.486 10.004-10.003 10.004z"/></svg>
                                WhatsApp
                            </a>
                            <a href="tel:+910000000000" class="btn btn--call">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
`;

fs.writeFileSync('products.html', newHeader + productsContent + newFooter);
console.log('products.html generated.');
