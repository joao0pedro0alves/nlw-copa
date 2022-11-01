interface HomeProps {
  count: number
}

export default function Home(props: HomeProps) {
  return (
    <h1>
      Contagem: {props.count}
    </h1>
  )
}

export const getServerSideProps = async () => {
  const response  = await fetch('http://192.168.1.196:3333/pools/count')
  const data = await response.json()

  return {
    props: {
      count: data.count
    }
  }
}

// SSR: Server side rendering