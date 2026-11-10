# Project memory

## Product intent & audience

- **ZN Gallery**: e-commerce/gallery website for browsing and purchasing items
- Features include product gallery, shopping cart, and order checkout
- Uses **Supabase** as backend (project URL + public anon key required)
- Audience: customers browsing and buying gallery items

## Brand personality & voice

- Name "ZN Gallery" implies art/visual/gallery aesthetic
- Production-quality presentation expected (per authoritative `.bolt/prompt`)

## Visual design & UX direction

- Self-contained HTML export version exists (~62 KB) alongside React app
- Cart and order flow are core UX paths requiring browser testing

## Decisions, constraints & rationale

- HTML standalone version stored at `html-version/zn-gallary.html`
- Supabase credentials are placeholders near bottom of HTML file — must be replaced before deployment
- HTML version has not been browser-tested yet
- App `public/` folder available as potential hosting location for the HTML file in preview

## Open questions & assumptions

- Should the HTML file be moved into `public/` for preview access?
- Supabase project address and public key still need to be inserted
- Layout, cart functionality, and test order flow need verification before sharing
- Relationship between React app and standalone HTML version (parallel deliverable or replacement?) is unclear