# AI Hardware Builder - Architecture

## Product Overview

AI Hardware Marketplace & Intelligent AI PC Builder - A platform that answers: "What hardware do I need to run this AI model with my budget?"

**Core Problem Solved:**
"I want to run [AI Model]. I have [Budget]. What hardware do I need, what performance can I expect, and where can I buy it at the best price?"

## Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **State Management:** React hooks + Server Components
- **Forms:** React Hook Form + Zod validation

### Backend
- **API:** Next.js API Routes (Server Actions where appropriate)
- **Runtime:** Node.js 22+

### Database
- **Primary DB:** PostgreSQL 16+
- **ORM:** Prisma
- **Migrations:** Prisma Migrate
- **Seeding:** Prisma Seed

### Authentication
- **Auth Provider:** Clerk or Auth.js (NextAuth)
- **Optional for MVP:** Guest users can use builder without auth

### Caching (Future)
- **Cache:** Redis (only if needed)
- **CDN:** Vercel Edge or Cloudflare

### Jobs (Future)
- **Scheduler:** Vercel Cron or BullMQ
- **Use Cases:** Price updates, deal monitoring

### Search
- **MVP:** PostgreSQL full-text search
- **Future:** Meilisearch or Typesense (only if necessary)

### Deployment
- **Platform:** Vercel (recommended) or Railway
- **Database:** Neon, Supabase, or Railway Postgres
- **CDN:** Automatic via Vercel
- **Analytics:** Vercel Analytics or Plausible

## Architecture Principles

1. **Don't Over-Engineer:** Start simple, scale later
2. **Server-First:** Leverage Next.js Server Components
3. **Type Safety:** TypeScript strict mode everywhere
4. **No Hallucination:** Never fabricate data - mark estimates clearly
5. **Explainable Recommendations:** Deterministic logic, not black-box AI
6. **Performance:** Static generation where possible, ISR for dynamic data
7. **SEO-First:** Every page optimized for search
8. **Mobile-First:** Responsive from day one
9. **Data Provenance:** Track source of every data point
10. **Extensible:** Design for future robotics/automation expansion

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                   │
│  ┌─────────────┬──────────────┬─────────────┬─────────────┐ │
│  │   Landing   │    Builder   │   Models    │    GPUs     │ │
│  │    Pages    │   Wizard     │   Catalog   │   Catalog   │ │
│  └─────────────┴──────────────┴─────────────┴─────────────┘ │
└───────────────────────────────┬─────────────────────────────┘
                                │
┌───────────────────────────────┴─────────────────────────────┐
│                    API Layer (Server Actions)                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Models  │  GPUs  │  Builder  │  Compatibility  │ Prices│
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────────┬─────────────────────────────┘
                                │
┌───────────────────────────────┴─────────────────────────────┐
│                      Business Logic Layer                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ • Recommendation Engine                              │   │
│  │ • Compatibility Engine                               │   │
│  │ • Memory Calculator                                  │   │
│  │ • Performance Estimator                              │   │
│  │ • Build Generator                                    │   │
│  │ • Price Intelligence                                 │   │
│  │ • Multi-GPU Calculator                               │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────────┬─────────────────────────────┘
                                │
┌───────────────────────────────┴─────────────────────────────┐
│                     Data Layer (Prisma)                      │
└───────────────────────────────┬─────────────────────────────┘
                                │
┌───────────────────────────────┴─────────────────────────────┐
│                     PostgreSQL Database                      │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema

### Core Entities

#### Models
```prisma
model AIModel {
  id                String   @id @default(cuid())
  name              String
  slug              String   @unique
  developer         String
  parameters        BigInt?  // e.g., 235000000000 for 235B
  architecture      String?  // e.g., "Mixture of Experts"
  contextLength     Int?     // e.g., 262144
  modalities        String[] // ["text", "vision"]
  releaseDate       DateTime?
  huggingFaceId     String?
  license           String?
  description       String?
  
  // Memory requirements per quantization
  quantizations     ModelQuantization[]
  benchmarks        Benchmark[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model ModelQuantization {
  id                String   @id @default(cuid())
  modelId           String
  model             AIModel  @relation(fields: [modelId], references: [id])
  
  quantizationType  String   // FP16, INT8, Q8, Q6, Q5, Q4, etc.
  vramRequired      Int      // in GB
  ramRequired       Int?     // in GB
  isEstimated       Boolean  @default(false)
  confidence        String   // HIGH, MEDIUM, LOW
  
  source            String?
  sourceUrl         String?
  retrievedAt       DateTime?
  
  @@unique([modelId, quantizationType])
}
```

#### Hardware

```prisma
model GPU {
  id                String   @id @default(cuid())
  manufacturer      String   // NVIDIA, AMD, Intel, Apple
  model             String
  slug              String   @unique
  
  vram              Int      // in GB
  memoryType        String?  // GDDR6X, HBM3, etc.
  memoryBandwidth   Int?     // GB/s
  tdp               Int?     // Watts
  architecture      String?  // Ada Lovelace, RDNA 3, etc.
  
  cudaCores         Int?
  tensorCores       Int?
  
  fp16Performance   Float?   // TFLOPS
  fp8Performance    Float?   // TFLOPS
  
  msrp              Decimal? @db.Decimal(10, 2)
  releaseDate       DateTime?
  
  pcieVersion       String?  // 4.0, 5.0
  pcieSlots         Int      @default(2) // Physical slots
  powerConnectors   String?  // 16-pin, 8-pin x3, etc.
  length            Int?     // mm
  height            Int?     // mm
  width             Int?     // mm
  
  benchmarks        Benchmark[]
  prices            Price[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model CPU {
  id                String   @id @default(cuid())
  manufacturer      String   // Intel, AMD
  model             String
  slug              String   @unique
  
  cores             Int
  threads           Int
  baseClock         Float    // GHz
  boostClock        Float?   // GHz
  socket            String
  pcieLanes         Int
  tdp               Int      // Watts
  
  ramType           String[] // DDR4, DDR5
  maxRam            Int      // GB
  
  msrp              Decimal? @db.Decimal(10, 2)
  releaseDate       DateTime?
  
  prices            Price[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model Motherboard {
  id                String   @id @default(cuid())
  manufacturer      String
  model             String
  slug              String   @unique
  
  socket            String
  chipset           String
  formFactor        String   // ATX, MICRO-ATX, MINI-ITX
  
  pcieSlots         Json     // {x16: 2, x8: 1, x4: 2, x1: 1}
  maxGpus           Int      // Physical GPU support
  
  ramType           String   // DDR4, DDR5
  ramSlots          Int
  maxRam            Int      // GB
  
  m2Slots           Int
  sataSlots         Int
  
  hasWifi           Boolean  @default(false)
  hasEthernet       String?  // 1GbE, 2.5GbE, 10GbE
  
  msrp              Decimal? @db.Decimal(10, 2)
  
  prices            Price[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model PSU {
  id                String   @id @default(cuid())
  manufacturer      String
  model             String
  slug              String   @unique
  
  wattage           Int
  efficiency        String   // 80+ Bronze, Gold, Platinum, Titanium
  modular           String   // Full, Semi, Non
  formFactor        String   // ATX, SFX
  
  pcie5Connectors   Int      @default(0) // 16-pin
  pcie4Connectors   Int      @default(0) // 8-pin
  
  msrp              Decimal? @db.Decimal(10, 2)
  
  prices            Price[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model RAM {
  id                String   @id @default(cuid())
  manufacturer      String
  model             String
  slug              String   @unique
  
  capacity          Int      // GB
  ddrGeneration     String   // DDR4, DDR5
  speed             Int      // MHz
  modules           Int      // 1, 2, 4
  ecc               Boolean  @default(false)
  
  msrp              Decimal? @db.Decimal(10, 2)
  
  prices            Price[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model Storage {
  id                String   @id @default(cuid())
  manufacturer      String
  model             String
  slug              String   @unique
  
  capacity          Int      // GB
  interface         String   // NVMe, SATA
  formFactor        String   // M.2, 2.5"
  readSpeed         Int?     // MB/s
  writeSpeed        Int?     // MB/s
  
  msrp              Decimal? @db.Decimal(10, 2)
  
  prices            Price[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
```

#### Benchmarks

```prisma
model Benchmark {
  id                String   @id @default(cuid())
  
  modelId           String
  model             AIModel  @relation(fields: [modelId], references: [id])
  
  gpuId             String
  gpu               GPU      @relation(fields: [gpuId], references: [id])
  
  quantization      String
  runtime           String?  // llama.cpp, vllm, TGI, etc.
  contextLength     Int?
  batchSize         Int?
  
  tokensPerSecond   Float?
  promptSpeed       Float?
  generationSpeed   Float?
  
  powerDraw         Int?     // Watts
  
  source            String
  sourceUrl         String?
  benchmarkDate     DateTime?
  
  isEstimated       Boolean  @default(false)
  confidence        String   // HIGH, MEDIUM, LOW
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@unique([modelId, gpuId, quantization])
}
```

#### Pricing & Marketplace

```prisma
model Retailer {
  id                String   @id @default(cuid())
  name              String
  slug              String   @unique
  country           String   // US, CO, MX, BR, etc.
  url               String
  logoUrl           String?
  
  hasAffiliateProgram Boolean @default(false)
  affiliateNetwork    String? // Amazon Associates, etc.
  
  shippingInfo      String?
  returnsInfo       String?
  
  prices            Price[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model Price {
  id                String   @id @default(cuid())
  
  retailerId        String
  retailer          Retailer @relation(fields: [retailerId], references: [id])
  
  // Polymorphic relation to products
  productType       String   // GPU, CPU, MOTHERBOARD, PSU, RAM, STORAGE
  productId         String
  
  sku               String?
  productUrl        String
  affiliateUrl      String?
  
  price             Decimal  @db.Decimal(10, 2)
  currency          String   // USD, COP, MXN, BRL, EUR
  
  inStock           Boolean  @default(true)
  shippingCost      Decimal? @db.Decimal(10, 2)
  taxes             Decimal? @db.Decimal(10, 2)
  
  discount          Decimal? @db.Decimal(10, 2)
  couponCode        String?
  
  priceHistory      PriceHistory[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@unique([retailerId, productType, productId])
  @@index([productType, productId])
}

model PriceHistory {
  id                String   @id @default(cuid())
  
  priceId           String
  price             Price    @relation(fields: [priceId], references: [id])
  
  price             Decimal  @db.Decimal(10, 2)
  inStock           Boolean
  
  recordedAt        DateTime @default(now())
  
  @@index([priceId, recordedAt])
}
```

#### Builds & User Data

```prisma
model Build {
  id                String   @id @default(cuid())
  userId            String?  // Nullable for guest users
  
  name              String?
  slug              String   @unique
  
  modelId           String?
  targetModel       AIModel? @relation(fields: [modelId], references: [id])
  
  budget            Decimal? @db.Decimal(10, 2)
  currency          String   @default("USD")
  priority          String   // PRICE, BALANCED, PERFORMANCE, EFFICIENCY
  
  components        BuildComponent[]
  
  totalCost         Decimal  @db.Decimal(10, 2)
  estimatedVram     Int?
  estimatedPerformance Float?
  estimatedPower    Int?
  
  isPublic          Boolean  @default(true)
  viewCount         Int      @default(0)
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model BuildComponent {
  id                String   @id @default(cuid())
  
  buildId           String
  build             Build    @relation(fields: [buildId], references: [id])
  
  componentType     String   // GPU, CPU, MOTHERBOARD, PSU, RAM, STORAGE
  componentId       String
  
  quantity          Int      @default(1)
  price             Decimal  @db.Decimal(10, 2)
  
  retailerId        String?
  purchaseUrl       String?
  
  createdAt         DateTime @default(now())
}

model User {
  id                String   @id @default(cuid())
  email             String   @unique
  name              String?
  
  country           String?
  currency          String   @default("USD")
  
  priceAlerts       PriceAlert[]
  savedBuilds       String[] // Build IDs
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model PriceAlert {
  id                String   @id @default(cuid())
  
  userId            String
  user              User     @relation(fields: [userId], references: [id])
  
  productType       String
  productId         String
  
  targetPrice       Decimal  @db.Decimal(10, 2)
  currency          String
  
  isActive          Boolean  @default(true)
  triggered         Boolean  @default(false)
  triggeredAt       DateTime?
  
  createdAt         DateTime @default(now())
}
```

#### System Tables

```prisma
model DataSource {
  id                String   @id @default(cuid())
  name              String
  type              String   // API, MANUAL, SCRAPER, BENCHMARK
  url               String?
  lastSync          DateTime?
  status            String   // ACTIVE, INACTIVE, ERROR
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model Country {
  id                String   @id @default(cuid())
  code              String   @unique // US, CO, MX
  name              String
  currency          String
  isActive          Boolean  @default(true)
  
  createdAt         DateTime @default(now())
}
```

## Core Business Logic

### 1. Memory Calculator

```typescript
interface MemoryRequirement {
  vramGB: number;
  ramGB: number;
  isEstimated: boolean;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  breakdown: {
    weights: number;
    kvCache: number;
    overhead: number;
  };
}

function calculateMemoryRequirement(
  model: AIModel,
  quantization: string,
  contextLength: number
): MemoryRequirement
```

**Formula:**
```
weights = parameters × bytes_per_param[quantization]
kvCache = layers × context × hidden_size × 2 × batch × bytes_per_element
overhead = weights × 0.10 (10% safety margin)

totalVRAM = weights + kvCache + overhead
```

### 2. Compatibility Engine

```typescript
interface CompatibilityCheck {
  isCompatible: boolean;
  issues: CompatibilityIssue[];
  warnings: string[];
}

function checkCompatibility(
  model: AIModel,
  gpu: GPU[],
  cpu: CPU,
  motherboard: Motherboard,
  psu: PSU,
  ram: RAM
): CompatibilityCheck
```

**Checks:**
- [ ] VRAM sufficient
- [ ] PCIe slots available
- [ ] PSU wattage adequate
- [ ] CPU socket matches motherboard
- [ ] RAM type matches motherboard
- [ ] Physical GPU dimensions fit case
- [ ] Multi-GPU NVLink/SLI support

### 3. Performance Estimator

```typescript
interface PerformanceEstimate {
  tokensPerSecond: number;
  isEstimated: boolean;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  basedon: string;
}

function estimatePerformance(
  model: AIModel,
  gpu: GPU[],
  quantization: string
): PerformanceEstimate
```

**Logic:**
1. Check for exact benchmark match → HIGH confidence
2. Extrapolate from similar model + same GPU → MEDIUM confidence
3. Estimate from GPU TFLOPS → LOW confidence

### 4. Recommendation Engine

```typescript
interface BuildRecommendation {
  build: Build;
  score: number;
  reasoning: string[];
}

function recommendBuild(
  model: AIModel,
  budget: number,
  priority: 'PRICE' | 'BALANCED' | 'PERFORMANCE' | 'EFFICIENCY'
): BuildRecommendation[]
```

**Scoring Formula:**
```typescript
score = 
  performanceScore × weights.performance +
  priceScore × weights.price +
  compatibilityScore × weights.compatibility +
  availabilityScore × weights.availability +
  efficiencyScore × weights.efficiency +
  upgradeScore × weights.upgrade

// Weights vary by priority
weights = {
  PRICE: { performance: 0.2, price: 0.5, ... },
  BALANCED: { performance: 0.3, price: 0.25, ... },
  PERFORMANCE: { performance: 0.5, price: 0.15, ... },
}
```

### 5. Multi-GPU Calculator

```typescript
function calculateMultiGPU(
  model: AIModel,
  gpuCount: number,
  gpu: GPU
): {
  totalVRAM: number;
  estimatedScaling: number; // 0.0 - 1.0
  interconnect: string;
  powerRequired: number;
}
```

**Scaling Factors:**
- 2 GPUs: 0.85 - 0.95× per GPU
- 4 GPUs: 0.70 - 0.85× per GPU
- 8 GPUs: 0.60 - 0.80× per GPU

### 6. Build Generator

```typescript
function generateBuilds(
  model: AIModel,
  budget: number,
  priority: Priority
): {
  cheapest: Build;
  balanced: Build;
  performance: Build;
}
```

## API Design

### REST Endpoints

```
GET  /api/models                    - List models
GET  /api/models/:slug              - Get model details
GET  /api/models/:slug/requirements - Get memory requirements

GET  /api/gpus                      - List GPUs
GET  /api/gpus/:slug                - Get GPU details
GET  /api/gpus/:slug/benchmarks     - Get benchmarks

POST /api/calculate/memory          - Calculate VRAM needs
POST /api/calculate/compatibility   - Check compatibility
POST /api/calculate/performance     - Estimate performance

POST /api/builds/generate           - Generate builds
GET  /api/builds/:slug              - Get build details
POST /api/builds                    - Save build

GET  /api/prices                    - Get prices
GET  /api/prices/deals              - Get current deals
POST /api/price-alerts              - Create price alert

GET  /api/search                    - Global search
```

### Server Actions (Next.js)

```typescript
// app/actions/models.ts
'use server'

export async function getModel(slug: string)
export async function searchModels(query: string)
export async function getModelRequirements(slug: string, quantization: string)

// app/actions/builder.ts
'use server'

export async function generateBuilds(input: BuildInput)
export async function checkCompatibility(components: Components)
export async function estimatePerformance(config: Config)

// app/actions/prices.ts
'use server'

export async function findBestDeals(productType: string, productId: string)
export async function getPriceHistory(productType: string, productId: string)
```

## Routing Structure

```
/                           - Landing page
/builder                    - Main builder wizard
/models                     - Model catalog
/models/[slug]              - Model detail
/gpus                       - GPU catalog
/gpus/[slug]                - GPU detail
/cpus/[slug]                - CPU detail
/builds/[slug]              - Build detail
/compare                    - Comparison tool
/deals                      - Current deals
/guides                     - Educational content
/cloud-vs-local             - ROI calculator
/search                     - Global search

/api/*                      - API routes
```

## SEO Architecture

### Dynamic Routes
- `/models/[slug]` → `llama-3-405b`, `qwen-3-235b`
- `/gpus/[slug]` → `rtx-5090`, `rtx-4090`
- `/builds/[slug]` → `qwen-235b-3000-usd`

### Programmatic SEO
- `/run/[model-slug]` → "Can I run Qwen 3 235B?"
- `/best-gpu-for/[model-slug]` → "Best GPU for Llama 4"
- `/best-ai-pc-under/[budget]` → "Best AI PC under $3000"
- `/compare/[gpu1]-vs-[gpu2]` → "RTX 5090 vs RTX 4090"

### Metadata Generation
```typescript
export async function generateMetadata({ params }) {
  return {
    title: `${model.name} - Hardware Requirements & Builds`,
    description: `Run ${model.name} locally. See VRAM requirements, recommended hardware, performance benchmarks, and best prices.`,
    openGraph: { ... },
  }
}
```

## Data Ingestion Strategy

### Phase 1: Manual Seeding
- Manually curate top 50-100 models
- Manually add 20-40 popular GPUs
- Set `isEstimated: true` where appropriate

### Phase 2: Structured APIs
- Hugging Face API for model metadata
- Manufacturer APIs for specs (where available)
- Affiliate APIs for pricing

### Phase 3: Community
- User-submitted benchmarks
- Verified community data
- Crowdsourced pricing

## Security Considerations

1. **Input Validation:** Zod schemas for all inputs
2. **Rate Limiting:** Protect APIs and builder
3. **Auth:** Optional but secure when used
4. **SQL Injection:** Prisma protects by default
5. **XSS:** React escapes by default
6. **Environment Variables:** Never expose secrets
7. **CORS:** Restrict API access if needed

## Performance Optimization

1. **Static Generation:** Model/GPU pages (ISR)
2. **Dynamic:** Builder, prices, search
3. **Image Optimization:** Next.js Image component
4. **Code Splitting:** Dynamic imports
5. **Database Indexes:** On frequently queried fields
6. **Caching:** React cache(), unstable_cache()
7. **CDN:** Static assets via Vercel Edge

## Monitoring & Analytics

### Key Metrics
- Builder completions
- Model searches
- GPU views
- Affiliate clicks
- Build shares
- Price alert signups

### Events to Track
```typescript
analytics.track('builder_started', { model, budget })
analytics.track('build_generated', { buildId, priority })
analytics.track('product_clicked', { productType, productId })
analytics.track('affiliate_clicked', { retailer, product })
analytics.track('build_shared', { buildId })
```

## Future Expansion: Robotics

The architecture is designed to support future expansion into robotics and automation hardware:

- **Workload Types:** Extend beyond LLMs to robot control, computer vision, sensor fusion
- **Hardware Types:** Add robot components, sensors, actuators, controllers
- **Use Cases:** Industrial automation, AMRs, cobots, edge AI
- **Same Architecture:** Model → Hardware → Compatibility → Build

**Database Changes:**
```prisma
model Workload {
  id          String @id
  type        String // LLM, VISION, ROBOTICS, EDGE_AI
  ...
}

model RobotComponent {
  id          String @id
  category    String // ARM, SENSOR, CONTROLLER, ACTUATOR
  ...
}
```

## Deployment Strategy

### MVP Deployment
1. **Platform:** Vercel
2. **Database:** Neon Postgres (serverless)
3. **Auth:** Clerk (free tier)
4. **Analytics:** Vercel Analytics
5. **Domain:** Custom domain
6. **SSL:** Automatic via Vercel

### Environment Variables
```bash
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_APP_URL=
AFFILIATE_API_KEYS=
```

### CI/CD
- **Git Push → Vercel Deploy:** Automatic
- **Preview Deployments:** Per PR
- **Production:** Main branch

## Testing Strategy

### Unit Tests
```typescript
// Memory calculator
test('calculates Q4 VRAM for 70B model')
test('applies safety margin correctly')

// Compatibility
test('detects insufficient VRAM')
test('validates PSU wattage')

// Recommendations
test('prioritizes price when budget is tight')
```

### Integration Tests
- Builder flow end-to-end
- Database queries
- API endpoints

### E2E Tests (Future)
- Playwright for critical user flows
- Builder completion
- Build sharing

## Success Criteria

The MVP is ready when:

1. ✅ User can search for AI models
2. ✅ User can view model VRAM requirements
3. ✅ User can enter budget and priority
4. ✅ System generates 3 builds (cheapest, balanced, performance)
5. ✅ Builds show compatibility status
6. ✅ Builds show estimated performance
7. ✅ Components show current prices
8. ✅ User can click through to buy
9. ✅ Builds are shareable via URL
10. ✅ Mobile responsive
11. ✅ SEO optimized
12. ✅ No TypeScript errors
13. ✅ No console errors
14. ✅ Loads in < 3s

---

**Next Steps:** See ROADMAP.md for implementation phases.
