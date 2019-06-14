<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="用户ID/用户名">
              <a-input placeholder="请输入" v-model="queryParam.param"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="状态">
              <a-select placeholder="请选择" default-value="2" v-model="queryParam.state">
                <a-select-option value=2>全部</a-select-option>
                <a-select-option value=0>正常</a-select-option>
                <a-select-option value=1>封号</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="handleSearch">查询</a-button>
              <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-table :columns="columns" :dataSource="data">
      <template  slot="username" slot-scope="text, record">
        <a  @click="handleUserDetail(record.id)" href="#">{{record.username}}</a>
      </template>
      <span slot="state" slot-scope="state">
        <a-button type="primary" v-if="state== 0">正常</a-button>
        <a-button type="danger" v-if="state== 1">封号</a-button>
      </span>
      <span slot="action" slot-scope="text,record">
        <a-button type="primary" @click="handleEdit(record)">动作</a-button>
      </span>
    </a-table>
    <a-pagination  :current="queryParam.pageNum" :showTotal="total => `Total ${total} items`" :showSizeChanger = true @change="handleNumChange" @showSizeChange="onShowSizeChange" :defaultCurrent="1" :total="total"></a-pagination>
    <a-modal
      title="操作"
      style="top: 20px;"
      :width="800"
      v-model="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      :afterClose="handleClose"
    >
      <a-form :autoFormCreate="(form)=>{this.form = form}">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用户id"
          hasFeedback
          validateStatus="success"
        >
          <a-input placeholder="唯一识别码" v-model="record.id" id="no" disabled="disabled" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用户名"
          hasFeedback
          validateStatus="success"
        >
          <a-input placeholder="起一个名字" v-model="record.username" id="role_name" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态"
          hasFeedback
          validateStatus="warning"
        >
          <a-select :defaultValue="record.state" v-model="record.state">
            <a-select-option value="0">正常</a-select-option>
            <a-select-option value="1">封号</a-select-option>
          </a-select>
        </a-form-item>

        <a-divider />
      </a-form>
    </a-modal>

  </a-card>
</template>

<script>
import {  getUsersByParam ,updateUser} from '@/api/user'

export default {
  name: 'TableList',
  components: {
  },
  data () {
    return {
      description: '用户列表以及用户状态信息。',
      data: [],
      record:{
        id:'',
        username:'',
        state: "1"
      },
      total: 100,
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: null,
      mdl: {},

      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        param: '',
        pageSize: 10,
        pageNum: 1,
        state: "2"
      },
      // 表头
      columns: [
        {
          title: '用户id',
          dataIndex: 'id'
        },
        {
          title: '用户名',
          dataIndex: 'username',
          scopedSlots: { customRender: 'username' }
        },
        {
          title: '状态',
          dataIndex: 'state',
          scopedSlots: { customRender: 'state' }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          sorter: true
        }, {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created () {
    getUsersByParam({ param: '', pageSize: 10, pageNum: 1, state: 2 }).then(res => {
      this.data = res.data.list
      this.total = res.data.total
    })
  },
  methods: {
    handleEdit (record) {
      this.record = record
      this.record.state = record.state.toString()
      this.visible = true
    },
    handleSearch () {
      this.queryParam.pageNum = 1

      getUsersByParam(this.queryParam).then(res => {
        this.data = res.data.list
        this.total = res.data.total
      })
    },
    handleOk () {
      updateUser({userId:this.record.id,state:this.record.state}).then(res=>{
        this.visible =false
      })
    },
    handleCancel(){
      getUsersByParam(this.queryParam).then(res => {
        this.data = res.data.list
        this.total = res.data.total
      })
    },
    handleClose(){
      getUsersByParam(this.queryParam).then(res => {
        this.data = res.data.list
        this.total = res.data.total
      })
    },
    onChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    onShowSizeChange (current, pageSize) {
      if (this.queryParam.state === '全部') {
        this.queryParam.state = 2
      }
      this.queryParam.pageNum = current
      this.queryParam.pageSize = pageSize
      getUsersByParam(this.queryParam).then(res => {
        this.data = res.data.list
        this.total = res.data.total
      })
    },
    handleNumChange (current, pageSize) {
      if (this.queryParam.state === '全部') {
        this.queryParam.state = 2
      }
      this.queryParam.pageNum = current
      this.queryParam.pageSize = pageSize
      getUsersByParam(this.queryParam).then(res => {
        this.data = res.data.list
        this.total = res.data.total
      })
    },
    handleReset () {
      this.queryParam.pageNum = 1
      this.queryParam.pageSize = 10
      this.queryParam.param = ''
      this.queryParam.state = '全部'
      getUsersByParam({ param: '', pageSize: 10, pageNum: 1, state: 2 }).then(res => {
        this.data = res.data.list
        this.total = res.data.total
      })
    },
    handleUserDetail(id){
      this.$router.push({ name: 'authorDetail', params: { id: id } })
    }

  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>
