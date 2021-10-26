<template>
  <div class="userpage-sidebar">
    <div class="user-photo">
      <div class="rounded-circle">
        <img class="rounded-circle" src="https://cf.shopee.vn/file/f3f241bf2fd5593f85eecbaeec6e0ccc_tn" width="48" height="48" />
      </div>
      <div class="d-flex ml-3 flex-column pt-2">
        <div class="product-comment-user__name fw-600">Nguyễn Viết Đại</div>
        <div class="text-muted"><i class="fas fa-pen"></i>   <router-link :to="{name: 'userInfo'}"> <span>Chỉnh sửa</span></router-link> </div>
      </div>

    </div>
    <div class="userpage-sidebar-menu mt-5 d-flex flex-column">

      <div class="depth-1 mb-3">
        <div class="slide">
          <div class="userpage-icon" style=" background-color: rgb(255, 193, 7);"><svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="shopee-svg-icon user-page-sidebar-icon icon-headshot"><g><circle cx="7.5" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle><path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" stroke-linecap="round" stroke-miterlimit="10"></path></g></svg></div>
          <span class="pl-1 fw-600 ">Tài khoản của tôi</span>
        </div>
        <div class="slideContent" style="padding-left : 31px">
          <router-link :to="{name: 'userInfo'}">Hồ sơ</router-link>
          <br/>
          <router-link :to="{name: 'userAddress'}">Địa chỉ</router-link>
          <br/>
          <router-link :to="{name: 'userPass'}">Thêm Mật Khẩu</router-link>
        </div>
      </div>
      <div class="depth-1 mb-3">
        <div class="slide ">
          <div class="userpage-icon" style="background-color: rgb(68, 181, 255);">
            <svg
              enable-background="new 0 0 15 15"
              viewBox="0 0 15 15"
              x="0"
              y="0"
              class="shopee-svg-icon user-page-sidebar-icon"
              style="fill: rgb(255, 255, 255);"
            >
              <g>
                <rect
                  fill="none"
                  height="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  width="8"
                  x="4.5"
                  y="1.5"
                ></rect>
                <polyline
                  fill="none"
                  points="2.5 1.5 2.5 13.5 12.5 13.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                ></polyline>
                <line
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  x1="6.5"
                  x2="10.5"
                  y1="4"
                  y2="4"
                ></line>
                <line
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  x1="6.5"
                  x2="10.5"
                  y1="6.5"
                  y2="6.5"
                ></line>
                <line
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  x1="6.5"
                  x2="10.5"
                  y1="9"
                  y2="9"
                ></line>
              </g>
            </svg>
          </div>
          <span class="pl-1 fw-600"> <router-link :to="{ name: 'purchase' }">Đơn mua</router-link> </span>
        </div>

      </div>
      <div class="depth-1 mb-3">
        <div class="slide ">
          <div class="userpage-icon" style="background-color: rgb(238, 77, 45);"><svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="shopee-svg-icon user-page-sidebar-icon "><g><path d="m12 10.2 1.5 2h-12l1.5-2v-7.4c0-.5.5-1 1-1h7c .6 0 1 .5 1 1z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></path><path d="m6 2c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5" fill="none" stroke-miterlimit="10"></path><path d="m5.8 13.5c.4.6 1 1 1.8 1s1.4-.4 1.8-1z"></path></g></svg></div>
          <span class="pl-1 fw-600">Thông báo</span>
        </div>
      </div>
      <div class="depth-1 mb-3">
        <div class="slide ">
          <div class="userpage-icon" style="background-color: rgb(255, 119, 97);"><svg height="11" viewBox="0 0 12 11" width="12" class="shopee-svg-icon user-page-sidebar-icon voucher-wallet-icon icon-voucher"><g fill="none" fill-rule="evenodd" transform=""><path d="m1.24401059 7.40822892c-.18616985.27925478-.2855145.60736785-.2855145.94299033v.69678422c0 .33137085.26862915.6.6.6h8.88300781c.3313709 0 .6-.26862915.6-.6v-7.6515625c0-.33137085-.2686291-.6-.6-.6h-8.88300781c-.33137085 0-.6.26862915-.6.6v.69678422c0 .33562248.09934465.66373556.2855145.94299034l.52041449.78062172c.2774581.41618716.42551633.90519026.42551633 1.40538497 0 .50019472-.14805823.98919781-.42551633 1.40538497z" stroke="#fff"></path><path d="m5.64815848 3.46301463h3.69433594v.85253907h-3.69433594zm0 1.53930664h3.69433594v.85253907h-3.69433594zm0 1.53930664h3.69433594v.85253907h-3.69433594zm-2.02308873-3.07861328h.85253907v.85253907h-.85253907zm0 1.53930664h.85253907v.85253907h-.85253907zm0 1.53930664h.85253907v.85253907h-.85253907z" fill="#fff"></path></g></svg></div>
          <span class="pl-1 fw-600">Ví Voucher</span>
        </div>
      </div>
      <div class="depth-1 mb-3">
        <div class="slide ">
          <div class="userpage-icon" style="background-color: rgb(255, 174, 4);"><svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" class="shopee-svg-icon user-page-sidebar-icon "><path d="m7.5 1c3.6 0 6.5 2.9 6.5 6.5s-2.9 6.5-6.5 6.5-6.5-2.9-6.5-6.5 2.9-6.5 6.5-6.5m0-1c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5 7.5-3.4 7.5-7.5-3.4-7.5-7.5-7.5z" stroke="none"></path><path d="m9.7 3.7c-1.2-.8-2.9-1-4-.1-1.2 1-1.1 2.5 0 3.4.8.6 1.7.7 2.6 1.2 1.2.7 1.7 2.2 0 2.7-1.1.3-2.2-.1-3.1-.8-.5-.4-1 .5-.5.9 1.2.8 2.7 1.3 4.1.8 1.2-.4 2-1.7 1.5-2.9-.4-1.1-1.7-1.6-2.7-2-.4-.1-.7-.2-1-.5-1.2-.9-.6-2.4.9-2.4.6 0 1.2.2 1.7.6.5.3 1-.5.5-.9z" stroke="none"></path></svg></div>
          <span class="pl-1 fw-600">Shoppe Xu</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'UserSidebar'
}
</script>

<style>

</style>
