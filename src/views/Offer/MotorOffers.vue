<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-12">
        <h3 class="text-center">Tất cả yêu cầu</h3>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <ul class="nav">
          <li class="nav-item pb-0">
            <router-link :to="{ name: 'MyOffers', query: { filter: 'upcoming' }}" class="nav-link" id="upcoming" 
              @click="">Đang đặt</router-link>
          </li>
          <li class="nav-item pb-0">
            <router-link :to="{ name: 'MyOffers', query: { filter: 'completed' }}" class="nav-link" id="completed"
              @click="">Đã trả</router-link>
          </li>
          <li class="nav-item pb-0">
            <router-link :to="{ name: 'MyOffers', query: { filter: 'canceled' }}" class="nav-link" id="canceled"
              @click="">Đã hủy</router-link>
          </li>
          <li class="nav-item pb-0">
            <router-link :to="{ name: 'MyOffers', query: { filter: 'all' }}" class="nav-link" id="all"
              @click="">Tất cả</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="row mt-5" v-if="true">
      <div class="col-12">
        <Loader/>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-md-4 my-3" v-for="offer in offers">
        <div class="card w-100">
          <div class="image-container">
            <img
              class="card-img-top"
              :src="offer.vehicle?.imageUrl?.length ? offer.vehicle.imageUrl[0] : 
              'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'"
              alt="Motor Image"
            />
          </div>
          <div class="card-body">
            <div class="details-container clearfix">
              <div class="d-flex align-items-center justify-content-between">
                <router-link :to="{ name: 'OfferDetails', params: { id: offer.id } }"
                  ><h5 class="card-title">{{ offer.vehicle.model }}</h5></router-link>
                <span class="badge badge-success" v-if="!offer.status || offer.status == 'COMPLETED'">Đã xác nhận</span>
                <span class="badge badge-info" v-else-if="offer.status == 'RETURNED'">Đã trả</span>
                <span class="badge badge-primary" v-else-if="offer.endTime >= new Date().getMilliseconds() 
                  || offer.status == 'BOOKING'">Đang đặt</span>
                <span class="badge badge-danger" v-else-if="offer.endTime < new Date().getMilliseconds() 
                  && offer.status != 'RETURNED'">Quá hạn</span>
                <span class="badge badge-warning" v-else-if="offer.status == 'CANCELED'">Đã hủy</span>
              </div>
              <div class="info-container">
                <div class="d-flex align-items-center">
                  <img class="clock" src="../../assets/clock.png" alt="clock">
                  <span class="mr-1"><b>Thời gian bắt đầu: </b></span>
                  <span>{{ new Date(offer.startTime).toLocaleString() }}</span>
                </div>
                <div class="d-flex align-items-center">
                  <img class="clock" src="../../assets/clock.png" alt="clock">
                  <span class="mr-1"><b>Thời gian kết thúc:</b></span>
                  <span>{{ new Date(offer.endTime).toLocaleString() }}</span>
                </div>
                <div class="d-flex align-items-center">
                  <img class="clock" src="../../assets/clock.png" alt="clock">
                  <span class="mr-1"><b>Thời gian đặt: </b></span>
                  <span>{{ new Date(offer.createdDate).toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Loader from '../../components/Atomic/Loader.vue';
  export default {

  }
</script>
