# Guide de déploiement en production

## Configuration des variables d'environnement

Pour que l'application fonctionne correctement en production, vous devez configurer les variables d'environnement suivantes dans votre plateforme de déploiement :

### Variables requises

1. **NEXT_PUBLIC_SUPABASE_URL**
   - URL de votre projet Supabase
   - Format : `https://xxxxx.supabase.co`
   - Trouvable dans : Supabase Dashboard > Settings > API > Project URL

2. **NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY**
   - Clé publique (anon/publishable) de votre projet Supabase
   - Format : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Trouvable dans : Supabase Dashboard > Settings > API > Project API keys > anon/public

3. **SUPABASE_SERVICE_ROLE_KEY** ⚠️ **CRITIQUE**
   - Clé secrète (service_role) de votre projet Supabase
   - Format : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Trouvable dans : Supabase Dashboard > Settings > API > Project API keys > service_role
   - **⚠️ IMPORTANT** : Cette clé est secrète et ne doit JAMAIS être exposée côté client
   - **⚠️ CRITIQUE** : Sans cette clé, les opérations sur la table User seront bloquées par RLS (Row Level Security)

## Configuration selon la plateforme

### Vercel

1. Allez dans votre projet Vercel
2. Settings > Environment Variables
3. Ajoutez les 3 variables :
   - `NEXT_PUBLIC_SUPABASE_URL` (Production, Preview, Development)
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (Production, Preview, Development)
   - `SUPABASE_SERVICE_ROLE_KEY` (Production, Preview, Development) ⚠️ **OBLIGATOIRE**
4. Redéployez l'application

### Netlify

1. Allez dans votre site Netlify
2. Site settings > Environment variables
3. Ajoutez les 3 variables avec leurs valeurs
4. Redéployez l'application

### Autres plateformes

Ajoutez les variables d'environnement dans les paramètres de votre plateforme de déploiement.

## Vérification de la configuration

Après le déploiement, vérifiez que les variables sont bien configurées :

1. Ouvrez la console du navigateur en production
2. Essayez d'ajouter un username
3. Si vous voyez une erreur "RLS Policy Error", cela signifie que `SUPABASE_SERVICE_ROLE_KEY` n'est pas configurée

## Dépannage

### Erreur "RLS Policy Error"

**Cause** : La variable `SUPABASE_SERVICE_ROLE_KEY` n'est pas configurée ou incorrecte.

**Solution** :
1. Vérifiez que la variable est bien ajoutée dans votre plateforme de déploiement
2. Vérifiez que vous avez copié la bonne clé (service_role, pas anon/public)
3. Redéployez l'application après avoir ajouté/modifié les variables

### Erreur "Table not found"

**Cause** : La table `User` n'existe pas dans Supabase.

**Solution** :
1. Allez dans Supabase Dashboard > Table Editor
2. Créez la table `User` avec les colonnes :
   - `id` (uuid, primary key, default: uuid_generate_v4())
   - `username` (text, unique)
   - `score` (integer, default: 0)
   - `level` (integer, default: 1)

### Les cookies ne fonctionnent pas

**Cause** : Problème de configuration du cookie `secure` en production.

**Solution** : Le code détecte automatiquement si HTTPS est utilisé. Si vous utilisez un domaine personnalisé, assurez-vous qu'il utilise HTTPS.

## Test en production

Pour tester que tout fonctionne :

1. Ouvrez l'application en production
2. Entrez un username sur la page `/levels`
3. Vérifiez que le message "Hello human !" s'affiche
4. Vérifiez que les badges utilisateur et score s'affichent en haut de l'écran
5. Vérifiez que le niveau 1 devient cliquable

Si tout cela fonctionne, la configuration est correcte ! ✅

