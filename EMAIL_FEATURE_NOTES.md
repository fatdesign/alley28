# EMAIL VERSAND FEATURE - Notizen für spätere Implementierung

## Status
❌ Feature wurde vorübergehend entfernt (sah im PDF-Anhang nicht gut aus).
✅ Technisch funktioniert alles – nur die HTML→PDF Darstellung muss noch verbessert werden.

---

## Technischer Stack
- **Email Service:** [Resend.com](https://resend.com)
- **API Proxy:** Cloudflare Worker (`fatdesign-auth.f-klavun.workers.dev`)
- **PDF-Generator:** html2pdf.js (CDN)

---

## Cloudflare Worker Secrets (bereits gesetzt)
| Secret Name        | Wert                         | Beschreibung                             |
|--------------------|------------------------------|------------------------------------------|
| `ACCESS_PASSWORD`  | `coco`                       | Passwort für Login-Gate                  |
| `RESEND_API_KEY`   | *(dein Resend API Key)*      | API Key von resend.com                   |
| `RESEND_FROM_EMAIL`| `info@fatdesign.at` (sobald Domain verifiziert) | Absenderadresse nach Domain-Verifizierung |

---

## Resend Domain-Verifizierung
**Status:** Noch nicht abgeschlossen.

**Schritte:**
1. Login bei [resend.com](https://resend.com)
2. Domains → "Add Domain" → `fatdesign.at`
3. DNS-Einträge (DKIM + SPF) beim Hoster `host14.ssl-net.net` eintragen
4. Auf "Verify" klicken (kann 10-20 Min dauern)
5. Danach in Cloudflare das Secret `RESEND_FROM_EMAIL` auf `info@fatdesign.at` setzen

**Ohne Domain-Verifizierung:** Nur Testsendungen an `fat.design@outlook.com` möglich.

---

## Worker Route für Email (`/send-email`)
Der Worker hat bereits einen `/send-email` POST-Endpoint.
Erwartet JSON:
```json
{
  "recipient": "kunde@email.at",
  "pdfBase64": "base64-encoded-PDF...",
  "filename": "FAT_DESIGN_VERTRAG.pdf",
  "subject": "Dein Dokument von FAT DESIGN"
}
```
Plus Header: `X-Admin-Password: coco`

---

## Email-Signatur (für HTML-Body)
```html
<p>Anbei erhalten Sie Ihr Dokument als PDF.</p>
<p>Beste Grüße,<br>
<strong>Fatih Klavun</strong><br><br>
<strong>FATDESIGN</strong><br>
<a href="https://www.fatdesign.at">www.fatdesign.at</a><br>
Schreiben Sie mir direkt auf<br>
Telegram/WhatsApp: 0660 323 6080</p>
```

---

## CC & Reply-To
- `cc: 'fat.design@outlook.com'`
- `reply_to: 'fat.design@outlook.com'`

---

## Das eigentliche Problem (PDF-Qualität)
Das HTML-Dokument mit Signaturen, Tabellen, Custom-Fonts und CSS-Layout
wird von html2pdf.js nicht perfekt gerendert. Mögliche Lösungen für später:
- **Option A:** CSS speziell für PDF-Capture optimieren (`@media print` konsequenter nutzen)
- **Option B:** Auf Cloudflare Edge einen Puppeteer/Headless-Browser nutzen (komplexer)
- **Option C:** Resend erlaubt auch direkten HTML-Body als Email ohne Anhang
