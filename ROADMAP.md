# AI Hardware Builder - Development Roadmap

## Overview

This roadmap breaks down the development into manageable phases, from MVP to full-featured marketplace.

**Timeline:** Build incrementally, validate early, ship often.

---

## Phase 1: MVP Foundation (Week 1-2)

**Goal:** Functional builder that answers "Can I run this model?"

### 1.1 Project Setup
- [x] Create ARCHITECTURE.md
- [x] Create ROADMAP.md
- [ ] Initialize Next.js 14+ with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Install shadcn/ui
- [ ] Setup Prisma + PostgreSQL
- [ ] Configure environment variables
- [ ] Setup Git workflow

### 1.2 Database Schema
- [ ] Create Prisma schema
- [ ] Add core models: AIModel, GPU, CPU, Motherboard, PSU, RAM, Storage
- [ ] Add pricing models: Retailer, Price
- [ ] Add build models: Build, BuildComponent
- [ ] Add quantization model
- [ ] Create initial migration
- [ ] Test database connection

### 1.3 Seed Data
- [ ] Seed 50 popular AI models
  - Llama family (3.3, 4)
  - Qwen family (2.5, 3)
  - DeepSeek (V3, R1)
  - Mistral family
  - Gemma 2
  - Phi-4
  - Command R+
- [ ] Seed 30 GPUs
  - RTX 50 series (5090, 5080, 5070 Ti)
  - RTX 40 series (4090, 4080, 4070 Ti)
  - RTX 6000 Ada, RTX PRO series
  - A100, H100 (reference)
- [ ] Seed 20 CPUs (Intel + AMD)
- [ ] Seed 15 motherboards
- [ ] Seed 10 PSUs
- [ ] Seed 10 RAM configurations
- [ ] Seed 8 storage options
- [ ] Add quantization data for each model (FP16, Q8, Q6, Q5, Q4)
- [ ] Mark all estimated data with `isEstimated: true`

### 1.4 Core Business Logic
- [ ] Memory Calculator
  - Calculate VRAM from parameters + quantization
  - Calculate KV cache requirements
  - Apply safety margin
  - Return confidence level
- [ ] Compatibility Engine
  - Check VRAM sufficiency
  - Validate PCIe slots
  - Calculate PSU requirements
  - Check socket compatibility
  - Validate RAM compatibility
- [ ] Performance Estimator (basic)
  - Estimate tokens/sec from GPU specs
  - Mark all estimates clearly
- [ ] Build Generator
  - Generate cheapest build
  - Generate balanced build
  - Generate performance build
  - Calculate total cost

### 1.5 API Layer
- [ ] Create `/api/models` endpoints
  - GET /api/models (list)
  - GET /api/models/[slug] (detail)
- [ ] Create `/api/gpus` endpoints
  - GET /api/gpus (list)
  - GET /api/gpus/[slug] (detail)
- [ ] Create `/api/calculate` endpoints
  - POST /api/calculate/memory
  - POST /api/calculate/compatibility
  - POST /api/calculate/performance
- [ ] Create `/api/builds` endpoints
  - POST /api/builds/generate
  - GET /api/builds/[slug]

### 1.6 Landing Page
- [ ] Hero section with CTA
- [ ] Value proposition
- [ ] Popular models showcase
- [ ] Popular GPUs showcase
- [ ] How it works section
- [ ] CTA to builder
- [ ] Responsive design
- [ ] Dark/light mode

### 1.7 Builder Wizard (MVP)
- [ ] Step 1: Model selection
  - Search models
  - Browse categories
  - Select model
- [ ] Step 2: Budget input
  - Currency selector (USD default)
  - Budget slider/input
- [ ] Step 3: Priority selection
  - Cheapest
  - Balanced
  - Performance
- [ ] Step 4: Results
  - Show 3 builds
  - Show total cost
  - Show estimated VRAM
  - Show compatibility status
  - Show component list
  - Show "Buy" buttons (placeholder)

### 1.8 Model Pages
- [ ] Model detail layout
- [ ] Model specs display
- [ ] Memory requirements table (by quantization)
- [ ] Recommended builds
- [ ] SEO metadata
- [ ] Responsive design

### 1.9 GPU Pages
- [ ] GPU detail layout
- [ ] GPU specs display
- [ ] Compatible models list
- [ ] Current prices (when available)
- [ ] SEO metadata
- [ ] Responsive design

### 1.10 MVP Polish
- [ ] Fix all TypeScript errors
- [ ] Fix all console errors
- [ ] Mobile responsive testing
- [ ] Basic SEO (meta tags, sitemap)
- [ ] Page load optimization
- [ ] Error handling
- [ ] Loading states

**MVP Definition of Done:**
- User can select model, budget, and priority
- System generates 3 valid builds
- Builds show cost, VRAM, compatibility
- Pages load in < 3s
- Mobile responsive
- No critical errors

---

## Phase 2: Price Intelligence (Week 3)

**Goal:** Real pricing data and deal detection

### 2.1 Pricing System
- [ ] Add 5-10 US retailers
  - Amazon
  - Newegg
  - B&H Photo
  - Micro Center
  - Best Buy
- [ ] Manual price entry interface (admin)
- [ ] Price update workflow
- [ ] Display current prices in builder
- [ ] Display current prices on product pages

### 2.2 Price History
- [ ] Record price changes
- [ ] Display price history chart
- [ ] Show historical high/low/average
- [ ] Calculate "good deal" indicators

### 2.3 Deal Detection
- [ ] Flag prices below average
- [ ] Flag prices near historical low
- [ ] Show deal badges (🔥)
- [ ] Create deals page
- [ ] Show latest deals on homepage

### 2.4 Currency Support
- [ ] Support USD, COP, MXN, BRL
- [ ] Currency conversion
- [ ] User currency preference
- [ ] Display prices in user currency

**Phase 2 Done:**
- Real prices displayed
- Deal detection working
- Price history visible
- Multi-currency support

---

## Phase 3: Benchmarks & Performance (Week 4)

**Goal:** Real performance data where available

### 3.1 Benchmark System
- [ ] Create benchmark ingestion UI (admin)
- [ ] Add 50+ real benchmarks
  - Source from public datasets
  - Community benchmarks
  - Manufacturer data
- [ ] Display benchmarks on model pages
- [ ] Display benchmarks on GPU pages
- [ ] Show confidence levels (HIGH/MEDIUM/LOW)

### 3.2 Performance Engine v2
- [ ] Use real benchmarks when available (HIGH confidence)
- [ ] Interpolate from similar configs (MEDIUM confidence)
- [ ] Estimate from GPU specs (LOW confidence)
- [ ] Show performance ranges
- [ ] Display methodology

### 3.3 Performance Visualization
- [ ] Tokens/sec estimates in builder
- [ ] Performance comparison charts
- [ ] GPU comparison tool
- [ ] Model comparison tool

**Phase 3 Done:**
- Real benchmarks integrated
- Performance estimates improved
- Confidence levels clear
- Comparison tools working

---

## Phase 4: Affiliate Marketplace (Week 5)

**Goal:** Monetization via affiliate links

### 4.1 Affiliate Integration
- [ ] Amazon Associates integration
- [ ] Newegg affiliate program
- [ ] Other affiliate programs
- [ ] Affiliate link generation
- [ ] Track affiliate clicks

### 4.2 Buy Flow
- [ ] Show best available deals per component
- [ ] "Buy now" buttons with affiliate links
- [ ] Multi-retailer comparison
- [ ] Show shipping/availability
- [ ] Track click-through rate

### 4.3 Promotions
- [ ] Promotion system (discount codes, bundles)
- [ ] Display active promotions
- [ ] Highlight limited-time offers
- [ ] Email promotions to users (future)

### 4.4 Analytics
- [ ] Track builder usage
- [ ] Track model searches
- [ ] Track GPU views
- [ ] Track affiliate clicks
- [ ] Track purchase intent signals
- [ ] Dashboard for KPIs

**Phase 4 Done:**
- Affiliate links working
- Revenue tracking
- Analytics dashboard
- Monetization enabled

---

## Phase 5: User Features (Week 6)

**Goal:** User accounts and personalization

### 5.1 Authentication
- [ ] Implement Clerk or Auth.js
- [ ] Login/signup flow
- [ ] User profile page
- [ ] Guest users supported

### 5.2 Saved Builds
- [ ] Save builds (auth required)
- [ ] View saved builds
- [ ] Edit builds
- [ ] Delete builds
- [ ] Share builds (public URL)

### 5.3 Price Alerts
- [ ] Create price alert
- [ ] Set target price
- [ ] Alert notification system
- [ ] Email notifications
- [ ] Manage alerts

### 5.4 Favorites
- [ ] Favorite models
- [ ] Favorite GPUs
- [ ] Favorite builds (other users)
- [ ] View favorites

### 5.5 Social Features
- [ ] Build sharing (Open Graph)
- [ ] Build view counter
- [ ] Popular builds page
- [ ] Trending models page

**Phase 5 Done:**
- User accounts working
- Saved builds functional
- Price alerts active
- Social sharing enabled

---

## Phase 6: Advanced Features (Week 7-8)

**Goal:** Power user features and optimization

### 6.1 AI Assistant
- [ ] Integrate OpenAI or similar
- [ ] Create tool/function calling setup
- [ ] Chat interface
- [ ] Natural language queries
  - "Can I run Llama 4 with a 4090?"
  - "Best GPU under $1000 for LLMs"
- [ ] Prevent AI hallucination (use database, not LLM memory)

### 6.2 Advanced Calculator
- [ ] Multi-GPU support
- [ ] Scaling factor calculation
- [ ] NVLink/SLI detection
- [ ] Power consumption calculator
- [ ] Cost per token calculator
- [ ] ROI calculator (cloud vs local)

### 6.3 Build Optimizer
- [ ] Optimize for specific constraints
  - Quietest build
  - Smallest build
  - Most efficient
  - Best upgrade path
- [ ] Component alternatives
- [ ] "What if" scenarios

### 6.4 Comparison Tools
- [ ] GPU vs GPU (detailed)
- [ ] Model vs Model
- [ ] Build vs Build
- [ ] Side-by-side specs
- [ ] Performance charts
- [ ] Price comparison

### 6.5 Guides & Content
- [ ] "How much VRAM do I need?" guide
- [ ] Quantization explained
- [ ] Multi-GPU guide
- [ ] Cloud vs Local calculator
- [ ] Blog/guides CMS (future)

**Phase 6 Done:**
- AI assistant functional
- Advanced calculators working
- Comparison tools built
- Educational content published

---

## Phase 7: SEO & Growth (Week 9-10)

**Goal:** Organic traffic and discoverability

### 7.1 SEO Infrastructure
- [ ] Sitemap generation
- [ ] robots.txt
- [ ] Structured data (JSON-LD)
- [ ] Open Graph tags
- [ ] Twitter cards
- [ ] Canonical URLs

### 7.2 Programmatic SEO
- [ ] Generate `/run/[model]` pages
- [ ] Generate `/best-gpu-for/[model]` pages
- [ ] Generate `/best-ai-pc-under/[budget]` pages
- [ ] Generate `/compare/[gpu1]-vs-[gpu2]` pages
- [ ] Dynamic metadata per page
- [ ] Internal linking strategy

### 7.3 Content
- [ ] FAQ page
- [ ] Glossary (VRAM, quantization, etc.)
- [ ] Popular searches
- [ ] Trending models
- [ ] How-to guides

### 7.4 Performance
- [ ] Lighthouse audit (score 90+)
- [ ] Core Web Vitals optimization
- [ ] Image optimization
- [ ] Code splitting
- [ ] Database query optimization
- [ ] Caching strategy

### 7.5 International
- [ ] Colombia market support
- [ ] Add Colombian retailers
- [ ] COP pricing
- [ ] Localized content (ES)
- [ ] Shipping/import calculator

**Phase 7 Done:**
- SEO score > 90
- Programmatic pages live
- International support
- Traffic growing

---

## Phase 8: B2B & Enterprise (Week 11-12)

**Goal:** Enterprise customers and consulting

### 8.1 B2B Features
- [ ] Bulk configurator
- [ ] Quote generation
- [ ] ROI calculator (advanced)
- [ ] Cloud vs local analysis
- [ ] Multi-use case analysis
- [ ] Enterprise pricing

### 8.2 Server Builds
- [ ] Server-grade components
- [ ] Rack-mount builds
- [ ] Multi-GPU servers (4-8 GPUs)
- [ ] Enterprise GPUs (A100, H100, etc.)
- [ ] Network/storage for servers

### 8.3 Consulting
- [ ] Contact form for enterprises
- [ ] Custom build consultation
- [ ] Hardware procurement assistance
- [ ] Infrastructure design

**Phase 8 Done:**
- B2B features working
- Server configurator
- Lead generation functional

---

## Phase 9: Robotics Expansion (Future)

**Goal:** Expand beyond AI PCs into robotics and automation

### 9.1 Robotics Database
- [ ] Add robot component categories
  - Robot arms
  - Sensors (LiDAR, cameras, IMU)
  - Controllers
  - Actuators
  - AMR platforms
  - Cobots
- [ ] Add robotics workloads
  - Computer vision
  - SLAM
  - Motion planning
  - Manipulation
- [ ] Robotics-specific specs

### 9.2 Robotics Builder
- [ ] Robot hardware configurator
- [ ] Workload-based recommendations
- [ ] Edge AI hardware
- [ ] Industrial PC builds
- [ ] Sensor compatibility

### 9.3 Robotics Marketplace
- [ ] Robotics retailers
- [ ] Industrial suppliers
- [ ] Component distributors
- [ ] Pricing and availability

**Phase 9 Done:**
- Robotics catalog live
- Robotics builder working
- Market expansion started

---

## Technical Debt & Maintenance

### Ongoing Tasks
- [ ] Write unit tests for core logic
- [ ] Write integration tests
- [ ] Setup CI/CD
- [ ] Monitor error rates
- [ ] Optimize slow queries
- [ ] Security audits
- [ ] Dependency updates
- [ ] Documentation updates

### Performance Monitoring
- [ ] Setup error tracking (Sentry)
- [ ] Setup performance monitoring
- [ ] Database query monitoring
- [ ] API response time tracking
- [ ] Core Web Vitals tracking

---

## Success Metrics

### MVP (Phase 1)
- [ ] 100 builder completions
- [ ] 1000 page views
- [ ] < 3s page load
- [ ] > 90% mobile responsive score

### Growth (Phase 2-4)
- [ ] 1000 builder completions/month
- [ ] 10,000 page views/month
- [ ] 100 affiliate clicks/month
- [ ] $1000 influenced GMV/month

### Scale (Phase 5-7)
- [ ] 10,000 builder completions/month
- [ ] 100,000 page views/month
- [ ] 1000 affiliate clicks/month
- [ ] $10,000 influenced GMV/month

### Enterprise (Phase 8+)
- [ ] 10 B2B leads/month
- [ ] 1 enterprise customer
- [ ] $100,000+ influenced GMV/month

---

## Risks & Mitigations

### Risk: Data Accuracy
- **Mitigation:** Clearly mark estimates, show confidence levels, cite sources

### Risk: Price Data Staleness
- **Mitigation:** Price update jobs, last-updated timestamps, "check retailer" disclaimers

### Risk: Over-Engineering
- **Mitigation:** Ship MVP first, validate, then add features incrementally

### Risk: SEO Competition
- **Mitigation:** Focus on unique value (AI-specific), programmatic SEO, quality content

### Risk: Affiliate Rejection
- **Mitigation:** Build organic value first, apply to programs after traffic validation

---

## Next Steps

1. ✅ Create ARCHITECTURE.md
2. ✅ Create ROADMAP.md
3. ⏭️ Initialize Next.js project
4. ⏭️ Setup database schema
5. ⏭️ Seed initial data
6. ⏭️ Implement core business logic
7. ⏭️ Build MVP UI

**Start Date:** 2026-08-13  
**Target MVP Date:** 2 weeks from start  
**Target Launch:** 4 weeks from start

---

**Remember:** Ship early, ship often. Don't over-engineer. Focus on user value.
