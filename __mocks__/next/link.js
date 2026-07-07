function MockLink({ children, href, ...props }) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

MockLink.displayName = 'MockLink';

export default MockLink;
