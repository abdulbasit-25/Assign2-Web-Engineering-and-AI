const LOW_STOCK_THRESHOLD = 5;

function Footer() {
  return (
    <footer className="page-footer">
      <p className="footer-note">
        Stock status: Low stock is {LOW_STOCK_THRESHOLD} units or fewer.
      </p>

      <p className="footer-brand">
        Powered by{" "}
        <a
          href="https://abdulbasit-archer.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>ARCHER</strong>
        </a>
      </p>
    </footer>
  );
}

export default Footer;
