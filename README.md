# Stevie Craig Private Hires and Tours

Five-page website for Edinburgh private hire, airport transfers, longer journeys and bespoke tours.

## Local development

```bash
npm install
npm run dev
```

## Public configuration

The production domain and booking number are configured in the site and GitHub
Pages workflow. Copy `.env.example` to `.env` only when you need to override
them locally:

- `NEXT_PUBLIC_SITE_URL`: final HTTPS custom domain without a trailing slash.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: international WhatsApp number using digits only.

## Validation

```bash
npm test
```
