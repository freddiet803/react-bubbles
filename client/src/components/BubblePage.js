import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Bubbles from './Bubbles';
import ColorList from './ColorList';
import AxiosWithAuth from '../AxiosWithAuth';

const BubblePage = props => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    const doIT = () => {
      AxiosWithAuth()
        .get('http://localhost:5000/api/colors')
        .then(res => {
          console.log(res);
          // console.log(res.data);
          setColorList(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    };
    doIT();
  }, []);

  return (
    <>
      <ColorList
        theprops={props}
        colors={colorList}
        updateColors={setColorList}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
