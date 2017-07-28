/**
 * Utilities Transformation of Baidu Map Classes
 * @author terencewu
 */

export function getMapType(type) {
  const MAP = {
    normal: BMAP_NORMAL_MAP, // eslint-disable-line no-undef
    perspective: BMAP_PERSPECTIVE_MAP, // eslint-disable-line no-undef
    satellite: BMAP_SATELLITE_MAP, // eslint-disable-line no-undef
    hybrid: BMAP_HYBRID_MAP // eslint-disable-line no-undef
  };
  if (MAP[type]) {
    return MAP[type];
  }
  return BMAP_NORMAL_MAP; // eslint-disable-line no-undef
}

export function getMarkerAnimation(animation) {
  const MAP = {
    drop: BMAP_ANIMATION_DROP, // eslint-disable-line no-undef
    bounce: BMAP_ANIMATION_BOUNCE // eslint-disable-line no-undef
  };
  if (MAP[animation]) {
    return MAP[animation];
  }
  return Null; // eslint-disable-line no-undef
}

export function toBMapPoint(arg) {
  return new BMap.Point(arg.lng, arg.lat); // eslint-disable-line no-undef
}

export function toBMapSize(arg) {
  return new BMap.Size(arg.width, arg.height); // eslint-disable-line no-undef
}

export function toBMapBounds(arg) {
  return new BMap.Bounds(toBMapPoint(arg.sw), toBMapPoint(arg.ne)); // eslint-disable-line no-undef
}

export function toBMapIcon(arg) {
  const icon = new BMap.Icon(arg.imageUrl, toBMapSize(arg.size)); // eslint-disable-line no-undef
  if (arg.anchor) {
    icon.setAnchor(toBMapSize(arg.anchor));
  }
  if (arg.imageOffset) {
    icon.setImageOffset(toBMapSize(arg.imageOffset));
  }
  if (arg.imageSize) {
    icon.setImageSize(toBMapSize(arg.imageSize));
  }
  if (arg.infoWindowAnchor) {
    icon.setInfoWindowAnchor(toBMapSize(arg.infoWindowAnchor));
  }
  return icon;
}

export function toBMapLabel(arg) {
  const label = new BMap.Label(arg.content); // eslint-disable-line no-undef
  if (arg.style) {
    label.setStyle(arg.style);
  }
  if (arg.position) {
    label.setPosition(toBMapPoint(arg.position));
  }
  if (arg.offset) {
    label.setOffset(toBMapSize(arg.offset));
  }
  if (arg.title) {
    label.setTitle(arg.title);
  }
  if (arg.enableMassClear) {
    label.enableMassClear();
  } else {
    label.disableMassClear();
  }
  if (arg.zIndex) {
    label.setZIndex(arg.zIndex);
  }
  return label;
}
