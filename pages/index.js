import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Header } from '../components/header'
import { Sidebar } from '../components/sidebar'
import { Main } from '../components/main'
import { Chat } from '../components/chat'

export default function Home() {
  return (
    <div style={{backgroundColor: '#292c33'}}>
      <Head>
        <title>DAPP CHAT</title>
        <meta name="description" content="A decentralized chat application" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
      </Head>

      <Header/>
      <Chat/>
    </div>
  )
}
