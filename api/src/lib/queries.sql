-- Visites par mois
CREATE TABLE visits_per_month (
  month DATE PRIMARY KEY,
  visits INTEGER
);

-- Visiteurs par mois
CREATE TABLE visitors_per_month (
  month DATE PRIMARY KEY,
  visitors INTEGER
);

-- Durée moyenne des visites
CREATE TABLE average_visit_duration (
  month DATE PRIMARY KEY,
  average_duration INTEGER -- en secondes
);

-- Vitesse moyenne des déplacements par mois
CREATE TABLE average_speed_per_month (
  month DATE PRIMARY KEY,
  average_speed FLOAT -- en km/h
);

-- Nombre de jour moyen entre les visites des visiteurs
CREATE TABLE average_days_between_visits (
  month DATE PRIMARY KEY,
  average_days INTEGER
);