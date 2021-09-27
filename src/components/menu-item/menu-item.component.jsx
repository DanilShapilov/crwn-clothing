import { useRouteMatch, useHistory } from "react-router-dom";
import {
  BackgroundImageContainer,
  ContentContainer,
  ContentSubtitle,
  ContentTitle,
  MenuItemContainer,
} from "./menu-item.styles";

const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
  const { url } = useRouteMatch();
  const history = useHistory();
  return (
    <MenuItemContainer
      size={size}
      onClick={() => history.push(`${url}${linkUrl}`)}
    >
      <BackgroundImageContainer
        imageUrl={imageUrl}
        className="background-image"
      />
      <ContentContainer>
        <ContentTitle>{title.toUpperCase()}</ContentTitle>
        <ContentSubtitle>SHOP NOW</ContentSubtitle>
      </ContentContainer>
    </MenuItemContainer>
  );
};

export default MenuItem;
