# Analyse de sécurité : agent-vm vs Claude Code sur machine de développement

## Résumé du projet

[agent-vm](https://github.com/sylvinus/agent-vm) est un script shell (`claude-vm.sh`)
qui utilise [Lima](https://lima-vm.io/) pour exécuter Claude Code à l'intérieur d'une
machine virtuelle Debian légère et éphémère, plutôt que directement sur la machine hôte.

L'architecture est simple :
1. `claude-vm-setup` crée un template VM avec les outils de développement et Claude Code
   pré-installés
2. `claude-vm` clone ce template, monte le répertoire de travail en lecture-écriture, et
   lance `claude --dangerously-skip-permissions` dans la VM
3. À la sortie, la VM clonée est supprimée — seul le template persiste

## Sécurités supplémentaires par rapport à l'exécution directe

### 1. Isolation du noyau (kernel)

La VM exécute son propre noyau Linux (Debian 13). Contrairement à Docker qui partage le
noyau hôte, une exploitation de vulnérabilité kernel à l'intérieur de la VM ne compromet
pas l'hôte. C'est la différence fondamentale.

**Scénario** : Claude Code exécute un outil ou une dépendance contenant un exploit kernel
→ l'exploit est confiné à la VM.

### 2. Isolation du système de fichiers

Sur une machine de développement, Claude Code a accès à l'intégralité du filesystem de
l'utilisateur : `~/.ssh/`, `~/.aws/`, `~/.gitconfig`, `~/.env`, les autres projets, etc.

Avec agent-vm, seul le répertoire de travail courant (`pwd`) est monté dans la VM.
L'agent n'a **aucun accès** à :
- Vos clés SSH (`~/.ssh/`)
- Vos credentials cloud (`~/.aws/`, `~/.gcloud/`, `~/.config/`)
- Vos tokens et secrets hors du projet
- Vos autres projets et dépôts
- Le reste de votre système de fichiers

**Scénario** : Un prompt injection (via un fichier malveillant dans le projet, une
réponse d'API, etc.) pousse Claude à exfiltrer des credentials → il ne trouvera rien en
dehors du répertoire projet.

### 3. Isolation des processus

Les processus tournant dans la VM sont invisibles depuis l'hôte (au-delà du processus VM
lui-même). Un keylogger, un reverse shell, ou tout processus malveillant lancé par
l'agent ne peut pas interagir avec les processus de l'hôte.

**Scénario** : Claude installe et exécute un paquet npm malveillant qui tente de lancer
un keylogger → le keylogger ne capture que les frappes dans la VM (aucune interaction
clavier n'a lieu dans la VM de toute façon).

### 4. Éphémérité de la VM

Chaque invocation de `claude-vm` crée une VM fraîche à partir du template, et la supprime
à la sortie (y compris en cas de Ctrl+C ou SIGTERM, grâce au trap). Cela signifie :
- Aucune persistance malveillante n'est possible entre les sessions
- Un backdoor installé dans la VM disparaît à la fin de la session
- L'état est propre à chaque exécution

**Scénario** : L'agent installe une porte dérobée ou modifie des fichiers système dans la
VM → tout est détruit à la fin de la session. (Attention : les modifications dans le
répertoire projet monté, elles, persistent.)

### 5. Absence des outils et credentials de l'hôte

Sur la machine de développement, Claude Code peut potentiellement utiliser `aws`, `gcloud`,
`kubectl`, `docker`, `heroku`, et tous les CLI cloud configurés avec des credentials
actives. Dans la VM, seuls les outils explicitement installés lors du setup sont
disponibles, et ils n'ont pas vos credentials hôte.

**Scénario** : Un prompt injection demande à Claude d'exécuter `aws s3 ls` ou
`kubectl get secrets` → ces commandes échouent car les credentials ne sont pas présentes
dans la VM.

### 6. Protection contre les évasions de conteneur Docker

Si vous utilisez Docker comme sandbox (ce que certains outils proposent), un agent avec
un accès root peut potentiellement s'échapper du conteneur via des vulnérabilités kernel
partagées, le socket Docker monté, ou des misconfigurations cgroups/namespaces. La VM
élimine cette classe entière de risques.

## Limites et risques résiduels

### Le répertoire projet est monté en lecture-écriture

C'est voulu (l'agent doit pouvoir modifier le code), mais cela signifie que l'agent peut :
- Modifier n'importe quel fichier du projet, y compris `.env`, `.git/config`, etc.
- Injecter du code malveillant dans le projet lui-même
- Lire les secrets présents dans le répertoire projet (fichiers `.env`, etc.)

**Mitigation possible** : revue systématique des diffs via `git diff` avant de commit.

### Réseau non restreint

La VM a un accès réseau complet. L'agent peut :
- Exfiltrer le contenu du répertoire projet vers un serveur externe
- Télécharger et exécuter du code arbitraire
- Se connecter à des API externes

**Mitigation possible** : configurer les règles réseau de Lima pour restreindre l'accès
sortant (non proposé par agent-vm actuellement).

### Forwarding de ports

Lima forward automatiquement les ports de la VM vers l'hôte. Un service malveillant
lancé dans la VM sera accessible sur `localhost` de l'hôte.

### Le token Claude est dans le template

L'authentification Claude est stockée dans le template VM et héritée par chaque clone.
Si quelqu'un accède au template Lima, il récupère le token.

### Le script `.claude-vm.runtime.sh` est exécuté automatiquement

Si un dépôt cloné contient un `.claude-vm.runtime.sh` malveillant, il sera exécuté dans
la VM au démarrage. L'impact est limité à la VM (pas d'accès hôte), mais le script a
accès au répertoire projet monté.

## Synthèse des scénarios de protection

| Scénario de menace | Sans sandbox | Docker | agent-vm |
|---|---|---|---|
| Prompt injection → vol de `~/.ssh/` | Vulnérable | Protégé* | **Protégé** |
| Prompt injection → vol de `~/.aws/` | Vulnérable | Protégé* | **Protégé** |
| Prompt injection → exfiltration du projet | Vulnérable | Vulnérable | Vulnérable |
| Dépendance malveillante → exploit kernel | Vulnérable | Vulnérable | **Protégé** |
| Dépendance malveillante → évasion conteneur | N/A | Vulnérable | **Protégé** |
| Persistance malveillante entre sessions | Vulnérable | Variable | **Protégé** |
| Accès aux CLI cloud configurés | Vulnérable | Protégé* | **Protégé** |
| Installation d'un keylogger/backdoor | Vulnérable | Partiel | **Protégé** |
| Modification malveillante du code projet | Vulnérable | Vulnérable | Vulnérable |
| Exfiltration réseau | Vulnérable | Variable | Vulnérable |

*Docker protège si correctement configuré (pas de montage du socket, pas de `--privileged`).

## Conclusion

agent-vm apporte une **couche d'isolation significative** pour l'usage de Claude Code avec
`--dangerously-skip-permissions`. Son principal apport est de réduire le *blast radius*
d'une compromission : si l'agent est manipulé (via prompt injection, dépendance
malveillante, etc.), les dégâts sont confinés au répertoire projet et à la VM éphémère.

Les **credentials système**, les **autres projets**, et le **noyau hôte** restent protégés.

Le risque résiduel principal est l'**exfiltration réseau du contenu du projet** et la
**modification malveillante des fichiers du projet** (qui est inhérente au cas d'usage).

Pour un usage de Claude Code en mode autonome, c'est un compromis raisonnable entre
sécurité et ergonomie.
