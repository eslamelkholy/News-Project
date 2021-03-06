import React, {useContext} from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Moment from "react-moment";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import 'moment/locale/ar-sa';
import '../../Service/axiosInstance';
// Styles
import TabPanel from './style/TabPanel';
import a11yProps from './style/scrollStyle';
import useStyles from './style/headLinesStyle';
import AddRemoveUserFavorites from "./AddRemoveUserFavorites";
// Service & Context
import { AuthContext } from '../../Context/AuthContext';
import NewsService from '../../Service/NewsService';
const NewsHeadline = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const newsHeadlines = props.newsHeadlines;
  const {userFavoritesId} = useContext(AuthContext);
    const { getUserFavoritesData } = useContext(AuthContext);
  const addToFavorites = (articleId) => {
    NewsService.addToFavorites(articleId);
    getUserFavoritesData();
  }
  const removeFromFavorites = (articleId) => {
    NewsService.removeFromFavorites(articleId);
    getUserFavoritesData();
}
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {newsHeadlines.map((news, index) => {
            return <Tab label={news.title} {...a11yProps(index)} />;
          })}
        </Tabs>
      </AppBar>
      {newsHeadlines.map((news, index) => {
        return (
          <TabPanel value={value} index={index} {...props}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={news.urlToImage}
                  title={news.title}
                  onClick={() => props.history.push(`/article/${news.id}`)}
                />
                <CardContent>
                <div className="eventRecords">
                <div class="profile-cover__info">
                  <ul class="nav myRecordsList">
                    <li className="eventList">
                      <strong> 
                      {
                        userFavoritesId.includes(news.id) ? 
                        <StarIcon fontSize={"large"} color={"error"} onClick={() => removeFromFavorites(news.id)} />
                        :
                        <StarBorderIcon fontSize={"large"} color={"error"} onClick={() => addToFavorites(news.id)} />
                      }
                      </strong> 
                    </li>
                  </ul>
                </div>
                  </div>
                  <Typography gutterBottom variant="h5" component="h2">
                    {news.description}
                    <p className="newsDate">
                      <Moment locale="ar-sa" format="D MMM YYYY" withTitle>{news.publishedAt}</Moment>
                    </p>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {news.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
              <AddRemoveUserFavorites news={news} />
                <Button onClick={() => props.history.push(`/article/${news.id}`)} size="small" color="primary" variant="contained">
                  See More..
                </Button>
              </CardActions>
            </Card>
          </TabPanel>
        );
      })}
    </div>
  );
};
export default NewsHeadline;
