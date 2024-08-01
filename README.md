Pour commencer, créer une base de donnée PostgreSQL avec les informations suivante: \n

DB_USER=postgres \n
DB_PASSWORD=test \n
DB_HOST=localhost \n
DB_PORT=5432 \n
DB_NAME=postgres \n


Note: Au besoin, installer pgAdmin 4, puis dans l'onglet Object -> Register -> Server avec les informations présentées ci-haut \n


-Cloner le projet, \n
-Insérer le fichier de donnée à la racine du projet et le renommer data.csv \n
-Ouvrir deux terminaux, Puis effectuer les commandes suivantes: \n


Terminal 1:
cd api
npm install
npm start


Terminal  2:
cd web
npm install
npm run dev


Si toute la configuration fonctionne, on peut ensuite ouvrir la page sur http://localhost:5173/
