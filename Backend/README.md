READ ME

# Groupomania - reséau social d'entreprise
---------------------------------
## Comment utiliser cette API?

Clonner le repository:
https://github.com/OliverMunian/Groupomania.git

## Lancer le serveur NodeJS:

Rendez-vous dans le fichier Backend avec la commande 'cd Backend" en ligne de commande avec le terminal. 

Puis effectuer les commandes suivantes dans l'ordre
```
npm install
nodemon
```
la commande nodemon permet de lancer le serveur coté "back"





## Base de donnée mysql
---------------------------------
Ouvrez Groupomania/Backend/Models/Index.js avec un éditeur de code puis à la ligne 5 choisir le mot passe voulu pour mysql:

Ouvrez une nouvelle fenêtre dans le terminal
Assurez vous d'être dans le fichier backend
Puis lancez la commande suivante pour accéder a mysql

```
mysql -u {votre user} -p
```

Creez une nouvelle base donnée que vous appellerez groupomania (ce nom a été choisie arbitrairement vous pouvez le changer)

```
CREATE DATABASE groupomania;
```
Entrez ensuite la commande:
```
exit
```
puis importer le fichier groupomania_with_data_dump.sql pour récuperer les données avec la commande :
```
mysql -u {votre user} -p groupomania < groupomania_with_data_dump.sql
```
puis relancez mysql

```
mysql -u {votre user} -p
Use groupomania
```

Votre base donnée avec la data est enfin opérationnelle ! Vous pouvez désormais changer les données dans env.json pour faire coincider les données avec votre base donnée en local
