export async function getServerSideProps({ req }) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.headers["cf-connecting-ip"] ||
    req.socket.remoteAddress ||
    "IP not found";

  return { props: { ip } };
}

const IPPage = ({ ip }) => (
  <div style={{ textAlign: "center", marginTop: "50px", fontSize: "20px" }}>
    <h1>Your IP Address:</h1>
    <p>{ip}</p>
  </div>
);

export default IPPage;
