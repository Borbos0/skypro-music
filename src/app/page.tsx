import styles from './page.module.css';
import Bar from '@/components/Bar/Bar';
import SideBar from '@/components/SideBar/SideBar';
import CenterBlock from '@/components/Centerblock/CenterBlock';
import Navigation from '@/components/Navigation/Navigation';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <CenterBlock />
          <SideBar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
