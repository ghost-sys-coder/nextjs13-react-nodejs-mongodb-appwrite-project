import Image from 'next/image'
import { Footer, Navbar } from './components';

export default function Home() {
  return (
    <div className='container'>
      <Navbar />
      <h1 className='text-3xl text-center text-black'>Home Page</h1>
      <Footer />
    </div>
  );
}
    