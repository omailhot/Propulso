Pour commencer, créer une base de donnée PostgreSQL avec les informations suivante:

DB_USER=postgres
DB_PASSWORD=test
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres


Note: Au besoin, installer pgAdmin 4, puis dans l'onglet Object -> Register -> Server avec les informations présentées ci-haut


-Cloner le projet,
-Insérer le fichier de donnée à la racine du projet et le renommer data.csv
-Ouvrir deux terminaux, Puis effectuer les commandes suivantes:


Terminal 1:
cd api
npm install
npm start


Terminal  2:
cd web
npm install
npm run dev


Si toute la configuration fonctionne, on peut ensuite ouvrir la page sur http://localhost:5173/
