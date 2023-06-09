import git from '../assets/github.png';
import linkedin from '../assets/linkedin.png';
import gmail from '../assets/gmail.png';
import whatsapp from '../assets/whatsapp.png';
import style from '../styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <a href="https://github.com/GavidiaS" target='_blank'><img src={git} alt="GitHub" /></a>
      <a href="https://www.linkedin.com/in/santiago-gavidia/" target='_blank'><img src={linkedin} alt="LinkedIn" /></a>
      <a href="#"><img src={gmail} alt="Gmail" /></a>
      <a href="#"><img src={whatsapp} alt="WhatsApp" /></a>
    </footer>
  );
}