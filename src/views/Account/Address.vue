<template>
  <ProfileNav active="address" />
  <div class="container">
    <div class="row">
      <div class="col-12 fs-3">
        <h4 class="pt-3">Địa chỉ</h4>
        <span class="pl-2 py-2">Địa chỉ của bạn</span>
      </div>
    </div>
  </div>
  <form class="container">
    <div class="row">
      <div class="col-9">
        <dl class="row mt-2">
          <dt class="col-sm-3">Địa chỉ cụ thể</dt>
          <dd class="col-sm-9">{{ user.address?.line }}</dd>

          <dt class="col-sm-3">Thành phố</dt>
          <dd class="col-sm-9">{{  user.address?.city }}</dd>

          <dt class="col-sm-3">Quốc gia</dt>
          <dd class="col-sm-9">{{ user.address?.country }}</dd>

          <dt class="col-sm-3 text-truncate">Mã bưu điện</dt>
          <dd class="col-sm-9">{{ user.address?.postcode }}</dd>
        </dl>
        <hr>
        <div class="row mt-4">
          <div class="col-12">
            <h5>Tìm kiếm hoặc nháy đúp trên bản đồ</h5>
          </div>
          <div class="col-md-4">
            <input class="form-control suggest" type="text" placeholder="Search address" :disabled="!editMode" v-model="query" @input="input">
            <div id="autocomplete-list" class="autocomplete-items margin-right-10-sm margin-right-10-md" v-if="suggest">
              <div v-for="(ad, index) in this.suggestedAddress" :key="index" @click="select">
                <strong>{{ ad.display_name }}</strong>
                <input type="hidden" :value="index">
              </div>
            </div>
          </div>
          <div class="col-md-8 form-body">
            <div id="map"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4"></div>
          <div class="form-group col-md-8 form-body">
            <label>Nhập địa chỉ</label>
            <input type="text" class="form-control mb-3" placeholder="Địa chỉ cụ thể" v-model="line" :readonly="!editMode || !manual">
            <input type="text" class="form-control mb-3" placeholder="Thành phố" v-model="city" :readonly="!editMode || !manual">
            <input type="text" class="form-control mb-3" placeholder="Quốc gia" v-model="country" :readonly="!editMode || !manual">
            <input type="text" class="form-control" placeholder="Mã bưu điện" v-model="postcode" :readonly="!editMode || !manual">
          </div>
        </div>
      </div>
      <div class="col-3">
        <button type="button" class="btn btn-secondary m-3" v-show="!editMode" @click="() => this.editMode = true">Thay đổi</button>
        <button type="submit" class="btn btn-primary m-3" @click="saveChanged" v-show="editMode">Lưu thay đổi</button>
        <Switch @getVal="(value) => this.manual = value" content="Nhập thủ công" :show="!editMode"/>
      </div>
    </div>
  </form>
</template>
<script>
import axios from 'axios';
import ProfileNav from '../../components/ProfileNav.vue';
import Switch from '../../components/Atomic/Switch.vue';
export default {
  data() {
    return {
      editMode: false,
      line: null,
      city: null,
      country: null,
      postcode: null,
      manual: false,
      suggest: false,
      suggestedAddress: [],
      query: null,
      lat: null,
      lon: null,
    }
  },
  name: 'Address',
  props: ["baseURL", "motors", "user"],
  emits: ["fetchData"],
  components: { ProfileNav, Switch },
  methods: {
    saveChanged(event) {
      event.preventDefault();
      swal({
        icon: "warning",
        text: "Lưu thay đổi",
        buttons: {
          confirm: {
            text: "OK",
            value: "OK"
          },
          cancel: true,
        },
      }).then(value => {
        if (value == "OK") {
          axios.patch(`${this.baseURL}user/update/address`, {
            line: this.line,
            city: this.city,
            country: this.country,
            postcode: this.postcode
          }, {
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then(() => {
            swal({
              text: "Thông tin địa chỉ đã được cập nhật.",
              icon: "success",
            });
            this.$emit("fetchData");
          })
          .catch(err => {
            console.log(err);
            swal({
              text: err.message,
              icon: "error",
            })
          })
          this.editMode = false;
        }
      });
    },

    async mapDblClick(event) {
      if (!this.editMode) return;
      const popup = L.popup();
      popup
        .setLatLng(event.latlng)
        .setContent("Địa chỉ của bạn ở đây.")
        .openOn(this.map);
      this.lat = event.latlng.lat;
      this.lng = event.latlng.lng;
      await axios
        .get(`https://nominatim.openstreetmap.org/reverse?lat=${this.lat}&lon=${this.lng}&format=jsonv2`)
        .then(res => {
          const address = res.data.address;
          this.city = address.city;
          this.country = address.country;
          this.postcode = address.postcode;
          this.line = this.getLine([address.office, address.house_number, address.road, address.neighbourhood, address.city_district])
        })
        .catch(err => console.log(err));
      this.map.flyTo([this.lat, this.lng], 17);
    },

    animationStab() {
      L.Popup.prototype._animateZoom = function (e) {
        if (!this._map) {
          return
        }
        var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
          anchor = this._getAnchor()
        L.DomUtil.setPosition(this._container, pos.add(anchor))
      }
    },

    getLine(arr) {
      let res = ""
      arr.forEach(element => {
        if (element != null || element != undefined) res = res + element + ", ";
      });
      return res;
    },

    async fetchAddress(query) {
      await axios
        .get(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5&addressdetails=1`)
        .then((res) => {
          if (query == this.query) {
            this.suggestedAddress = res.data;
          }
        })
        .catch((err) => console.log(err));
    },

    select(event) {
      let index = 0;
      if (event.target.lastChild.value != undefined) {
        index = event.target.lastChild.value;
      } else {
        index = event.target.parentNode.lastChild.value;
      }
      const item = this.suggestedAddress[index];
      this.query = item.display_name;
      this.city = item.address.city;
      this.country = item.address.country;
      this.postcode = item.address.postcode;
      this.line = this.getLine([item.address.office, item.address.house_number, item.address.road, item.address.neighbourhood, item.address.city_district]);
      this.suggest = false;
    },
      
    input() {
      this.suggest = true;
      this.fetchAddress(this.query);
    },
  },
  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push({ name: 'Home' })
    }
    this.map = L.map('map').setView([21.03, 105.85], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    this.map.on('dblclick', this.mapDblClick);
    this.animationStab();
  }
}
</script>
<style scoped>
.fs-3 {
  font-size: larger;
}

.btn {
  min-width: 135px;
}

dt {
  text-align: right;
}

.form-control {
  height: 43px;
}

.form-body {
  min-height: 200px;
}

h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}

.suggest {
  height: 40px;
}

#map {
  height: 300px !important;
  margin: 0 !important;
}

.autocomplete-items {
  position: absolute;
  z-index: 99;
  left: 15px;
  right: 15px;
  top: 40px;
  border: 2px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
}
.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 2px solid #d4d4d4;
}
.autocomplete-items div:hover {
  /*when hovering an item:*/
  background-color: #e9e9e9;
}
.autocomplete-active {
  /*when navigating through the items using the arrow keys:*/
  background-color: DodgerBlue !important;
  color: #ffffff;
}
</style>