<template>
    <div v-show="isLoading">
      <div class="col-12 text-center">
        <img :src="LoadingIMG" class="img-fluid"/>
        <h5>……Loading……</h5>
      </div>
    </div>
    <div v-show="!isLoading">
      <table class="table text-center">
        <tbody>
        <tr v-for="{name,value} in serverDetails"  :key="serverDetails.id">
          <td>{{name}}</td>
          <td>{{value}}</td>
        </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
export default {
  name: "MCWaitingUser",
  props: ["MinecraftServerInfo", "isLoading"],
  data() {
    return {
      LoadingIMG:require("../assets/IMG/loading.gif"),
      serverDetails: []
    }
  },
  computed: {
    serverDetails() {
      const tem = []
      tem.push({
        "id":1,"name":"服务器名称","value":this.MinecraftServerInfo.MinecraftDescription
      })
      tem.push({
        "id":2,"name":"玩家","value":this.MinecraftServerInfo.MinecraftPlayer
      })
      tem.push({
        "id":3,"name":"游戏版本","value":this.MinecraftServerInfo.MinecraftTitle
      })
      tem.push({
        "id":4,"name":"Tips","value":this.MinecraftServerInfo.Tips
      })
      return tem
    }
  }
}
</script>

<style scoped>

</style>