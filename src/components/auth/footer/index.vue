<template>
  <div class="footer-auth">
    <div class="footer pb-50">
      <div class="grid wide footer__content">
        <div class="row-lbr">
          <div class="col-lbr l-2-4 m-4 c-6-lbr">
            <h3 class="footer__heading mt-50">Chăm sóc khách hàng</h3>
            <ul class="footer-list">
              <li class="footer-item">
                <a href="#" class="footer-item__link">Trung tâm trợ giúp</a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-item__link">F8 Shop Mall</a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-item__link">Hướng dẫn mua hàng</a>
              </li>
            </ul>
          </div>
          <div class="col-lbr l-2-4 m-4 c-6-lbr">
            <h3 class="footer__heading mt-50">Giới thiệu</h3>
            <ul class="footer-list">
              <li class="footer-item">
                <a href="#" class="footer-item__link">Giới thiệu</a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-item__link">Tuyển dụng</a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-item__link">Điều khoản</a>
              </li>
            </ul>
          </div>
          <div class="col-lbr l-2-4 m-4 c-6-lbr">
            <h3 class="footer__heading mt-50">Danh mục</h3>
            <ul class="footer-list">
              <li class="footer-item">
                <a href="#" class="footer-item__link">Trang điểm mặt</a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-item__link">Trang điểm mắt</a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-item__link">Trang điểm môi</a>
              </li>
            </ul>
          </div>
          <div class="col-lbr l-2-4 m-4 c-6-lbr">
            <h3 class="footer__heading mt-50">Theo dõi</h3>
            <ul class="footer-list">
              <li class="footer-item">
                <a
                  href="#"
                  class="footer-item__link footer-item__link-facebook"
                >
                  <i class="footer-item__icon fab fa-facebook"></i>
                  Facebook
                </a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-item__link">
                  <i class="footer-item__icon fab fa-instagram-square"></i>
                  Instagram
                </a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-item__link">
                  <i class="footer-item__icon fab fa-linkedin"></i>
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
          <div class="col-lbr l-2-4 m-8 c-12-lbr">
            <h3 class="footer__heading mt-50">Vào cửa hàng trên ứng dụng</h3>
            <div class="footer__download">
              <img
                src="@/assets/img/QR.png"
                alt="Max QR"
                class="footer__download-qr"
              />
              <div class="footer__download-apps">
                <a href="#" class="footer__download-app-link">
                  <img
                    src="@/assets/img/AppStore.png"
                    alt="App Store"
                    class="footer__download-app-img"
                  />
                </a>

                <a href="#" class="footer__download-app-link">
                  <img
                    src="@/assets/img/GooglePlay.png"
                    alt="Google Play"
                    class="footer__download-app-img"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer__bottom mb-50">
        <div class="grid wide">
          <p class="footer__text font-black">© bản quyền thuộc về nhóm 2</p>
        </div>
        <div class="grid wide">
          <p class="footer__text contributors__text font-black">Contributors ( 5 )</p>
          <div class="flex justify-center">
            <div
              v-for="(contributor, index) in contributors"
              :key="index"
              class="user-contributor ml-6"
            >
              <a :href="contributor.linkProfile" target="_blank">
                <img
                  :src="contributor.imageUrl"
                  style="width: 100%"
                  class="image-user-contributor"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// require('@/assets/css/grid.scss')
// require('@/assets/css/component/footer.scss')
export default {
  name: 'FooterAuth',
  data: function () {
    return {
      contributors: [
        {
          imageUrl:
            'https://cdn.discordapp.com/avatars/592714548566294539/27bdbc730a4b6083cd617c08ee0e3b0e.png?size=128',
          name: 'Nguyễn Viết Đại',
          linkProfile: 'https://www.facebook.com/iamdainv/'
        },
        {
          imageUrl:
            'https://cdn.discordapp.com/avatars/867620616604221450/8c88e7b5d990a26f93833cadc25982d2.png?size=128',
          name: 'Nguyễn Vũ Long',
          linkProfile: 'https://www.facebook.com/vu.long.7169'
        },
        {
          imageUrl:
            'https://res.cloudinary.com/social-app-5-01/image/upload/v1631250408/162896340_1150573908717504_2019141208864659053_n_qwqazn.jpg',
          name: 'Vũ Thanh Nhành',
          linkProfile: 'https://www.facebook.com/lnthanhnhan'
        },
        {
          imageUrl:
            'https://res.cloudinary.com/social-app-5-01/image/upload/v1631250555/143086968_2856368904622192_1959732218791162458_n_zo2qbu.png',
          name: 'Phạm Nhật Dương',
          linkProfile: 'https://www.facebook.com/yanggpn'
        },
        {
          imageUrl:
            'https://res.cloudinary.com/social-app-5-01/image/upload/v1631250452/186541713_107701698177251_5505679414618386896_n_ft5qlb.jpg',
          name: 'Nguyễn Cao Thìn',
          linkProfile: 'https://www.facebook.com/profile.php?id=100068122639823'
        }
      ]
    }
  }
}
</script>

<style>
.footer-auth {
  background-color: rgb(245, 245, 245);
}
.footer {
  padding-top: 30px;
}
.contributors__text{
  font-weight: bold;
}
.user-contributor {
  width: 40px;
  height: 40px;
}
.image-user-contributor {
  border-radius: 100%;
}
</style>
