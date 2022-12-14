import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Box } from '@chakra-ui/react'
import { ref, set, onValue, increment } from "firebase/database";
import database from '../config/firebase'


export default function Home() {

  const [counterBolsonaro, setCounterBolsonaro] = useState()
  const [counterLula, setCounterLula] = useState()

  const lulaRef = ref(database, 'lula');
  const bolsonaroRef = ref(database, 'bolsonaro');

  function incrementLula() {
    set(lulaRef, increment(1));
  }

  function incrementBolsonaro() {
    set(bolsonaroRef, increment(1));
  }

  useEffect(() => {
    onValue(lulaRef, (snapshot) => {
      const data = snapshot.val();
      console.log('lula')
      setCounterLula(data);
    });

    onValue(bolsonaroRef, (snapshot) => {
      const data = snapshot.val();
      console.log('bolso')

      setCounterBolsonaro(data);
    });
  }, [])


  return (
    <>
      <Head>
        <title>Lula VS Bolsonaro</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className={styles.main}>
        <Box display={"flex"} className={styles.images}>
          <Box as="button" onClick={() => incrementLula()}>
            <Image
              unselectable='on'
              src="/lula.jpg"
              alt="Lula"
              width={1000}
              height={1500}
              className={styles.image}
              style={{
                filter: counterLula < counterBolsonaro ? "grayscale(100%)" : "none",
                transition: "filter 1s ease-in-out"
              }}
            />
          </Box>
          <Box as="button" onClick={() => incrementBolsonaro()}>
            <Image
              src="/bolsonaro.jpg"
              alt="Bolsonaro"
              width={1000}
              height={1500}
              className={styles.image}
              style={{
                filter: counterBolsonaro < counterLula ? "grayscale(100%)" : "none",
                transition: "filter 1s ease-in-out"
              }}
            />
          </Box>
        </Box>

        <Box p={4} className={styles.clicks}>
          <Box>
            <h1><b>Quantidade de cliques</b></h1>
          </Box>
          {counterBolsonaro && counterLula ? <>
            <Box
              display={"flex"}
              justifyContent='space-between'
              className={styles.count}
            >
              <Box
                style={{
                  color: counterLula > counterBolsonaro ? "green" : counterLula == counterBolsonaro ? "yellow" : "red",
                }}
              >
                {counterLula}
              </Box>
              <Box
                style={{
                  color: counterBolsonaro > counterLula ? "green" : counterLula == counterBolsonaro ? "yellow" : "red",
                }}
              >
                {counterBolsonaro}
              </Box>
            </Box>
            <Box>
              <h1><b>Vencendo: {counterBolsonaro > counterLula ? "Bolsonaro" : counterLula == counterBolsonaro ? "Empatado" : "Lula"}</b></h1>
            </Box>
          </> :
            <Box>
              <h1><b>Carregando votos...</b></h1>
            </Box>
          }

        </Box>
      </Box>

    </>
  )
}
