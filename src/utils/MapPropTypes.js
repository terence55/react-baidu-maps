import PropTypes from 'prop-types';

/**
 * PropTypes for Baidu Map Basic Classes
 * @author terencewu
 */

const Point = {
  lng: PropTypes.number,
  lat: PropTypes.number
};

const Size = {
  width: PropTypes.number,
  height: PropTypes.number
};

const Bounds = {
  sw: PropTypes.shape(Point),
  ne: PropTypes.shape(Point)
};

const Icon = {
  imageUrl: PropTypes.string,
  anchor: PropTypes.shape(Size),
  size: PropTypes.shape(Size),
  imageOffset: PropTypes.shape(Size),
  imageSize: PropTypes.shape(Size),
  infoWindowAnchor: PropTypes.shape(Size)
};

const Label = {
  position: PropTypes.shape(Point),
  style: PropTypes.object,
  content: PropTypes.string,
  offset: PropTypes.shape(Size),
  title: PropTypes.string,
  enableMassClear: PropTypes.bool,
  zIndex: PropTypes.number
};

const SubwaySize = {
  width: PropTypes.number,
  height: PropTypes.number
};

const SubwayIcon = {
  url: PropTypes.string,
  size: PropTypes.shape(SubwaySize)
};

export {Point, Size, Bounds, Icon, Label, SubwaySize, SubwayIcon};
