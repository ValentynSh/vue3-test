<template>
  <div class="user-form-wrapper">
    <div class="set-user-form-block">
      <div class="set-user-form-image-block">
        <label for="profile-image" placeholder="Select img">
          <input
            type="file"
            name=" "
            @change="handleChange($event)"
            id="profile-image"
            accept="image/*"
          />
          <div>select image</div>
        </label>
        <img
          v-if="userData.profilePicture?.length"
          :src="userData.profilePicture"
          alt=""
        />
      </div>

      <div class="set-user-form-text-box">
        <label class="user-form-text-label" for="">User name:</label>
        <input
          v-model="userData.username"
          class="user-form-text-input"
          type="text"
        />
      </div>

      <div class="set-user-form-buttons-block">
        <button @click="onSaveForm()" class="set-user-form-btn">Save</button>
        <button @click="onCloseForm()" class="set-user-form-btn">Close</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import type UserModel from "@/types/userModel";

const emit = defineEmits(["on-form-close"]);

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const profileUrl = ref<string>("");
let userData = reactive<UserModel>({
  username: "",
  profilePicture: "",
});

onMounted(() => {
  if (user.value !== null) {
    userData.profilePicture = user.value.profilePicture;
    userData.username = user.value.username;
    console.log("onM", userData);
  }
});

function handleChange($event: Event) {
  const target = $event.target as HTMLInputElement;
  if (target && target.files && target.files?.length > 0) {
    const file = target.files[0];
    profileUrl.value = URL.createObjectURL(file);
    userData.profilePicture = profileUrl.value;
  }
}

function onCloseForm() {
  emit("on-form-close");
}
function onSaveForm() {
  userStore.setUser(userData);
  emit("on-form-close");
}
</script>
<style lang="scss">
.user-form-wrapper {
  position: absolute;
  z-index: 13;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
}

.set-user-form-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgba(255, 255, 255, 0.4);
  background-color: blueviolet;
  padding: 40px 20px;
  border-radius: 20px;
  gap: 20px;
}
.set-user-form-image-block {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  overflow: hidden;
  & img {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  & label {
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    transition: 0.3s;
    & input {
      opacity: 0;
      width: 0px;
    }
    &:hover {
      cursor: pointer;
      color: aqua;
    }
  }
  &:hover {
    & label {
      z-index: 3;
      background-color: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      transition: 0.3s;
    }
  }
}
.user-form-text-label {
  font-size: 14px;
  font-weight: 300;
}
.set-user-form-text-box {
  display: flex;
  flex-direction: column;
}
.set-user-form-buttons-block {
  display: flex;
  gap: 20px;
}

.set-user-form-btn {
  background-color: rgba(226, 43, 98, 1);
  color: rgb(255, 255, 255);
  font-size: 16px;
  appearance: none;
  border: 2px solid rgba(226, 43, 98, 0.4);
  border-radius: 20px;
  padding: 2px 8px;
  &:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.74);
  }
}
.user-form-text-input {
  background-color: #c4b0b05c;
  appearance: none;
  outline: none;
  border: 1px solid #00000038;
  border-radius: 20px;
  padding: 5px 10px;
  color: white;
}
.user-form-text-label {
  font-size: 14px;
  font-weight: 300;
}
.set-user-form-text-box {
  display: flex;
  flex-direction: column;
}
</style>
