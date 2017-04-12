<template>
  <div id="space-page">
    <section class="none" v-show="false">
      <img src="../assets/images/space.png" alt="">
      <p>还没有发布过场地</p>
    </section>
    <section class="space_list">
        <div class="item">
          <div>
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491990773564&di=45d2062dc1c0010d63f8301b86ee768e&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fgd%2Fpics%2Fhv1%2F101%2F197%2F2195%2F142780211.jpg" alt="">
          </div>
          <div>
            <h5>水晶城购物中心店</h5>
            <h6 class="active">审核中</h6>
            <p>西湖区西溪路225好5幢2楼重创空间一楼实际莲花店胡商店阿斯蒂芬</p>
          </div>
          <div>
            <router-link :to="{}">
              <span>继续发布</span>
            </router-link>
          </div>
        </div>
         <div class="item">
          <div>
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491990773564&di=45d2062dc1c0010d63f8301b86ee768e&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fgd%2Fpics%2Fhv1%2F101%2F197%2F2195%2F142780211.jpg" alt="">
          </div>
          <div>
            <h5>水晶城购物中心店</h5>
            <h6>审核中</h6>
            <p>西湖区西溪路225好5幢2楼重创空间一楼实际莲花店胡商店阿斯蒂芬</p>
          </div>
          <div>
            <router-link :to="{}">
              <span class="active">继续发布</span>
            </router-link>
          </div>
        </div>
    </section>
    <router-link :to="{name: 'spaceType'}">
      <span id="space_add" class="icon"></span>
    </router-link>
    <router-view></router-view>
  </div>
</template>
<script>
  
</script>
<style lang="scss">
  @import '../css/public';
  #space_add{
    display:block;
    width:torem(120px);
    height:torem(120px);
    position:fixed;
    bottom:torem(140px);
    right:torem(22px);
    background:url(../assets/images/icon_serv.png) no-repeat center center / 100% 100%;
  }
</style>
<style lang="scss" scoped>
  @import '../css/public';
  .none{
    text-align:center;
    img{
      margin-top:torem(60px);
      width:torem(330px);
      height:torem(330px);
    }
    p{
      font-size:torem(28px);
      color:rgba(#000,.6);
    }
  }
  .space_list{
    .item{
      margin-bottom:torem(20px);
      background:#fff;
      padding:torem(30px);
      width:100%;
      display:flex;
      justify-content: space-between;
      align-items:center;
      div:nth-of-type(1){
        width:torem(120px);
        height:torem(120px);
        >img{
          width:100%;
          height:100%;
        }
      }
      div:nth-of-type(2){
        width:torem(374px);
        h5{
          font-size:torem(32px);
        }
        h6{
          font-size:torem(24px);
          line-height:torem(28px);
          padding:torem(5px) 0;
          &:active{
            color:$main-color;
          }
        }
        p{
          font-size:torem(22px);
          color:#rgba(#000,.6);
        }
      }
      div:nth-of-type(3){
        width:torem(145px);
        span {
          display:block;
          width:torem(145px);
          height:torem(64px);
          border-radius:torem(6px);
          border:1px solid rgba(#000,.8);
          line-height:torem(64px);
          text-align:center;
          color:rgba(#000,.6);
          &.active{
            color:$main-color;
            border-color:$main-color;
          }
        }
      }
    }
  }
</style>