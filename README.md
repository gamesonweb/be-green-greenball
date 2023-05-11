# Projet web


## Règle du projet

- 3 jeux (Dont 1 pour le concours Games on Webs)
- Système de score (temps, nombre de coups, etc.) et de progression (difficulté, niveaux, etc).
- Système de hauts-faits (réussite dans tous les jeux, temps record, etc.).
- Système de navigation (accueil, login simple, règles du jeu, liste des jeux, liste des succès


## Nos jeux : 

- Sudoku
- 2048
- Green Ball (Prototype pour le concure Games On Web)


## Sudoku 

### Le but du jeu 

Le but du Sudoku est de remplir une grille de 9x9 cases avec des chiffres allant de 1 à 9, de manière à ce que chaque ligne, chaque colonne et chaque sous-grille de 3x3 cases contiennent tous les chiffres de 1 à 9, sans répétition. Il s'agit d'un jeu de logique et de résolution de problème.

### Les règles

- Chaque ligne doit contenir tous les chiffres de 1 à 9, sans répétition.
- Chaque colonne doit contenir tous les chiffres de 1 à 9, sans répétition.
- Chaque sous-grille de 3x3 cases doit contenir tous les chiffres de 1 à 9, sans répétition.
- Utilisez des indices et des déductions pour remplir les cases vides avec les chiffres appropriés.


### Les fonctionnalitées 

- Pouvoir poser un nombre sur une tuiles
- Mettre en pause le jeu
- Système de score lorsqu'un chiffre est posé sur les grilles
- Système de score lorsque le chiffre complète une ligne une colonne et une mini-grille
- Lorsqu'une tuile est posé la progression augmente 


### Les hauts-faits

- Réussir le mode facile
- Réussir le mode normal
- Réussir le mode difficile
- Réussir tout les modes de jeux

### Niveaux de difficultés

- Facile : La grille est presque complète
- Normale : La grille à une occurence de chiffres moins complète
- Difficle : Il y a le nombre minimal de chiffre possible


## 2048

### Le but du jeu 

Le but du jeu est de réussir à créer la tuile de valeur 2048. Pour cela, il suffit de glisser les tuiles sur le plateau et automatiquement deux tuile de même valuer s'additioneront.

### Les règles

Dans le tableau de 4 cases sur 4, des carreaux numérotés à partir de 2 apparaissent. Il faut ensuite glisser ces éléments avec les flèches du clavier, afin que deux carreaux portant le même montant se percutent et fusionnent en un, dont le montant est égal à la somme des deux précédents. 2+2=4, 4+4=8, 8+8=16, 16+16=32... jusqu'à atteindre le but ultime, le nombre 2048 dans une des "tuiles".

### Les fonctionnalitées 

- Utiliser les touches ou la souris pour deplacer les tuiles.
- Mettre en pause le chronomètre
- Système de score permettant d'ajouter des points lors de la combinaison de deux cases.
- Lorsque deux tuiles avec le plus gros nombre se combinent la progression augemente

### Les hauts-faits

- Réussir a avoir la tuile 1024
- Réussir a avoir la tuile 2048
- Réussir a avoir la tuile 2048 dans un temps imparti
- Réussir a avoir la tuile 2048 en un nombre de coup minimum
- Réussir a avoir la tuile 2048 en utilisant que 3 direction

### Niveaux de difficultés

- Facile : On à autant de temps que l'on veut
- Normale : On a 5 minutes
- Difficle : On a 3 minutes

## Green Ball 

### Le but du jeu 

Le but du jeu est de réussir à viser les bonnes cibles (poubelles) pour chacunes des balles (déchets) à disposition. Pour cela, il faudra diriger le personnage et l'angle de la raquette afin de renvoyer les balles le plus précisément possible vers les cibles.

### Les règles

Inspiré du paddle, vous êtes un joueur qui doit renvoyer 3 différentes balles/déchets en visant les bonnes cibles/poubelles le plus rapidement possible. Vous devez allier vitesse et lucidité pour éviter les points de pénalités et les pertes de vies afin d'atteindre des scores record dans un temps imparti !

### Les fonctionnalitées 

- Utiliser les touches pour deplacer le personnage et changer l'angle de la raquette.
- Système de score permettant d'ajouter ou d'enlever des points lorsqu'un déchet est jeté. (-1 mauvaise poubelle / +5 bonne poubelle)
- 3 cibles (poubelles) en mouvement. (3 types de poubelles : poubelle grise / poubelle verte / poubelle jaune)
- Lorsqu'un déchet est jeté dans la bonne poubelle, il change de "type". (3 types de déchets : banane / bouteille en verre / bouteille en plastique)
- Lorsque la balle passe derrière le personnage, le joueur perd une vie.

### Les hauts-faits

- Atteindre 10 de scores
- Atteindre 20 de scores
- Atteindre 50 de scores
- Atteindre 50 de scores
- Atteindre 50 de scores
- Atteindre 100 de scores
- Atteindre 100 de scores dans un temps imparti
- Atteindre 100 de scores en un nombre de coup minimum

### Niveaux de difficultés

- Facile : On a 5 minutes et 3 vies
- Normale : On a 5 minutes, la balle va plus vite et 2 vies
- Difficle : On a 3 minutes, la balle va plus vite, les cibles vont plus vite et 1 vie

## Navigation 

- Page de connexion : L'utilisateur se connecte sur le site web
- Page d'acceuil : L'utilisateur vois un résumer du site et des fonctions disponibles
- Menu jeux : Il peut accéder au 2048 ou au Sudoku
- Page 2048 : Page de jeu du 2048
- Page Sudoku : Page de jeu du sudoku
- Page de règle : Page qui contient les règles des jeux
- Page des objectifs et des scores : Page qui contient les meilleurs scores enregistrés par utilisateur et les objectifs réalisés.


## Persona
![image](https://user-images.githubusercontent.com/95616393/212349339-5b558b03-218e-441f-b362-daf5d2d78390.png)
![image](https://user-images.githubusercontent.com/95616393/212349376-2b8d21ed-e13f-44ed-a7fd-eaa4bf740425.png)
![image](https://user-images.githubusercontent.com/95616393/212349804-c55afeb5-076d-441b-ac98-95ff5cea7997.png)
![image](https://user-images.githubusercontent.com/95616393/212356685-d21f1620-7d9d-4a5e-8f73-ccc3f765264f.png)



## Scénarios 

- Scénario 1: Evan se connecte au site et se dirige vers la page de jeu de Sudoku. Il peut choisir parmi différents niveaux de difficulté et commencer à jouer immédiatement. Il connait les règles et décide de choisir de jouer .

- Scénario 2 : Marine se connecte à son site web préféré et se dirige vers la page du 2048 pour essayé de battre son record personnel qui est affiché juste en dessous du chronomètre pendant le jeu. Elle réussie à le battre et va sur la page objectif et score pour voir si son score a bien été mise à jour.

- Scénario 3 : Kayla ne connait pas le site et souhaite jouer au sudoku mais elle ne se souvient plus des règles/ Elle se dirige donc sur la page de règle et se renseigne.

- Scénario 4 : Gautier se connecte au site, clique sur la pgae du 2048, joue au 2048 et souhaite déplacer les tuiles vers la gauche il appuiye donc sur la flèche gauche de son clavier. Il finit la partie et se déconnete

- Scénario 5 : Evan se connecte au site web, va sur la page de sudoku, choisit la difficulter moyenne, lance la partie et place un chiffre sur la grille. Il choisit une case et pose un chiffre.

## Diagramme de tâches

![image](https://user-images.githubusercontent.com/95616393/214014087-ee7ff25b-8533-438f-b10d-d9232d5b456f.png)


## Maquette

https://www.figma.com/file/ZqPVR4uIvtkjXdkfGx6Bcc/Site-Web?node-id=0%3A1&t=vJBtFkNAEcPOEmAr-1


