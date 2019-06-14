<template>
  <div class="app-list">
    <a-list
      :grid="{ gutter: 24, lg: 4, md: 3, sm: 1, xs: 1 }"
      :dataSource="dataSource">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card :hoverable="true">
          <img alt="example"  slot="cover" width="100%" :src="item.coverPath"/>
          <a-card-meta>
            <template slot="description">{{item.time}}</template>
          </a-card-meta>
<!--
          <template class="ant-card-actions" slot="actions">
            <a>
              <a-icon type="download"/>
            </a>
            <a>
              <a-icon type="edit"/>
            </a>
            <a>
              <a-icon type="share-alt"/>
            </a>
            <a>
              <a-dropdown>
                <a class="ant-dropdown-link" href="javascript:;">
                  <a-icon type="ellipsis"/>
                </a>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a href="javascript:;">1st menu item</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">2nd menu item</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">3rd menu item</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </a>
          </template>
-->
        </a-card>
      </a-list-item>
    </a-list>

  </div>
</template>

<script>
  import {getVideosByUserId} from '@/api/video'
const dataSource = []
for (let i = 0; i < 11; i++) {
  dataSource.push({
    title: 'Alipay',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    activeUser: 17,
    newUser: 1700
  })
}

export default {
  name: 'Videos',
  components: {},
  props:{
    id:''
  },
  data () {
    return {
      dataSource
    }
  },
  created() {
    getVideosByUserId({id:this.id,pageSize:1000,pageNum:1}).then(res=>{
      this.dataSource = res.data.list
    })
  }
}
</script>

<style lang="less" scoped>

  .app-list {

    .meta-cardInfo {
      zoom: 1;
      margin-top: 16px;

      > div {
        position: relative;
        text-align: left;
        float: left;
        width: 50%;

        p {
          line-height: 32px;
          font-size: 24px;
          margin: 0;

          &:first-child {
            color: rgba(0, 0, 0, .45);
            font-size: 12px;
            line-height: 20px;
            margin-bottom: 4px;
          }
        }

      }
    }
  }

</style>
