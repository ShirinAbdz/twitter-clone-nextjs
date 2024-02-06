import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "../styles/Tweet.module.css";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BasicTabs({
  id,
  username,
  content,
  date,
  profileImage,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
      >
        <Tab label="Liked Tweets" {...a11yProps(0)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        {/* Liked Tweets Content */}
        <div className={styles.tweet}>
          <div className={styles.tweetHeader}>
            <span className={styles.id}> {id}</span>
            <img src={profileImage} alt="Profile" className={styles.profilePic} />
            <span className={styles.username}>{username}</span>
          </div>
          <div className={styles.tweetContent}>
            <p>{content}</p>
          </div>
          <div className={styles.tweetFooter}>
            <span className={styles.tweetDate}>{date}</span>
          </div>
        </div>
      </CustomTabPanel>
    </Box>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
