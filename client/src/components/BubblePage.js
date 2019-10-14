import React, { useState } from 'react';
import { axiosAuthenticate } from '../utility/axiosAuthenticate';
import Bubbles from './Bubbles';
import ColorList from './ColorList';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  axiosAuthenticate()
    .get('/colors')
    .then((res) => {
      setColorList(res.data);
    });

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
