READ ME

# reséau social d'entreprise

## groupomania - backend
---------------------------------
## Comment utiliser cette API?

clonner le repository:
https://github.com/OliverMunian/Projet7_groupomania.git

## Pour lancer le serveur NodeJS:

Rendez-vous dans le fichier backend avec la commande 'cd backend" en ligne de commande avec le terminal. 
Puis effectuer les commandes suivantes dans l'ordre
```
npm install
nodemon
```
la commande nodemon permet de lancer le serveur coté "back"



## Base de donnée mysql
---------------------------------
Ouvrez projet7_backend/Models/Index.js avec un éditeur de code puis a la ligne 5 choisir le mot passe voulu pour mysql:

Ouvrez une nouvelle fenêtre dans le terminal
Assurez vous d'être dans le fichier backend
Puis lancez la commande suivante pour accéder a mysql

```
mysql u root -p
```

Creez une nouvelle base donnée que vous appellerez groupomania 

```
CREATE DATABASE groupomania;
```
Entrez ensuite la commande:
```
exit
```
puis importer le fichier groupomania_with_data_dump.sql pour récuperer les données avec la commande :
```
mysql -u root -p groupomania < groupomania_with_data_dump.sql
```
puis relancez mysql

```
mysql u root -p
```

Votre base donnée avec la data est enfin opérationnelle !