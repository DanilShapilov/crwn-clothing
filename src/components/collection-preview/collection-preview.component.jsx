import { useRouteMatch, useHistory } from "react-router";
import CollectionItem from "../collection-item/collection-item.component";
import {
  CollectionPreviewContainer,
  PreviewContainer,
  TitleContainer,
} from "./collection-preview.styles";

const CollectionPreview = ({ title, items, routeName }) => {
  const { path } = useRouteMatch();
  const history = useHistory();
  return (
    <CollectionPreviewContainer>
      <TitleContainer onClick={() => history.push(`${path}/${routeName}`)}>
        {title.toUpperCase()}
      </TitleContainer>
      <PreviewContainer>
        {items
          .filter((_, idx) => idx < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </PreviewContainer>
    </CollectionPreviewContainer>
  );
};

export default CollectionPreview;
