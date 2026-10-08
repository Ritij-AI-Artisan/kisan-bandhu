# Kisan Bandhu — demo website

ಕಿಸಾನ್ ಬಂಧು · किसान बंधु — *Har kadam, kisan ke saath*

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + Embla. Every image, logo, icon and font is
served from this project; the only runtime third parties are the Fillout form embed and `wa.me` links.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # runs scripts/check-assets.mjs first, then next build
npm start            # serve the production build
```

## Deploy (Vercel)

Push this folder to a GitHub repo and import it in Vercel (framework: Next.js, default settings, no environment variables),
or run `npx vercel --prod`. Vercel never runs the asset scripts — all downloaded assets are committed in `/public`.
`/source-materials` and `/scripts/.cache` are excluded via `.gitignore` / `.vercelignore`.

## Where to change things

| What | File |
|---|---|
| WhatsApp number, phone, emails, address, grievance officer, social links | `content/site.ts` |
| Real counters (farmers, villages, jobs, LOIs, partners, pilots) — `null` shows “—” | `content/site.ts` → `COUNTERS` |
| Fillout form IDs (LOI is live; partner / hub / investor are `TODO_…` placeholders) | `content/forms.ts` |
| Partner-logo switch (keep `false` until written approval) | `content/flags.ts` |
| Translations (kn/te/hi are machine-drafted — need human review) | `content/i18n/*.json` |
| Product catalogue data | `content/products.ts` |
| Demo rates for the ticker / charts | `content/rates-demo.ts` |
| Team, FAQ, models, services | `content/*.ts` |

## Refreshing assets (dev only)

```bash
npm run assets:logo       # SVG lockups, favicons, app icons, OG image from the traced mark
npm run assets:icons      # WhatsApp/YouTube/… glyphs from simple-icons (CC0)
node scripts/fetch-stock.mjs search   # find candidate photos (Wikimedia Commons; Pixabay if not blocked)
npm run assets:stock      # download photos listed in scripts/stock-manifest.json + write content/credits.json
npm run assets:products   # product images: official page → marketplace listing → branded placeholder
npm run assets:optimise   # WebP + 1200px variants + blur placeholders
npm run assets:check      # fails on any off-site or missing image reference
```

Stock photos: Unsplash (bot challenge) and Pexels/Pixabay (HTTP 403) block scripted access without API keys, and we do not
bypass blocks, so photos come from **Wikimedia Commons** (CC0 / CC BY / CC BY-SA). Attribution is on `/credits`.
Add `PEXELS_API_KEY` etc. to `.env.local` (see `.env.local.example`) if you want to swap sources.

## Product image & spec sources

Images were reviewed by hand. “workbook” = from the manufacturer research list, not yet confirmed on an official page.

| Product | Manufacturer | Image source | Image page | Specs source | Verified |
|---|---|---|---|---|---|
| Matco 8-64 | Indofil Industries | placeholder | — | official: https://indofil.com/agro/fungicides/matco | yes |
| TAG-COP | Tropical Agrosystem (India) | official | https://tropicalagro.in/product/tag-cop/ | official: https://tropicalagro.in/product/tag-cop/ | yes |
| Marlett M45 | Coromandel International | placeholder | — | listing: https://www.hunarsetu.com/en/product/coromandel-or-marlett-m45-mancozeb-75percent-wp- | **no — verify** |
| Indofil M-45 | Indofil Industries | placeholder | — | official: https://www.indofil.com/agro/fungicides/indofil-m-45 | yes |
| Saaf | UPL Limited | listing | https://www.bighaat.com/products/upl-saaf-fungicide | listing: https://www.bighaat.com/products/upl-saaf-fungicide | **no — verify** |
| Contaf Plus | Rallis India | listing | https://www.bighaat.com/products/contaf-plus-fungicide | official: https://www.rallis.com/international-business/Hexaconazole | yes |
| Nimbecidine 300 ppm | T. Stanes & Company | listing | https://www.bighaat.com/products/nimbicidine-300ppm | official: https://tstanes.com/botanic-insecticides | yes |
| Nimbecidine 1500 ppm | T. Stanes & Company | official | https://www.tstanes.com/domestic-crop-care/insect-nematode-management/nimbecidine-1500ppm | official: https://www.tstanes.com/domestic-crop-care/insect-nematode-management/nimbecidine-1500ppm | **no — verify** |
| Bio Nematon | T. Stanes & Company | official | https://www.tstanes.com/domestic-crop-care/insect-nematode-management/bionematon | official: https://www.tstanes.com/domestic-crop-care/insect-nematode-management/bionematon | yes |
| BioHarz | IPL Biologicals | listing | https://www.bighaat.com/products/ipl-bioharz-bio-fungicides | listing: https://www.bighaat.com/products/ipl-bioharz-bio-fungicides | **no — verify** |
| YaraMila Complex | Yara Fertilisers India | placeholder | — | official: https://english-master.yara.co.uk/cy-gb/crop-nutrition/fertiliser/compound/yaramila-complex/ | yes |
| YaraMila Winner | Yara Fertilisers India | placeholder | — | workbook: https://www.yara.in/ | **no — verify** |
| YaraLiva Nitrabor | Yara Fertilisers India | placeholder | — | workbook: https://www.yara.in/ | **no — verify** |
| FACTAMFOS 20:20:0:13 | Fertilisers and Chemicals Travancore (FACT) | official | https://fact.co.in/home/Dynamicpages?MenuId=225 | official: https://fact.co.in/home/Dynamicpages?MenuId=225 | yes |
| IFFCO Nano Urea Plus | IFFCO | placeholder | — | govt: https://www.outlookbusiness.com/news/govt-notifies-specifications-of-iffcos-nano-urea-plus | **no — verify** |
| Macrofert 20-20-20 | Aries Agro | placeholder | — | workbook: https://www.ariesagro.com/ | **no — verify** |
| Mahadhan Zn EDTA | Deepak Fertilisers (Mahadhan) | listing | https://www.bighaat.com/products/mahadhan-chelated-zn-domestic-micronutrient-fertilizer | listing: https://www.bighaat.com/products/mahadhan-chelated-zn-domestic-micronutrient-fertilizer | **no — verify** |
| Mahadhan DOT | Deepak Fertilisers (Mahadhan) | placeholder | — | workbook: https://www.mahadhan.co.in/ | **no — verify** |
| Agromin | Aries Agro | placeholder | — | workbook: https://www.ariesagro.com/ | **no — verify** |
| Arecanut seedlings — Mangala, Sumangala, Sreemangala | ICAR–CPCRI | placeholder | — | govt: https://cpcri.icar.gov.in/page/article/Arecanut_Varieties | yes |
| Arecanut dwarf hybrids VTLAH-1 & VTLAH-2 | ICAR–CPCRI | placeholder | — | govt: https://cpcri.icar.gov.in/page/article/Arecanut_Varieties | yes |
| Cocoa planting material (Vittal) | ICAR–CPCRI | placeholder | — | workbook: https://cpcri.icar.gov.in/ | **no — verify** |

## Before public launch

- [ ] Replace placeholders: WhatsApp number, phone, emails, address, social links (`content/site.ts`)
- [ ] Create the partner, hub-partner and investor-deck Fillout forms and add their IDs (`content/forms.ts`)
- [ ] Add team photos and LinkedIn URLs (`content/team.ts`); write the About story
- [ ] Fill survey numbers (`[X% …]` placeholders on Home/Investors) and TAM/SAM/SOM blocks
- [ ] Approve product images and listings with each manufacturer; verify every product marked “no — verify”
- [ ] Human review of Kannada, Telugu and Hindi translations
- [ ] Legal review of `/privacy` and `/terms`; appoint a grievance officer
- [ ] Buy the domain and update `SITE_URL`
