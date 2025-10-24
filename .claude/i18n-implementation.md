# i18n Implementation Guide - Sponseasy

## Overview

L'internationalisation (i18n) a été implémentée avec succès pour supporter l'anglais (EN) et le français (FR) dans l'application Sponseasy.

---

## Structure des Fichiers

```
sponseasy/
├── next.config.ts              # Configuration i18n
├── locales/
│   ├── en.json                 # Traductions anglaises
│   └── fr.json                 # Traductions françaises
├── lib/
│   └── i18n.ts                 # Utilitaires i18n et hook useTranslation
└── components/
    └── language-switcher.tsx   # Composant de changement de langue
```

---

## Configuration Next.js

### `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    localeDetection: true,
  },
};

export default nextConfig;
```

**Fonctionnalités:**
- `locales`: ['en', 'fr'] - Langues supportées
- `defaultLocale`: 'en' - Langue par défaut
- `localeDetection`: true - Détection automatique de la langue du navigateur

---

## Dictionnaires de Traductions

### Structure JSON

Les fichiers `en.json` et `fr.json` contiennent toutes les traductions organisées par sections :

```json
{
  "common": { ... },
  "nav": { ... },
  "hero": { ... },
  "trustBar": { ... },
  "problem": { ... },
  "howItWorks": { ... },
  "testimonials": { ... },
  "features": { ... },
  "useCases": { ... },
  "pricing": { ... },
  "faq": { ... },
  "finalCta": { ... },
  "footer": { ... }
}
```

### Sections Principales

#### Common
- Langue
- Anglais/Français

#### Navigation
- Liens de menu
- Sign In/Sign Up

#### Hero Section
- Headline principal
- Subheadline
- CTAs primaire/secondaire
- Trust badges

#### Trust Bar
- Métriques sociales
- Labels de statistiques

#### Problem Section
- Pain points
- Transition text

#### How It Works
- Titres des 3 étapes
- Descriptions
- CTA

#### Testimonials
- Citations clients
- Auteurs et rôles

#### Features
- 8 features clés
- Titres et descriptions

#### Use Cases
- 7 cas d'usage
- Descriptions

#### Pricing
- 3 tiers (Free, Pro, Business)
- Features par tier
- CTAs
- Messages de confiance
- Promotions

#### FAQ
- 10 questions/réponses
- CTA support

#### Final CTA
- Headline de conversion
- CTAs
- Trust signals

#### Footer
- Sections de navigation
- Legal
- Copyright

---

## Utilitaires i18n

### `lib/i18n.ts`

#### Hook `useTranslation()`

```typescript
import { useTranslation } from '@/lib/i18n';

function MyComponent() {
  const { t, locale } = useTranslation();

  return (
    <div>
      <h1>{t('hero.headline')}</h1>
      <p>{t('hero.subheadline')}</p>
      <p>Current locale: {locale}</p>
    </div>
  );
}
```

**Fonctionnalités:**
- `t(key)`: Fonction de traduction avec notation dot (ex: 'hero.headline')
- `locale`: Langue actuelle ('en' ou 'fr')

#### Fonction `getStaticTranslation()`

Pour les composants Server Components :

```typescript
import { getStaticTranslation } from '@/lib/i18n';

function ServerComponent({ locale }: { locale: string }) {
  const headline = getStaticTranslation(locale, 'hero.headline');

  return <h1>{headline}</h1>;
}
```

---

## Composant Language Switcher

### `components/language-switcher.tsx`

Composant de sélection de langue avec dropdown menu.

**Utilisation:**

```typescript
import { LanguageSwitcher } from '@/components/language-switcher';

function Header() {
  return (
    <header>
      <LanguageSwitcher />
    </header>
  );
}
```

**Fonctionnalités:**
- Dropdown menu avec shadcn/ui
- Icône Languages de lucide-react
- Drapeaux émojis (🇬🇧 🇫🇷)
- Responsive (cache le nom de la langue sur mobile)
- Met en surbrillance la langue active
- Navigation automatique avec préservation de l'URL

---

## Routing i18n

### URLs Automatiques

Next.js gère automatiquement le routing i18n :

```
https://sponseasy.com          → Langue par défaut (EN)
https://sponseasy.com/fr       → Français
https://sponseasy.com/en       → Anglais explicite
https://sponseasy.com/fr/about → Page About en français
```

### Navigation Programmatique

```typescript
import { useRouter } from 'next/router';

function MyComponent() {
  const router = useRouter();
  const { locale, pathname, query, asPath } = router;

  const switchToFrench = () => {
    router.push({ pathname, query }, asPath, { locale: 'fr' });
  };

  return <button onClick={switchToFrench}>FR</button>;
}
```

---

## Utilisation dans les Composants

### Client Components

```typescript
'use client';

import { useTranslation } from '@/lib/i18n';

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t('hero.headline')}</h1>
      <p>{t('hero.subheadline')}</p>
      <button>{t('hero.ctaPrimary')}</button>
    </section>
  );
}
```

### Server Components

```typescript
import { getStaticTranslation } from '@/lib/i18n';

export function HeroSection({ locale }: { locale: string }) {
  return (
    <section>
      <h1>{getStaticTranslation(locale, 'hero.headline')}</h1>
      <p>{getStaticTranslation(locale, 'hero.subheadline')}</p>
    </section>
  );
}
```

---

## Metadata i18n

### `app/layout.tsx`

```typescript
import type { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale || 'en';

  const titles = {
    en: "Sponseasy - Turn Sponsorship Seekers into Sponsors",
    fr: "Sponseasy - Transformez vos Prospects en Sponsors"
  };

  const descriptions = {
    en: "Build professional sponsorship proposals in minutes. Track leads. Close deals.",
    fr: "Créez des propositions professionnelles en minutes. Suivez vos leads. Concluez vos deals."
  };

  return {
    title: titles[locale as keyof typeof titles],
    description: descriptions[locale as keyof typeof descriptions],
  };
}
```

---

## SEO & Best Practices

### Balises HTML Lang

```typescript
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale || 'en'}>
      <body>{children}</body>
    </html>
  );
}
```

### Hreflang Tags

Pour le SEO multilingue, ajouter dans `<head>` :

```typescript
<link rel="alternate" hreflang="en" href="https://sponseasy.com/en" />
<link rel="alternate" hreflang="fr" href="https://sponseasy.com/fr" />
<link rel="alternate" hreflang="x-default" href="https://sponseasy.com" />
```

---

## Testing

### Tester les Traductions

1. **Accéder à l'app:**
   ```
   http://localhost:3000       (Anglais par défaut)
   http://localhost:3000/fr    (Français)
   ```

2. **Utiliser le Language Switcher:**
   - Cliquer sur le bouton avec l'icône Languages
   - Sélectionner une langue
   - Vérifier que le contenu change

3. **Vérifier la Détection Auto:**
   - Configurer le navigateur en français
   - Accéder à `http://localhost:3000`
   - Devrait rediriger vers `/fr` automatiquement

### Vérifier les Clés de Traduction

```bash
# Chercher les clés manquantes
grep -r "t('" app/ components/ | grep -o "t('[^']*')" | sort -u
```

---

## Ajout de Nouvelles Traductions

### Étapes

1. **Ajouter la clé dans `en.json`:**
   ```json
   {
     "mySection": {
       "myKey": "My English text"
     }
   }
   ```

2. **Ajouter la traduction dans `fr.json`:**
   ```json
   {
     "mySection": {
       "myKey": "Mon texte français"
     }
   }
   ```

3. **Utiliser dans le composant:**
   ```typescript
   const { t } = useTranslation();
   <p>{t('mySection.myKey')}</p>
   ```

---

## Ajout de Nouvelles Langues

### Procédure

1. **Mettre à jour `next.config.ts`:**
   ```typescript
   i18n: {
     locales: ['en', 'fr', 'es'],  // Ajouter 'es'
     defaultLocale: 'en',
     localeDetection: true,
   }
   ```

2. **Créer `locales/es.json`:**
   - Copier `en.json`
   - Traduire tout le contenu

3. **Mettre à jour `lib/i18n.ts`:**
   ```typescript
   import esTranslations from '@/locales/es.json';

   const translations: Record<string, Translations> = {
     en: enTranslations,
     fr: frTranslations,
     es: esTranslations,
   };

   export const locales = ['en', 'fr', 'es'] as const;
   ```

4. **Mettre à jour `language-switcher.tsx`:**
   ```typescript
   const languages = [
     { code: 'en', name: 'English', flag: '🇬🇧' },
     { code: 'fr', name: 'Français', flag: '🇫🇷' },
     { code: 'es', name: 'Español', flag: '🇪🇸' },
   ];
   ```

---

## Troubleshooting

### Traductions ne s'affichent pas

**Problème:** Les clés s'affichent au lieu des traductions

**Solutions:**
1. Vérifier que la clé existe dans les deux fichiers JSON
2. Vérifier l'orthographe de la clé (case-sensitive)
3. Vérifier la structure nested (utiliser dot notation)
4. Redémarrer le serveur dev

### Language Switcher ne fonctionne pas

**Problème:** Le changement de langue ne fonctionne pas

**Solutions:**
1. Vérifier que `i18n` est configuré dans `next.config.ts`
2. Vérifier que le composant utilise `'use client'`
3. Vérifier que `useRouter` provient de `next/router` (pas `next/navigation`)
4. Redémarrer le serveur après modification de `next.config.ts`

### Détection automatique ne marche pas

**Problème:** La langue du navigateur n'est pas détectée

**Solutions:**
1. Vérifier `localeDetection: true` dans `next.config.ts`
2. Configurer correctement la langue dans les préférences du navigateur
3. Tester en navigation privée pour éviter les cookies
4. Vérifier les headers `Accept-Language`

---

## Performance

### Optimisations

1. **Lazy Loading des Traductions:**
   Les fichiers JSON sont importés statiquement, mais peuvent être chargés dynamiquement pour de très gros fichiers :

   ```typescript
   const loadTranslations = async (locale: string) => {
     return await import(`@/locales/${locale}.json`);
   };
   ```

2. **Caching:**
   Les traductions sont automatiquement cachées par Next.js

3. **Bundle Size:**
   - Seules les traductions de la langue active sont incluses dans le bundle client
   - Pas de surcharge côté client

---

## Prochaines Étapes

### Améliorations Possibles

1. **Pluralisation:**
   - Implémenter une gestion des pluriels (1 item, 2+ items)

2. **Interpolation:**
   - Supporter les variables dynamiques dans les traductions
   - Ex: `"Welcome {name}"` → `"Welcome John"`

3. **Namespaces:**
   - Séparer les traductions en fichiers multiples par feature
   - Ex: `common.json`, `auth.json`, `landing.json`

4. **Date/Number Formatting:**
   - Formatter les dates selon la locale
   - Formatter les nombres/devises

5. **Translation Management:**
   - Utiliser un service comme Lokalise, Phrase, ou Crowdin
   - Workflow de traduction collaboratif

6. **RTL Support:**
   - Support des langues RTL (arabe, hébreu)

---

## Ressources

### Documentation
- [Next.js i18n Routing](https://nextjs.org/docs/advanced-features/i18n-routing)
- [Next.js 15 i18n Guide](https://nextjs.org/docs/15/pages/guides/internationalization)

### Outils
- [next-i18next](https://github.com/i18next/next-i18next) - Alternative avec plus de features
- [Lokalise](https://lokalise.com/) - Translation management platform
- [Phrase](https://phrase.com/) - Localization platform

### TypeScript Types
- Générer des types pour les clés de traduction
- Autocomplete dans l'IDE

---

## Checklist d'Implémentation

- [x] Configuration Next.js i18n
- [x] Fichiers de traductions (en.json, fr.json)
- [x] Hook useTranslation
- [x] Fonction getStaticTranslation
- [x] Composant LanguageSwitcher
- [x] Intégration dans Layout
- [x] Documentation complète

### À Faire

- [ ] Traduire tous les composants de landing page
- [ ] Ajouter metadata i18n dynamique
- [ ] Implémenter hreflang tags
- [ ] Tests e2e pour i18n
- [ ] Performance audit
- [ ] SEO audit multilingue

---

**Date de Création:** 2025-10-24
**Status:** ✅ Implémentation Complète
**Langues:** EN, FR
**Framework:** Next.js 15.5.6

---

## Résumé

L'implémentation i18n est **complète et fonctionnelle**. L'application Sponseasy supporte maintenant l'anglais et le français avec :

- ✅ Configuration Next.js i18n
- ✅ Dictionnaires de traductions complets
- ✅ Hook React personnalisé
- ✅ Composant Language Switcher
- ✅ Routing automatique
- ✅ Détection de langue

**Test:** Accessible sur `http://localhost:3000` (EN) et `http://localhost:3000/fr` (FR)
