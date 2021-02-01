import './styles.css'
import { ReactComponent as LinkedinIcon} from './linkedin.svg'

function Footer() {
    return (
        <footer className="main-footer">
            App desenvolvido por Pedro Arthur - Aluno do curso de Sistemas de Informação da Unifacisa
            <div className="footer-icons">
                <a href="https://www.linkedin.com/in/pedro-arthur/" target="_new">
                    <LinkedinIcon/>
                </a>
            </div>
        </footer>
    )
}

export default Footer;