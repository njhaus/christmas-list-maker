
import { Typography, Link } from '@mui/material'

const HomeFooter = () => {
  return (
    <footer className="home-footer">
      <Typography
        variant="caption"
        sx={{
          padding: '0.25rem',
          borderRadius: '10px',
          backgroundColor: '#ffffff88'
        }}
      >
        <Link href="https://www.freepik.com/free-vector/gift-boxes-seamless-patterns-set_11082608.htm#page=2&query=christmas%20gifts%20border&position=38&from_view=search&track=ais&uuid=a22a9fc0-1f3d-4543-9c0c-157a5cfccd80">
          Image by macrovector
        </Link>{" "}
        on Freepik / Image by{" "}
        <Link href="https://www.freepik.com/free-vector/pack-bright-christmas-lights_1375808.htm#fromView=search&term=holiday+lights+string&track=ais&regularType=vector&page=1&position=14&uuid=a13fcf5e-ce7d-4ac3-a53d-c2f01d4dd54a">
          Freepik
        </Link>
      </Typography>
    </footer>
  );
}

export default HomeFooter


