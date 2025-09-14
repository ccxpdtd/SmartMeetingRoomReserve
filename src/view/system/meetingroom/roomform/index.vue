<template>
  <el-dialog :title="title" :visible.sync="localVisible" width="600px" :top="'20px'" custom-class="room-form-dialog"
    class="custom-dialog">
    <el-form :model="form" label-position="left" style="padding: 0 20px;">
      <el-form-item label="会议室名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="楼层" :label-width="formLabelWidth">
        <el-select v-model="form.floor" placeholder="选择楼层">
          <el-option label="一楼" value="1F" />
          <el-option label="二楼" value="2F" />
          <el-option label="三楼" value="3F" />
        </el-select>
      </el-form-item>
      <el-form-item label="容量" :label-width="formLabelWidth">
        <el-input type="number" v-model.number="form.capacity" />
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="form.state">
          <el-option label="空闲" value="空闲" />
          <el-option label="已预约" value="已预约" />
          <el-option label="占用" value="占用" />
        </el-select>
      </el-form-item>
      <el-form-item label="设备配置" :label-width="formLabelWidth">
        <el-input v-model="form.equipment" placeholder="如：投影仪, 白板" />
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.remark" rows="3" />
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="saveForm">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "RoomForm",
  props: {
    title: { type: String, default: "添加会议室" },
    visible: { type: Boolean, default: false },
    formData: { type: Object, default: () => ({}) },
    formLabelWidth: { type: String, default: "100px" }
  },
  data() {
    return {
      form: {},               // 本地表单数据
      localVisible: this.visible // 本地可控弹窗状态
    };
  },
  watch: {
    visible(val) {
      this.localVisible = val; // prop -> 本地
    },
    localVisible(val) {
      if (!val) this.form = { ...this.formData }; // 关闭时重置表单
      this.$emit("update:visible", val); // 通知父组件
    },
    formData: {
      immediate: true,
      handler(val) {
        this.form = { ...val }; // 同步父组件数据到本地表单
      }
    }
  },
  methods: {
    closeDialog() {
      this.localVisible = false; // 修改本地副本，不直接改 prop
    },
    saveForm() {
      this.$emit("save", { ...this.form }); // 将副本发给父组件
      this.closeDialog();
    }
  }
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}

.custom-dialog {
  left: 100px !important;
  /* 调整弹窗左边距 */
}
</style>
