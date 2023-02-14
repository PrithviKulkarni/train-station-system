import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "../styles/Footer.css";

const Footer = () => {
  return (
   
    <div className="footer bg-primary">
      <ul>
        <li>
          <a href="https://twitter.com/FDMGroup">Twitter</a>
        </li>
        <li>
          <a href="mailto:zainab.bikar@fdmgroup.com">Email</a>
        </li>
        <li>
          <a href="https://git.fdmgroup.com/Prithvi.Kulkarni/pk-zb-train-management-system-react">GitLab</a>
        </li>
        <li>
          <p>👋</p>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
