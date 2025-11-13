# Dungeon Explorer - Jeu en CLI

## Description

Dungeon Explorer est un jeu de type roguelike en ligne de commande (CLI) développé en TypeScript. Le joueur explore un donjon, rencontre des monstres, trouve des trésors, achète des objets chez un marchand, et améliore ses capacités pour survivre le plus longtemps possible.

## Prérequis

Assurez-vous d'avoir **Node.js** installé sur votre machine.

## Installation

Clonez le dépôt, puis installez les dépendances nécessaires en utilisant :

```bash
npm install
```

## Lancer le projet

### Étape 1 : Compiler le projet

Avant de lancer le jeu, compilez le code TypeScript en JavaScript en exécutant la commande suivante :

```bash
npx tsc
```

Si vous rencontrez une erreur, essayez la commande suivante pour modifier temporairement les permissions d'exécution :

```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Puis, relancez la commande :

```bash
npx tsc
```

### Étape 2 : Lancer le projet

Une fois le projet compilé, vous pouvez lancer le jeu.

```bash
node dist/index.js
```

## Règles du jeu

### Exploration de Donjon

Dans **Dungeon Explorer**, le joueur explore des salles de donjon où il peut rencontrer divers événements :

- **Monstres** : Combattez les monstres pour gagner de l'expérience et des objets.
- **Trésors** : Augmentez votre or en trouvant des trésors.
- **Marchands** : Achetez des potions, armes et armures avec l'or accumulé.
- **Boss** : Tous les 5 niveaux, un boss plus puissant apparaît. Battez-le pour obtenir des récompenses uniques.

### Fonctionnalités de Combat

Le joueur doit combattre des monstres en utilisant ses attaques et son équipement :

- **Attaque** : Chaque arme améliore la puissance d'attaque, et chaque armure la défense.
- **Utilisation** de potions : Le joueur peut utiliser une potion pour regagner de la santé.
- **Fuite** : Lors de certains combats, le joueur peut choisir de fuir.

### Autres fonctionnalités

- **Choix de direction** : Purement cosmétique, cela ne change rien à la salle que vous allez rencontrer (d'ailleurs peu importe ce que vous marquez vous allez bouger dans une pièce)
- **Niveaux et XP** : Chaque combat vous rapportera des points d'expérience, vous permettant d'augmenter de niveau, ce qui augmentera vos statistiques de base
- **Les équipements** : Lorsque vous trouvez ou achetez un nouvel équipement, le meilleur entre le nouveau et celui déjà équipé est choisi automatiquement

## Tests

Les tests unitaires sont à effectuer dans le fichier `dungeonExplorerGame.test.ts`.

### Exécution des tests

- Utilisez la fonction `expect()` pour effectuer les vérifications.
- La méthode `jest.spyOn` peut être utilisée pour surveiller le comportement d'une fonction spécifique.
- Utilisez `.mockImplementation` si vous avez besoin de forcer une fonction à prendre des valeurs spécifiques pour vos tests.
- Utilisez `.mockReturnValue` si vous avez besoin de forcer une fonction à retourner des valeurs spécifiques pour vos tests.

Pour lancer les tests, utilisez la commande suivante :

```bash
npm run test
```
