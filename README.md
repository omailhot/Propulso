Pour commencer, créer une base de donnée PostgreSQL avec les informations suivante: <br>

DB_USER=postgres <br>
DB_PASSWORD=test <br>
DB_HOST=localhost <br>
DB_PORT=5432 <br>
DB_NAME=postgres <br>


Note: Au besoin, installer pgAdmin 4, puis dans l'onglet Object -> Register -> Server avec les informations présentées ci-haut <br>


-Cloner le projet, \n
-Insérer le fichier de donnée à la racine du projet et le renommer data.csv <br>
-Ouvrir deux terminaux, Puis effectuer les commandes suivantes: <br>


Terminal 1:
cd api
npm install
npm start


Terminal  2:
cd web
npm install
npm run dev


Si toute la configuration fonctionne, on peut ensuite ouvrir la page sur http://localhost:5173/
