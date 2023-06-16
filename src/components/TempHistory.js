import React, { useEffect } from 'react';
import Chart from 'chart.js';
import firebase from 'firebase/app';
import 'firebase/database';

const TempHistory = () => {
  useEffect(() => {
    const firebaseConfig = {
      // Votre configuration Firebase
    };
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    const fetchData = () => {
      database.ref('history/Ltn1').on('value', (snapshot) => {
        const data = snapshot.val();
        const temps = Object.keys(data); // Obtenez les clés (temps) depuis les données Firebase
        const temperatures = Object.values(data); // Obtenez les valeurs (températures) depuis les données Firebase

        // Utilisez les données pour générer votre courbe
        const ctx = document.getElementById('courbeCanvas').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: temps, // Utilisez les temps comme valeurs pour l'axe des x
            datasets: [
              {
                label: 'Température',
                data: temperatures, // Utilisez les températures comme valeurs pour l'axe des y
                borderColor: 'blue',
                borderWidth: 1
              }
            ]
          }
        });
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <canvas id="courbeCanvas"></canvas>
    </div>
  );
};

export default TempHistory;