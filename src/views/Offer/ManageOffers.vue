<template>
<div class="container">
    <div class="row mt-4">
      <div class="col-12">
        <h3 class="text-center">Danh sách xe đã thuê</h3>
      </div>
    </div>
    <div class="row">
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
                  || offer.status == 'BOOKING'">Đang thuê</span>
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
export default {
  
}
</script>