<template>
  <div id="loan" class="container-fluid">
    <section>
      <div class="row py-3">
        <h6 class="ml-5 col-12">Ảnh xe</h6>
        <div class="float-left motor-image" v-for="i in index">
          <AddImage v-if="i < index" :img="{ name: `image${i}`, url: this.URLs[i-1] }" 
            :baseURL="baseURL"
            :index="i"
            :del="editMode" 
            @addImage="addImage" 
            @remove="removeImage"              
          />
          <AddImage v-else-if="editMode" :baseURL="baseURL" @addImage="addImage"/>
          <ImageBox v-else-if="index == 1" ph="true" :image="{ name: '', url: '' }"/>
        </div>
      </div>
      <div class="container">
        <form class="row">
          <div class="form-group col-md-6">
            <label>Hãng sản xuất</label>
            <input type="text" class="form-control" v-model="production" :readonly="!editMode">
          </div>
          <div class="form-group col-md-6">
            <label>Mẫu</label>
            <input type="text" class="form-control" v-model="model" required :readonly="!editMode">
          </div>
          <div class="form-group col-md-4">
            <label>Biển số</label>
            <input type="text" class="form-control" v-model="license" required :readonly="!editMode">
          </div>
          <div class="form-group col-md-4">
            <label>Dung tích cylinder</label>
            <input type="text" class="form-control" v-model="engineSize" required :readonly="!editMode">
          </div>
          <div class="form-group col-md-4">
            <label>Loại xăng</label>
            <input type="text" class="form-control" v-model="fuel" required :readonly="!editMode">
          </div>
          <div class="form-group col-md-6">
            <label>Loại cần số</label>
            <select class="form-control" v-model="type" required :readonly="!editMode">
              <option value="AUTOMATIC">Tự động</option>
              <option value="MANUAL">Thủ công</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label>Năm sản xuất</label>
            <input type="number" class="form-control" v-model="year" :readonly="!editMode">
          </div>
          <div class="form-group col-md-6">
            <label>Giá cọc</label>
            <input type="number" class="form-control" v-model="deposit" required :readonly="!editMode">
          </div>
          <div class="form-group col-md-6">
            <label>Giá trên giờ</label>
            <input type="number" class="form-control" v-model="price" required :readonly="!editMode">
          </div>
          <div class="form-group col-12">
            <label>Địa chỉ</label>
            <div id="map"></div>
            <input class="form-control map" type="text" placeholder="Tìm kiếm hoặc nháy đúp trên bản đồ." 
              v-model="query" 
              @input="input" 
              :readonly="!editMode"
            >
            <div id="autocomplete-list" class="autocomplete-items margin-right-10-sm margin-right-10-md" v-if="this.suggest">
              <div v-for="(ad, index) in this.suggestedAddress" :key="index" @click="select">
                <strong>{{ ad.display_name }}</strong>
                <input type="hidden" :value="index">
              </div>
            </div>
          </div>
          <div class="form-group col-12">
            <label>Khoảng cách mượn (km)</label>
            <input class="form-control" type="number" v-model="radius" :readonly="!editMode">
          </div>
          <div class="form-group col-12">
            <label>Chú ý</label>
            <textarea v-model="note" name="note" id="note" cols="12" rows="5" class="form-control" :readonly="!editMode"></textarea>
          </div>
          <div class="form-group col-md-6">
            <label for="minAge">Tuổi lái xe tối thiểu:</label>
            <input type="number" class="form-control" id="minAge" placeholder="Age" v-model="minAge" :readonly="!editMode">
          </div>
          <div class="form-group col-md-6">
            <label>Số năm lái xe tối thiểu: </label>
            <input type="number" class="form-control" v-model="minDriving" required :readonly="!editMode">
          </div>
          <div class="form-group col-md-6">
            <label>Thời gian thuê tối thiểu</label>
            <div class="input-group">
              <input type="number" class="form-control" id="minDay" v-model="minDurDay" required :readonly="!editMode">
              <div class="input-group-append">
                <label class="input-group-text" for="minDay">Ngày</label>
              </div>
              <input type="number" class="form-control" id="minHour" v-model="minDurHour" required :readonly="!editMode">
              <div class="input-group-append">
                <label class="input-group-text" for="minHour">Giờ</label>
              </div>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Thời gian thuê tối đa</label>
            <div class="input-group">
              <input type="number" class="form-control" id="maxDay" v-model="maxDurDay" required :readonly="!editMode">
              <div class="input-group-append">
                <label class="input-group-text" for="maxDay">Ngày</label>
              </div>
              <input type="number" class="form-control" id="maxHour" v-model="maxDurHour" required :readonly="!editMode">
              <div class="input-group-append">
                <label class="input-group-text" for="maxHour">Giờ</label>
              </div>
            </div>
          </div>
          <div class="form-group col-12">
            <label>Tính năng</label>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="damageInsurance" v-model="dI" :disabled="!editMode">
              <label class="form-check-label" for="damageInsurance">
                Bao gồm bảo hiểm xe.
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="stolenInsurance" v-model="sI" :disabled="!editMode">
              <label class="form-check-label" for="stolenInsurance">
                Bao gồm bảo hiểm mất cắp.
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="orderCanceling" v-model="oC" :disabled="!editMode">
              <label class="form-check-label" for="orderCanceling">
                Việc thuê xe có thể hủy trước 48 giờ.
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="fuelCost" v-model="fC" :disabled="!editMode">
              <label class="form-check-label" for="fuelCost">
                Xăng cần phải đổ như lúc bắt đầu thuê.
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="adjust" v-model="aJ" :disabled="!editMode">
              <label class="form-check-label" for="adjust">
                Đã bao gồm tất cả phụ phí và thuế.
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="others" v-model="oCheck" :disabled="!editMode">
              <label class="form-check-label" for="others">
                Khác:
              </label>
              <input class="form-control" type="text" placeholder="Nhập ở đây, phân cách bằng dấu phẩy." 
                :disabled="!oCheck"
                v-model="others"
              >
              </div>
            </div>
          <button type="button" class="btn btn-primary ml-auto mt-3" v-if="editMode" @click="submit">Xác nhận</button>
          <button type="button" class="btn btn-info ml-auto mt-3" v-else @click="edit">Sửa</button>
          <button type="button" class="btn btn-danger ml-4 mr-auto mt-3" @click="remove">Xóa</button>
        </form>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios';
import AddImage from '../../components/Image/AddImage.vue';
import ImageBox from '../../components/Image/ImageBox.vue';
import swal from 'sweetalert';
export default {
    data() {
      return {
        id: null,
        vehicle: "",
        index: 1,
        URLs: [],
        images: [],
        type: null,
        production: null,
        model: null,
        license: null,
        engineSize: null,
        fuel: null,
        price: 0,
        deposit: 0,
        year: null,
        note: null,
        dI: false,
        sI: false,
        fC: false,
        oC: false,
        aJ: false,
        oCheck: false,
        others: null,
        minAge: 0,
        minDriving: 0,
        minDurHour: 0,
        maxDurHour: 0,
        minDurDay: 0,
        maxDurDay: 0,
        address: null,
        lng: 0,
        lat: 0,
        radius: 0,
        suggest: false,
        query: "",
        suggestedAddress: [],
        map: null,
        editMode: false,
      } 
    },
    props: ["baseURL"],
    name: 'EditMotor',
    components: { AddImage, ImageBox },
    methods: {
      addImage(url) {
        this.index = this.index + 1;
        this.URLs.push(url);
        this.images.push(url.slice(`${this.baseURL}fileUpload/files/`.length));
      },

      async fetchMotor() {
        await axios.get(`${this.baseURL}motor/${this.id}`)
          .then(res => {
            const motor = res.data;
            this.model = motor.model;
            this.production = motor.production;
            this.license = motor.licensePlate;
            this.engineSize = motor.engineSize;
            this.price = motor.price;
            this.deposit = motor.deposit;
            this.fuel = motor.fuel;
            this.year = motor.year;
            this.type = motor.type;
            this.note = motor.note;
            this.URLs = motor.imageUrl;
            this.address = motor.address;
            this.query = motor.address;
            this.lng = motor.location.x;
            this.lat = motor.location.y;
            this.radius = motor.radius;
            this.minAge = motor.minAge;
            this.minDriving = motor.minDriving;
            this.minDurDay = Math.floor(motor.minDur / 86400000);
            this.maxDurDay = Math.floor(motor.maxDur / 86400000);
            this.minDurHour = Math.floor((motor.minDur - this.minDurDay * 86400000) / 3600000);
            this.maxDurHour = Math.floor((motor.maxDur - this.maxDurDay * 86400000) / 3600000);
            this.dI = motor.feature.damageInsurance;
            this.sI = motor.feature.stolenInsurance;
            this.aJ = motor.feature.adjust;
            this.oC = motor.feature.orderCanceling;
            this.fC = motor.feature.fuelCost;
            if (motor.feature.others?.length > 0) {
              this.others = motor.feature.others.join(", ");
            }
            this.index = this.URLs.length + 1;
            console.log(this.index);
            this.mapSetup(this.lat, this.lng, this.radius);
          })
          .catch(err => console.log(err));
      },

      edit() {
        this.editMode = true;
        window.scrollTo(0, 0);
      },
      
      submit(e) {
        e.preventDefault();
        swal({
          icon: "warning",
          text: "Confirm",
          buttons: {
            confirm: {
              text: "OK",
              value: "OK"
            },
            cancel: true,
          },
        }).then(value => {
          if (value == "OK") {
            this.sendUpdate();
          }
        });
      },

      async sendUpdate() {
        await axios.patch(`${this.baseURL}motor/${this.id}`,
        {
          production: this.production,
          model: this.model,
          type: this.type,
          price: this.price,
          deposit: this.deposit,
          license: this.license,
          engineSize: this.engineSize,
          fuel: this.fuel,
          year: this.year,
          note: this.note,
          imageUrl: this.URLs,
          address: this.address,
          radius: this.radius,
          lng: this.lng,
          lat: this.lat,
          minAge: this.minAge,
          minDriving: this.minDriving,
          minDur: this.calDuration(this.minDurDay, this.minDurHour),
          maxDur: this.calDuration(this.maxDurDay, this.maxDurHour),
          feature: {
            damageInsurance: this.dI,
            stolenInsurance: this.sI,
            adjust: this.aJ,
            orderCanceling: this.oC,
            fuelCost: this.fC,
            others: this.others?.split(',')
          }
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(res => {
          swal({
            text: "Your motor has been updated.",
            icon: "success",
            closeOnClickOutside: true
          });
          this.editMode = false;
          this.$emit("fetchData");
        })
        .catch(err => {
          console.log(err);
          swal({
            text: err.message,
            icon: "warning",
            closeOnClickOutside: true
          });
          this.editMode = false;
        });
      },

      async fetchAddress(query) {
        await axios
          .get(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=3`)
          .then((res) => {
            if (query == this.query) {
              this.suggestedAddress = res.data;
            }
          })
          .catch((err) => console.log(err));
      },

      calDuration(day, hour) {
        return (day * 24 + hour) * 3600 * 1000;
      },

      select(event) {
        let index = 0;
        if (event.target.lastChild.value != undefined) {
          index = event.target.lastChild.value;

        } else {
          index = event.target.parentNode.lastChild.value;
        }
        this.query = this.suggestedAddress[index].display_name;
        this.lat = this.suggestedAddress[index].lat;
        this.lng = this.suggestedAddress[index].lon;
        this.address = this.query;
        this.map.flyTo([this.lat, this.lng], 13);
        const popup = L.popup();
        popup
          .setLatLng([this.lat, this.lng])
          .setContent("Your address is here.")
          .openOn(this.map);
        this.suggest = false;
      },

      remove(e) {
        e.preventDefault();
        swal({
          icon: "warning",
          text: "You really want to delete this motorbike?",
          buttons: {
            confirm: {
              text: "OK",
              value: "OK"
            },
            cancel: true,
          },
        }).then(value => {
          if (value == "OK") {
            axios.delete(`${this.baseURL}motor/${this.id}`, {
              headers: {
                token: localStorage.getItem("token")
              }
            })
            .then(() => {
              swal({
                icon: "success",
                text: "Deleted.",
                closeOnClickOutside: true
              })
              this.$emit("fetchData");
              this.$router.push({ name: "MyMotors"});
            })
            .catch(err => console.log(err)); 
          }
        });
      },

      input() {
        this.suggest = true;
        this.fetchAddress(this.query);
      },

      mapSetup(x, y, r) {
        this.map = L.map('map').setView([x, y], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
        this.map.on('dblclick', this.mapDblClick);
        if (r) {
          var circle = L.circle([51.508, -0.11], {
              color: 'red',
              fillColor: '#f03',
              fillOpacity: 0.5,
              radius: r
          }).addTo(this.map);
        } else {
          var marker = L.marker([x, y]).addTo(this.map);
        }
      },

      async mapDblClick(event) {
        const popup = L.popup();
        popup
          .setLatLng(event.latlng)
          .setContent("Your address is here.")
          .openOn(this.map);
        this.lat = event.latlng.lat;
        this.lng = event.latlng.lng;
        await axios
          .get(`https://nominatim.openstreetmap.org/reverse?lat=${this.lat}&lon=${this.lng}&format=jsonv2`)
          .then(res => {
            if (res.data.address.city_district) {
              this.address = res.data.address.city_district;
            } else if (res.data.address.city) {
              this.address = res.data.address.city;
            } else if (res.data.address.country) {
              this.address = res.data.address.country;
            } else {
              this.address = res.data.name;
            }
            this.query = this.address; 
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

      removeImage(index) {
        this.index = this.index - 1;
        this.URLs = this.URLs.filter((val, idx) => idx != index - 1);
      }
    },

    mounted() {
      this.id = this.$route.params.id;
      if (localStorage.getItem("token") == null) {
        this.$router.push({ name: 'Signin'});
        return;
      }
      this.fetchMotor();
      this.animationStab();
    }
}
</script>
<style scoped>
.form-group > label {
  font-size: 18px;
  font-weight: 300;
}

#map {
  height: 300px !important;
  margin: 0 !important;
}

input.map {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}

.input-group {
  margin: 0;
}

.autocomplete-items {
  position: absolute;
  z-index: 99;
  left: 15px;
  right: 15px;
  top: 100%;
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