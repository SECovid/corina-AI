import React,  { useState } from 'react';

import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors ,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import send_request from '../../API/APIcalls';

const CovidStatistics = (props) => {
  const theme = useTheme();

  const getData= (factor) =>{
    send_request('admin/statistics/factor/'+factor,'GET').then(
      res => {
        console.log(factor)
        console.log('FACTOR ',res)
        const ifTrue = res['data']['ifTrue'] * 100
        const ifFalse = res['data']['ifFalse'] * 100


        switch(factor) {
          case "contact_with_infected_person_14days":
            factor = "Contact with infected person"
            break;
          case "visited_healthcare_facility_14days":
            factor = "Visited healthcare facility"
            break;
          case "tested_positive_14days":
            factor = "Tested positive"
            break;
          case "fever":
            factor = "Fever"
            break;
          case "breathing_difficulty":
            factor = "Breathing difficulty"
            break;
          case "sore_throat":
            factor = "Sore throat"
            break;
          case "cough":
            factor = "Cough"
            break;
          case "no_taste":
            factor = "No taste"
            break;
          case "no_smell":
            factor = "No smell"
            break;
          case "headache":
            factor = "Headache"
            break;
          default:
            // code block
        }


        setData({
          datasets: [
            {
              backgroundColor: colors.indigo[500],
              data: [ifTrue, ifFalse],
              label: 'Covid'
            },
            {
              backgroundColor: colors.grey[200],
              data: [100-ifTrue, 100-ifFalse],
              label: 'No Covid'
            }
          ],
          labels: [factor+': True', factor+': False']
        }

        )
        console.log(data)
      }
    )
  }
  const [data, setData] = useState({
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: [0, 0],
        label: 'Covid'
      },
      {
        backgroundColor: colors.grey[200],
        data: [0,0],
        label: 'No Covid'
      }
    ],
    labels: ['', '']
  });
  





  const handleChange = (e) => {
    console.log("IN HANDLE CHANGE")
    console.log(e.target.value)
    getData(e.target.value)
  };
  const options = {
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
            <CardHeader
        action={
          <FormControl>
            <InputLabel>Factor</InputLabel>
            <Select onChange={handleChange} style={{ width: 100 }}>
         
              <MenuItem value="travel_abroad_14days">Traveled abroad in the past 14 days</MenuItem>
              <MenuItem value="contact_with_infected_person_14days">Had contact with an infected person in the past 14 days</MenuItem>
              <MenuItem value="visited_healthcare_facility_14days">Visited a healthcare facility in the past 14 days</MenuItem>
              <MenuItem value="tested_positive_14days">Tested positive for covid in the past 14 days</MenuItem>
              <MenuItem value="fever">Fever > 38°C</MenuItem>
              <MenuItem value="breathing_difficulty">Breathing difficulties</MenuItem>
              <MenuItem value="sore_throat">Sore throat</MenuItem>
              <MenuItem value="cough">Cough</MenuItem>
              <MenuItem value="no_taste">No taste</MenuItem>
              <MenuItem value="no_smell">No smell</MenuItem>
              <MenuItem value="headache">Headache</MenuItem>
            </Select>
          </FormControl>
        }
        title="Covid statistics"
      ></CardHeader>
      <Divider />
      <CardContent>
      <div style={{'height':350}}> 
          <Bar
            data={data}
            options={options}
          />
      </div>
      </CardContent>

    </Card>
  );
};

export default CovidStatistics;
