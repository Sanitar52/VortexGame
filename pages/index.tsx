import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import Router from 'next/router';
import styles from '../styles/header.module.css';


interface User {
  name: string;
  surname: string;
}

const Homepage = () => {
 return (
      <div>
        <h1>Anasayfa</h1>
      </div>
  );
};

export default Homepage;