/**
 * 根据两点获取曲线坐标点数组
 * @param Point 起点
 * @param Point 终点
 */
function getCurveByTwoPoints(obj1, obj2) {
  if (!obj1 || !obj2 || !(obj1 instanceof BMap.Point) || !(obj2 instanceof BMap.Point)) { // eslint-disable-line no-undef
    return null;
  }

  const B1 = function (x) {
    return (1 - (2 * x)) + (x * x);
  };
  const B2 = function (x) {
    return (2 * x) - (2 * x * x);
  };
  const B3 = function (x) {
    return x * x;
  };

  let curveCoordinates = [];

  const count = 30; // 曲线是由一些小的线段组成的，这个表示这个曲线所有到的折线的个数
  let t;
  let h;
  let i = 0;
  let inc = 0;

  if (typeof (obj2) === 'undefined') {
    if (typeof (curveCoordinates) !== 'undefined') {
      curveCoordinates = [];
    }
    return curveCoordinates;
  }

  const lat1 = parseFloat(obj1.lat);
  const lat2 = parseFloat(obj2.lat);
  let lng1 = parseFloat(obj1.lng);
  let lng2 = parseFloat(obj2.lng);

  // 计算曲线角度的方法
  if (lng2 > lng1) {
    if (parseFloat(lng2 - lng1) > 180) {
      if (lng1 < 0) {
        lng1 = parseFloat(180 + 180 + lng1);
      }
    }
  }

  if (lng1 > lng2) {
    if (parseFloat(lng1 - lng2) > 180) {
      if (lng2 < 0) {
        lng2 = parseFloat(180 + 180 + lng2);
      }
    }
  }
  let t2 = 0;
  if (lat2 === lat1) {
    t = 0;
    h = lng1 - lng2;
  } else if (lng2 === lng1) {
    t = Math.PI / 2;
    h = lat1 - lat2;
  } else {
    t = Math.atan((lat2 - lat1) / (lng2 - lng1));
    h = (lat2 - lat1) / Math.sin(t);
  }
  if (t2 === 0) {
    t2 = (t + (Math.PI / 5));
  }
  const h2 = h / 2;
  const lng3 = (h2 * Math.cos(t2)) + lng1;
  const lat3 = (h2 * Math.sin(t2)) + lat1;

  for (i = 0; i < count + 1; i++) {
    curveCoordinates.push(new BMap.Point( // eslint-disable-line no-undef
      (lng1 * B1(inc)) + (lng3 * B2(inc)) + (lng2 * B3(inc)),
      (lat1 * B1(inc)) + (lat3 * B2(inc)) + (lat2 * B3(inc))
    ));
    inc += (1 / count);
  }
  return curveCoordinates;
}

/**
 * 根据弧线的坐标节点数组
 */
function getCurvePoints(points) {
  let curvePoints = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p = getCurveByTwoPoints(points[i], points[i + 1]);
    if (p && p.length > 0) {
      curvePoints = curvePoints.concat(p);
    }
  }
  return curvePoints;
}

export default function CurveLine(points, opts) {
  const curvePoints = getCurvePoints(points);
  const polyline = new BMap.Polyline(curvePoints, opts); // eslint-disable-line no-undef
  polyline.addEventListener('lineupdate', function () {
    if (this.isEditing) {
      this.enableEditing();
    }
  });
  polyline.cornerPoints = points;
  polyline.editMarkers = []; // 编辑功能的顶点

  /**
   * 重写弧线的编辑功能
   */
  polyline.enableEditing = function () {
    const self = this;
    if (self.map) {
      self.disableEditing();
      for (let i = 0; i < self.cornerPoints.length; i++) {
        const marker = new BMap.Marker(self.cornerPoints[i], { // eslint-disable-line no-undef
          icon: new BMap.Icon('http://api.map.baidu.com/library/CurveLine/1.5/src/circle.png', new BMap.Size(16, 16)), // eslint-disable-line no-undef
          enableDragging: true,
          raiseOnDrag: true
        });
        marker.addEventListener('dragend', () => {
          self.cornerPoints.length = 0;
          for (let j = 0; j < self.editMarkers.length; j++) {
            self.cornerPoints.push(self.editMarkers[j].getPosition());
          }
          const localCurvePoints = getCurvePoints(self.cornerPoints);
          self.setPath(localCurvePoints);
        });
        marker.index = i;
        self.editMarkers.push(marker);
        self.map.addOverlay(marker);
      }
    }
    self.isEditing = true;
  };

  /**
   * 重写弧线的编辑功能
   */
  polyline.disableEditing = function () {
    this.isEditing = false;
    // 清空之前的编辑点
    for (let i = 0; i < this.editMarkers.length; i++) {
      this.map.removeOverlay(this.editMarkers[i]);
      this.editMarkers[i] = null;
    }
    this.editMarkers.length = 0;
  };

  /**
   * 获取弧线的坐标点
   */
  polyline.getPath = function () {
    return curvePoints;
  };

  polyline.setCurvePath = function (path) {
    const self = this;
    self.cornerPoints = path;
    const localCurvePoints = getCurvePoints(self.cornerPoints);
    self.setPath(localCurvePoints);
  };
  return polyline;
}

