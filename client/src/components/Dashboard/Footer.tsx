import "./footer.scss";

const Footer = () => {
  return (
    <footer
      class="footer"
      role="contentinfo"
      itemscope
      itemtype="http://schema.org/WPFooter"
    >
      <div class="footer-bottom">
        <p>© 2024 NoteMaster Pro.</p>
        <ul class="footer-bottom-links">
          <li>
            <a href="#">Legal</a>
          </li>
          <li>
            <a href="#">Credits</a>
          </li>
          <li>
            <a href="#">Sponsor/Advertise</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
