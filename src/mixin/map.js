import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
import {
  BmPolyline,
  BmlLushu,
  BmMarker,
  BmMapType,
  BmLabel,
  BmInfoWindow,
  BmlMarkerClusterer
} from 'vue-baidu-map';

export default {
  components: {
    BaiduMap,
    BmPolyline,
    BmlLushu,
    BmMarker,
    BmMapType,
    BmLabel,
    BmInfoWindow,
    BmlMarkerClusterer
  },
  data() {
    return {
      MAP: {},
      mapak: '6mh5nu0r0YE2nwaC7QLglTC35R2ARauf'
    };
  },
  beforeDestroy() {},
  methods: {
    mapReady({ BMap, map }) {
      this.MAP.BMap = BMap;
      this.MAP.map = map;
    },
    mapPoints(points) {
      const { BMap } = this.MAP;
      return points.map((item) => {
        return new BMap.Point(item.longitude, item.latitude);
      });
    }
  }
};
