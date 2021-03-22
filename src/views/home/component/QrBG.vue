<template>
  <div>
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

    <div style="padding-top: 10px">
      <el-button type="primary" @click="uploadCarousel">上传</el-button>
    </div>

  </div>
</template>

<script>
/*eslint-disable*/
import { uploadCarousel } from '@/api/image'
import { mapGetters } from 'vuex'
  export default {
  data() {
    return {
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
    ...mapGetters(['ULQRBGState']),
    // ...mapState({ imglist: state => state.md.ImageList })
  },
  watch: {
    ULQRBGState: function (val) {
      if (val) {
        this.uploadCarouselSuccess()
      }
    }
  },
  created() {
    // this.getImageList()
  },
  methods: {
    // getImageList() {
    //   const reqt = {
    //     router: "getImgList",   
    //     JsonData:{
    //         currentPage: 1,
    //         pageSize: 10,
    //     }
    //   }
    //   console.log('getImgList ... ', reqt)
    //   this.$pomelo.send(reqt)
    // },
    uploadCarouselSuccess() {
      this.files = [];
      this.$refs.uploadCarousel.clearFiles();
      this.hideUpload = false;
      this.$store.commit('md/setUploadQRBGState', false)
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
                address: 4, // 　1.首页轮播图　2.广告图 3.登录图 4.推广背景图
                enable: 1 //   0.禁用　1.启用    
              }
            }
            // console.log('send uplaod ', reqt)
            this.$store.commit('md/setUploadQRBGState', false)
            this.$pomelo.send(reqt)
          }
        }).catch(err => {
          console.error(err)
        })
        // this.axios
        //   .post(upCarousel, fd, {
        //     headers: {
        //       authorization: this.$store.state.token, //也是在本地中拿到token
        //     },
        //   })
        //   .then((res) => {
        //     console.log("res ", res);
        //     if (res.data.errCode != 1) {
        //       this.$message.success({
        //         message: res.data.msg,
        //       });
        //       this.files = [];
        //       this.$refs.uploadCarousel.clearFiles();
        //       this.hideUpload = false;
        //       this.gettingCarousel();
        //     } else {
        //       this.$message.error({
        //         message: res.data.msg,
        //       });
        //     }
        //   });
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
