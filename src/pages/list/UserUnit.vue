<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal" :form="form">
        <div :class="advanced ? null : 'fold'">
          <a-row>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="客户ID"
                :labelCol="{ span: 6 }"
                :wrapperCol="{ span: 15, offset: 0 }"
              >
                <a-input
                  v-decorator="[
                    `客户ID`,
                    {
                      rules: [],
                    },
                  ]"
                  placeholder="请输入"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="借据编号"
                :labelCol="{ span: 7 }"
                :wrapperCol="{ span: 15, offset: 0 }"
              >
                <a-input
                  v-decorator="[
                    `借据编号`,
                    {
                      rules: [],
                    },
                  ]"
                  placeholder="请输入"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="申请日期"
                :labelCol="{ span: 7 }"
                :wrapperCol="{ span: 15, offset: 0 }"
              >
                <a-date-picker
                  style="width: 100%"
                  placeholder="请输入申请日期"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <span style="float: right; margin-top: 3px">
          <a-button type="primary" @click="getGoodList">查询</a-button>
          <a-button style="margin-left: 8px" @click="handleReset"
            >重置</a-button
          >
          <a @click="toggleAdvanced" style="margin-left: 8px">
            {{ advanced ? "收起" : "展开" }}
            <a-icon :type="advanced ? 'up' : 'down'" />
          </a>
        </span>
      </a-form>
    </div>
    <div>
      <a-space class="operator">
        <a-button type="primary" :disabled="checkStatus">入催客户列表</a-button>
        <a-button type="primary" :disabled="checkStatus">出催客户列表</a-button>
      </a-space>
      <standard-table
        :columns="columns"
        :dataSource="dataSource"
        :selectedRows.sync="selectedRows"
        :type="'radio'"
        @clear="onClear"
        @change="onChange"
        @selectedRowChange="onSelectChange"
      >
      </standard-table>
    </div>
  </a-card>
</template>

<script>
import StandardTable from "@/components/table/StandardTable";
import { dataSource as ds } from "@/services";
const columns = [
  {
    title: "单位代码",
    dataIndex: "code",
  },
  {
    title: "催收单位名称",
    dataIndex: "name",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "单位类型",
    dataIndex: "type",
  },
  {
    title: "部门名称",
    dataIndex: "lobName",
  },
  {
    title: "	总客户数",
    dataIndex: "totalCustomers",
  }
];

const dataSource = [];

export default {
  name: "TotalUnitUser",
  components: { StandardTable },
  data() {
    return {
      checkStatus: true,
      advanced: true,
      columns: columns,
      dataSource: dataSource,
      selectedRows: [],
      form: this.$form.createForm(this, { name: "advanced_search" }),
    };
  },
  methods: {
    getGoodList() {
      this.loading = true;
      // const { page, pageSize, conditions } = this;
      // console.log(this);
      ds.allUserUnit(
        JSON.parse(
          JSON.stringify({
            length: 200,
            order: [],
            start: 0,
            searchParams: {
              code: "CU_HQ",
              name: "测试单位",
              type: "headquarter",
            },
          })
        )
      ).then((result) => {
        console.log("111", result);
        const list = result.data.data;
        list.forEach((tem, index) => {
            tem.key = index;
        })
        this.dataSource = list;
        this.page = 1;
        this.total = result.data.recordsFiltered;
        this.pageSize = 200;
        this.loading = false;
      });
    },
    handleReset() {
      this.form.resetFields();
    },
    toggleAdvanced() {
      this.advanced = !this.advanced;
    },
    onClear() {
      this.$message.info("您清空了勾选的所有行");
    },
    onStatusTitleClick() {
      this.$message.info("你点击了状态栏表头");
    },
    onChange() {
      this.$message.info("表格状态改变了");
    },
    onSelectChange() {
      this.checkStatus = false
      // this.$message.info("选中行改变了");
    }
  },
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}
.fold {
  width: calc(100% - 216px);
  display: inline-block;
}
.operator {
  margin-bottom: 18px;
}
@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
