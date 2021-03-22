<template>
  <div style="position: relative;">
    <el-upload
      action="/as"
      list-type="picture-card"
      ref="uploadCarousel"
      :limit="5"
      :auto-upload="false"
      :on-preview="handlePictureCardPreview"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-upload="handleBefore"
      :class="{ hide: hideUpload }"
      :http-request="handleUpload"
      multiple
    >
      <i class="el-icon-plus"></i>
    </el-upload>

    <div style="position: absolute; left: 200px; top: 105px; z-index: 1000">
      <el-button type="primary" @click="uploadCarousel">上传</el-button>
      <!-- <el-button type="primary" @click="outp">test</el-button> -->
    </div>


    <!-- <div v-for="(l, i) in imglist" :key="i" style="display: flex; flex-direction: row;">
      <span style="line-height: 110px;">{{ i+ 1 }} .</span>
      <img :src="downloadImg(l.imgname)" alt="" style="width: auto; height: 100px; margin: 10px;">
    </div> -->
    <el-table :data="imglist.tableData" border style="width: 100%; margin-top: 20px">
      <el-table-column label="ID" prop="Id" width="100" align="center"></el-table-column>
      <el-table-column label="图片名称" prop="imgname" align="center"></el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <img :src="downloadImg(scope.row.imgname)" alt="" width="100px" height="auto">
        </template>
      </el-table-column>
      <el-table-column prop="enable" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            active-color="#00A854"
            inactive-color="#F04134"
            active-value="启用"
            inactive-value="禁用"
            active-text="启用"
            inactive-text="禁用"
            @change="editImg(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, prev, pager, next, sizes"
      :total="imglist.totalItem"
      style="margin-top: 10px"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />

  </div>
</template>

<script>
/*eslint-disable*/
import { uploadCarousel } from '@/api/image'
import { mapGetters, mapState } from 'vuex'
import defaultSetting from '@/settings'
  export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      dialogImageUrl: "",
      dialogVisible: false,
      hideUpload: false, //图片5张时影藏上传框
      uploadLength: 0,
      uploadLimit: 1,
      limitCount: 1,
      files: [], //多图上传
      tableData: [{ id: "", createDate: "", list: "" }],
    };
  },
  computed: {
    ...mapGetters(['ULState']),
    ...mapState({ imglist: state => state.md.ImgList })
  },
  watch: {
    ULState: function (val) {
      if (val) {
        this.uploadCarouselSuccess()
      }
    }
  },
  created() {
    this.getImageList()
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
      this.getImageList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getImageList()
    },
    // changeSwitch(row) {
    //   console.log('change Switch ', row)
    // },
    downloadImg(imgName) {
      // console.log('send imagname ', imgName)
      let srcImg =
        "http://" +
        defaultSetting.ip +
        ":" +
        4195 +
        "/download?imgName=" + 
        imgName;
        // console.log('src images ', srcImg)
      return srcImg;
    },
    getImageList() {
      const reqt = {
        router: "getImgList",   
        JsonData:{
            address: 1,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
        }
      }
      // console.log('getImgList ... ', reqt)
      this.$pomelo.send(reqt)

      setTimeout(() => {
        // console.log('htioewjt', this.imglist)
      }, 1000)
    },
    editImg(row) {
      const reqt = {
        router: 'editImg',
        JsonData: {
          Id: row.Id,
          enable: row.enable === '禁用' ? 0 : 1,
          imgname: row.imgname
        }
      }
      // console.log('send edit img ', reqt)
      this.$pomelo.send(reqt)
    },
    uploadCarouselSuccess() {
      this.files = [];
      this.$refs.uploadCarousel.clearFiles();
      this.hideUpload = false;
      this.$store.commit('md/setUploadState', false)
    },
    //实现多图同时上传
    handleUpload(raw) {
      this.files.push(raw.file);
    },
    //上传轮播图，多图同时上传，必须选择 5 张
    uploadCarousel() {
      // console.log("uploadCarousel......");
      if (this.uploadLength < 1) {
        this.$message.info({
          message: "请选择图片！",
        });
      } else {
        this.$refs.uploadCarousel.submit();
        let fd = new FormData();
        // fd.append("deptname", "技术部");
        this.files.forEach(function(file) {
          fd.append("file", file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
          //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
        });
        uploadCarousel(fd).then(resp => {
          // console.log('uploadCarousel ... ', resp)
          if (resp.data.code === '0') {
            const reqt = {
              router: 'uploadImg',
              JsonData: {
                imgName: resp.data.data.name, // 　图片名称
                address: 1, // 　1.首页轮播图　2.广告图
                enable: 1 //   0.禁用　1.启用    
              }
            }
            // console.log('send uplaod ', reqt)
            this.$store.commit('md/setUploadState', false)
            this.$pomelo.send(reqt)
          }
        }).catch(err => {
          console.error(err)
        })
      }
    },
    //从后端获取轮播图表
    gettingCarousel() {
      this.axios
        .get(getCarousel, {
          headers: {
            authorization: this.$store.state.token, //也是在本地中拿到token
          },
        })
        .then((resp) => {
          // console.log("get res: ", resp);
          this.tableData = resp.data.list;
          // console.log("this.tableData: ", this.tableData);
        });
    },
    //轮播, el-upload 的函数
    handleRemove(file, fileList) {
      // console.log("Remove: ", file, fileList);
      this.hideUpload = fileList.length == this.limitCount;
      this.uploadLength -= 1;
    },
    handlePictureCardPreview(file) {
      // console.log("Preview>>>>");
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(file, fileList) {
      // console.log("success", file, fileList);
    },
    handleChange(file, fileList) {
      // console.log("change : ", file, fileList, fileList.length, this.limitCount);
      this.uploadLength = fileList.length;
      this.uploadRemain = this.uploadLimit - fileList.length;
      this.hideUpload = fileList.length == this.limitCount;
    },
    handleBefore(file) {
      // console.log("before Upload......");
      const isMatch =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/gif" ||
        file.type === "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isMatch) {
        this.$message.error("图片格式不匹配");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isMatch && isLt2M;
    },
    //表格里的删除键
    handleDelete(index, row) {
      // console.log(index, row);
      const h = this.$createElement;
      this.$msgbox({
        title: "提示！",
        message: h("p", null, [
          h("span", null, `您确定要删除这些图吗？`),
          h("i", { style: "color: #c00000" }, "永久性操作，请慎重操作！"),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          // console.log("11111111");
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            let data = { id: row.id };
            // console.log("data:", data);
            this.axios
              .post(delCarousel, data, {
                headers: {
                  authorization: this.$store.state.token, //也是在本地中拿到token
                },
              })
              .then((resp) => {
                // console.log(resp);
                if (resp.data.errCode == 101) {
                  this.$message.info({
                    message: resp.data.msg,
                  });
                } else if (resp.data.errCode == 0) {
                  instance.confirmButtonLoading = false;
                  this.$message.success({
                    message: resp.data.msg,
                  });
                  this.gettingCarousel();
                }
                done();
                instance.confirmButtonLoading = false;
              })
              .catch((e) => {
                console.log("Error: ", e);
              });
          } else {
            done();
          }
        },
      })
        .then(() => {})
        .catch(() => {
          this.$message.info({
            message: "已取消操作",
          });
        });
    },
  }
  }
</script>

<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
</style>

<style lang="scss" scoped>
</style>
