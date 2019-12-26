<template lang="pug">
.layout-column
  el-dialog(
    :title='currentRow.className + "添加收款金额"'
    :visible.sync='setShow'
    width='40%'
    @close="closeDialog"
    :close-on-click-modal="false"
  )
    el-form(:model="newMoney" label-width='120px')
      el-form-item(label="金额：" prop="money")
        el-input(v-model="newMoney.money" type="number" placeholder="请输入要添加的金额")
      el-form-item(label='收款二维码：')
        el-upload.upload-demo(action="" :http-request="uploadUrl" :show-file-list="false")
          el-button(size='small', type='primary') 点击上传
  el-dialog(
    title='添加经费通道'
    :visible.sync='dialogShow'
    width='40%'
    @close="closeDialog"
    :close-on-click-modal="false"
  )
    el-form(:model='news' ref='news', label-width='120px')
      el-form-item(label='支付宝账号：', prop='account')
        el-input(v-model='news.account' placeholder="请填写新加账号")
      el-form-item(label="班级名称：" prop="className")
        el-input(v-model='news.className' placeholder="请填写班级名称")
      el-form-item.right
        el-button(type="primary" size="mini" ) 保存
        el-button(size="mini" @click="closeDialog") 取消
  .funds-header.layout-row__between
    el-button(type="primary" size="mini" @click="dialogShow = true") 添加通道配置
  .funds-body(style="margin-top: 10px;")
    el-table(:data="list")
      el-table-column(label="支付宝账号" width="250" prop="account")
      el-table-column(label="班级" width="250" prop="className")
      el-table-column(label="已添加收款码")
        template(slot-scope='scope')
          .layout-row
            el-tag(
              closable
              style="margin-left: 5px"
              v-for="item in scope.row.hasAdded"
              type="success"
              size="small"
              :key="item.qrcodeUrl"
            ) {{item.money}}
      el-table-column(label="操作" width="250")
        template(slot-scope='scope')
          .layout-row
            el-button(type="primary" size="mini" @click="openSet(scope.row)") 添加配置
            el-button(type="danger" size="mini") 删除
</template>

<script>
export default {
  data () {
    return {
      setShow: false,
      dialogShow: false,
      news: {
        account: '',
        className: ''
      },
      newMoney: {
        money: "",

      },
      currentRow: {
        className: ''
      },
      list: [
        {
          account: '18382327130',
          className: '三年二班',
          hasAdded: [
            {
              money: '300',
              qrcodeUrl: ''
            },
            {
              money: '400',
              qrcodeUrl: ''
            },
            {
              money: '500',
              qrcodeUrl: ''
            },
            {
              money: '600',
              qrcodeUrl: ''
            }
          ]
        }
      ]
    }
  },
  methods: {
    closeDialog () {
      this.news = {
        account: '',
        className: ''
      }
      this.dialogShow = false
      this.setShow = false
    },
    openSet(row) {
      this.setShow = true
      this.currentRow = JSON.parse(JSON.stringify(row))
    },
    //图片上传
    uploadUrl(raw) {
      let _self = this;
      let reader = new FileReader();
      reader.readAsDataURL(raw.file);
      reader.onload = function() {
        qrcode.decode(_self.getObjectURL(raw.file));
        qrcode.callback = function(qrUrl) {
          if (qrUrl === "error decoding QR Code") {
            _self.$message.error("未能识别支付二维码！");
          } else {
            let data = {
              //   money: 0,
              url: reader.result,
              qrUrl
            };
            _self.$set(_self.form, "contentObj", data);
          }
        };
      };
    },
  }
}
</script>
