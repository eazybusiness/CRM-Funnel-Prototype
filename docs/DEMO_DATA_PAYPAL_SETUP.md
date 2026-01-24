# Demo-Daten löschen & PayPal Sandbox einrichten

## 1. Demo-Kursdaten löschen

Wenn Sie die Demo-Kursdaten aus der Datenbank entfernen möchten, führen Sie die folgenden SQL-Befehle aus:

### SQL-Befehle zum Löschen der Demo-Daten:

```sql
-- Demo-Kurs "Minimalismus-Grundlagen" löschen
DELETE FROM enrollments WHERE course_id = 'demo-course-minimalismus';
DELETE FROM lesson_progress WHERE lesson_id IN (
  SELECT id FROM lessons WHERE module_id IN (
    SELECT id FROM modules WHERE course_id = 'demo-course-minimalismus'
  )
);
DELETE FROM lessons WHERE module_id IN (
  SELECT id FROM modules WHERE course_id = 'demo-course-minimalismus'
);
DELETE FROM modules WHERE course_id = 'demo-course-minimalismus';
DELETE FROM courses WHERE id = 'demo-course-minimalismus';

-- Demo-Kurs "Digitaler Minimalismus" löschen
DELETE FROM enrollments WHERE course_id = 'demo-course-digital';
DELETE FROM lesson_progress WHERE lesson_id IN (
  SELECT id FROM lessons WHERE module_id IN (
    SELECT id FROM modules WHERE course_id = 'demo-course-digital'
  )
);
DELETE FROM lessons WHERE module_id IN (
  SELECT id FROM modules WHERE course_id = 'demo-course-digital'
);
DELETE FROM modules WHERE course_id = 'demo-course-digital';
DELETE FROM courses WHERE id = 'demo-course-digital';
```

### Über Vercel Postgres:

1. Gehen Sie zu Ihrem Vercel Dashboard
2. Wählen Sie das Projekt aus
3. Klicken Sie auf "Storage" → "Postgres"
4. Klicken Sie auf "Query" (neben Ihrer Datenbank)
5. Fügen Sie die SQL-Befehle oben ein und führen Sie sie aus

## 2. PayPal Sandbox Account einrichten

Um PayPal Payments zu testen, benötigen Sie einen PayPal Sandbox Account:

### Schritt 1: PayPal Developer Account erstellen

1. Gehen Sie zu: https://developer.paypal.com/
2. Klicken Sie auf "Sign Up" oder "Log In"
3. Melden Sie sich mit Ihrem PayPal Account an oder erstellen Sie einen neuen
4. Bestätigen Sie Ihre E-Mail-Adresse, falls erforderlich

### Schritt 2: Sandbox Accounts erstellen

1. Nach dem Login: Klicken Sie auf "Dashboard" → "Sandbox"
2. Sie sehen automatisch zwei Test-Accounts:
   - **Business Account**: Für den Verkäufer (Shop)
   - **Personal Account**: Für den Käufer (Kunde)

3. Klicken Sie neben jedem Account auf "..." → "View/Edit Account"
4. Notieren Sie sich die **E-Mail-Adressen** beider Accounts
5. Klicken Sie auf "Manage Accounts" → "Change Password" um Passwörter festzulegen

### Schritt 3: API-Zugangsdaten abrufen

1. Im Sandbox Dashboard: Klicken Sie auf "Apps & Credentials"
2. Klicken Sie auf "Create App"
3. Geben Sie einen App-Namen ein (z.B. "CRM Funnel Test")
4. Wählen Sie "Seller" als Account-Typ
5. Klicken Sie auf "Create App"

6. Sie erhalten nun:
   - **Client ID**
   - **Client Secret**
   - Kopieren Sie beide Werte

### Schritt 4: Webhook einrichten

1. Gehen Sie zu: https://developer.paypal.com/dashboard/webhooks
2. Klicken Sie auf "Add Webhook"
3. Webhook URL: `https://ihr-domain.com/api/payment/webhook`
4. Wählen Sie alle relevanten Events aus:
   - CHECKOUT.ORDER.APPROVED
   - CHECKOUT.ORDER.COMPLETED
   - PAYMENT.CAPTURE.COMPLETED
   - PAYMENT.CAPTURE.DENIED
5. Klicken Sie auf "Save"
6. Notieren Sie sich die **Webhook ID** (wird in den Environment Variables benötigt)

### Schritt 5: Environment Variables konfigurieren

Fügen Sie in `.env.local` folgende Werte ein:

```env
# PayPal Sandbox
PAYPAL_CLIENT_ID=ihre_sandbox_client_id
PAYPAL_CLIENT_SECRET=ihre_sandbox_client_secret
PAYPAL_WEBHOOK_ID=ihre_webhook_id
NEXT_PUBLIC_PAYPAL_CLIENT_ID=ihre_sandbox_client_id
```

### Schritt 6: Testen

1. Starten Sie die Anwendung neu
2. Gehen Sie zur Checkout-Seite
3. Klicken Sie auf "Jetzt kaufen"
4. Sie werden zur PayPal Sandbox weitergeleitet
5. Melden Sie sich mit dem **Personal Test Account** an
6. Bestätigen Sie die Zahlung
7. Sie werden zurück zur Success-Seite geleitet

## 3. Wichtige Hinweise

- **Sandbox vs Live**: Die Sandbox verwendet Test-Geld, keine echten Transaktionen
- **Test-Credit Cards**: PayPal bietet auch Test-Kreditkarten für Tests ohne Login
- **Webhook Testing**: Verwenden Sie ngrok oder ähnliches für lokale Tests
- **Emails**: In der Sandbox werden keine echten Emails versendet

## 4. Nächste Schritte

1. Richten Sie den Sandbox Account ein
2. Testen Sie den kompletten Payment-Flow
3. Wenn alles funktioniert: Live-Account erstellen und API-Keys austauschen
4. Denken Sie daran, vor dem Go-Live alle Demo-Daten zu löschen

## 5. Support

- PayPal Developer Documentation: https://developer.paypal.com/docs/
- Test-Card Numbers: https://developer.paypal.com/tools/sandbox/card-testing/
- Webhook Simulator: Im PayPal Developer Dashboard verfügbar
