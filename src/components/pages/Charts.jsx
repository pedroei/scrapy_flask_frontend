import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';

import Loading from '../layout/Loading';

import axios from 'axios';

const Charts = () => {
  const { name } = useParams();
  const [foundProducts, setFoundProducts] = useState([]);
  const [productsDate, setProductsDate] = useState([]);
  const [productsPrice, setProductsPrice] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/previous`)
      .then((response) => {
        const products = response.data.filter((prod) => prod.name === name);
        setFoundProducts(products);
        const dates = products.map((prod) => prod.scrape_date);
        setProductsDate(dates);
        const prices = products.map((prod) =>
          parseFloat(prod.price.replace(',', '.'))
        );
        setProductsPrice(prices);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <Line
              data={{
                labels: productsDate,
                datasets: [
                  {
                    label: 'Price',
                    data: productsPrice,
                    backgroundColor: [
                      // 'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      // 'rgba(255, 206, 86, 0.2)',
                      // 'rgba(75, 192, 192, 0.2)',
                      // 'rgba(153, 102, 255, 0.2)',
                      // 'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      // 'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      // 'rgba(255, 206, 86, 1)',
                      // 'rgba(75, 192, 192, 1)',
                      // 'rgba(153, 102, 255, 1)',
                      // 'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                    fill: true,
                  },
                ],
              }}
              width={600}
              height={500}
              options={{ maintainAspectRatio: false }}
            />
          </div>
          <div style={{ marginTop: '100px' }}>
            <Bar
              data={{
                labels: productsDate,
                datasets: [
                  {
                    label: 'Price',
                    data: productsPrice,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              width={600}
              height={500}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: {
                    ticks: {
                      stepSize: 0.1,
                    },
                  },
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Charts;
