import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { Button, Table } from 'antd'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { addPollutionCoord, addPollutionList } from '../store/pollutionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getComponents, getCoord } from '../store/pollutionSelectors'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function GeolocationPage() {
  const [city, setCity] = useState("");
  const dispatch = useDispatch()
  const coord = useSelector(getCoord)
  const data: Array<any> = useSelector(getComponents)

  const columns: Array<any> = [
    {
      title: 'Carbon monoxide, μg/m3',
      dataIndex: 'co',
      key: 'co',
    },
    {
      title: 'Nitrogen monoxide, μg/m3',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'Nitrogen dioxide, μg/m3',
      dataIndex: 'no2',
      key: 'no2',
    },
    {
      title: 'Ozone, μg/m3',
      dataIndex: 'o3',
      key: 'o3',
    },
    {
      title: 'Sulphur dioxide, μg/m3',
      dataIndex: 'so2',
      key: 'so2',
    },
    {
      title: 'Fine particles matter, μg/m3',
      dataIndex: 'pm2_5',
      key: 'pm2_5',
    },
    {
      title: 'Coarse particulate matter, μg/m3',
      dataIndex: 'pm10',
      key: 'pm10',
    },
    {
      title: 'Ammonia, μg/m3',
      dataIndex: 'nh3',
      key: 'nh3',
    }
  ];

  const options: object = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Диаграмма',
      },
    },
  };

  const labels = columns.map(item => item.title)
  const dataChart: any = {
    labels,
    datasets: [
      {
        label: 'загрязнения',
        data: columns.map(item => { return data[0] ? data[0][item.dataIndex] : '' }),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  }

  const getCityCoordinates = async () => {
    const response = await fetch('/getCityCoordinates', {
      method: 'POST',
      body: JSON.stringify({
        city: city
      }),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
    });
    const body = await response.json()

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };


  const onRequest = () => {
    getCityCoordinates()
      .then(res => {
        const dataComponents: Array<any> = res.list ? res.list : []
        dispatch(addPollutionCoord(res.coord))
        dispatch(addPollutionList(dataComponents.map(item => ({
          key: 1,
          co: item.components.co,
          no: item.components.no,
          no2: item.components.no2,
          o3: item.components.o3,
          so2: item.components.so2,
          pm2_5: item.components.pm2_5,
          pm10: item.components.pm10,
          nh3: item.components.nh3
        }))))
      })
      .catch(err => console.log('error:', err));
  }


  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", "justifyContent": "space-between" }}>
        <div style={{ display: "flex", "gap": "15px", "marginBottom": "30px" }}>
          <Link to="/about">О сервисе</Link>
          <Link to="/error">Страница 404</Link>
        </div>
        <Link id="logout" to="/">Выйти</Link>
      </div>
      <h2>Данные о загрязнении</h2>
      <form>
        <label>Введите населенный пункт,город:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <span>{coord && coord.length !== 0 ? ` ${coord.lon} - ${coord.lat}` : ''}</span>
        <br />
        <Button type="primary" onClick={() => onRequest()}>Запросить данные</Button>
      </form>
      <br />
      <p>Таблица загрязнений</p>
      <Table columns={columns} dataSource={data}></Table>
      <br />
      <Bar options={options} data={dataChart} />
    </div>
  )
}

export default GeolocationPage;