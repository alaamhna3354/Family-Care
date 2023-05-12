<template>
  <div>
    <div v-if="state.files.length > 0" class="files">
      <div class="file-item" v-for="(file, index) in state.files" :key="index">
        <span>{{ file.name }}</span>
        <span class="delete-file" @click="handleClickDeleteFile(index)">Delete</span>
      </div>
    </div>
    <div v-else class="dropzone" v-bind="getRootProps()">
      <div class="border" :class="{ isDragActive, }" >
        <input v-bind="getInputProps()" />
        <p v-if="isDragActive">Drop the files here ...</p>
        <p v-else>Drag and drop files here, or Click to select files</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useDropzone } from 'vue3-dropzone';
  const { $awn } = useNuxtApp()
  const emit = defineEmits(['fileUploaded'])
  const allowedImages = ref(['png', 'jpg'])
  

  const state = reactive({
    files: [],
  });

  const { getRootProps, getInputProps, isDragActive, ...rest } = useDropzone({
    onDrop,
  });

  watch(state, () => {
    const file = state.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        // this.urls.push({ 'url': reader.result, "name": file.name, "lastModified": file.lastModified });
        emit('fileUploaded', { 'url': reader.result, file: file })
      }
    } else {
      emit('fileUploaded', { 'url': '', file: '' })
    }
  });

  watch(isDragActive, () => {
    console.log('isDragActive', isDragActive.value, rest);
  });

  function onDrop(acceptFiles, rejectReasons) {
    if (acceptFiles.length > 1) {
      $awn.alert('You Can Not Upload More Then One File', { durations: { global: 4000 } });
      return;
    }
    console.log(acceptFiles[0].name.split('.').reverse()[0], acceptFiles.length);
    console.log(rejectReasons);
    // allow to upload image with (png, jpg) extensions only
    if (!allowedImages.value.includes(acceptFiles[0].name.split('.').reverse()[0])) {
        $awn.alert('File Should Be PNG Or JPG Type Only', { durations: { global: 4000 } });
        return;      
      }
      state.files = acceptFiles;
  }

  const handleClickDeleteFile = (index) => {
    state.files.splice(index, 1);
  }
</script>

<style lang="scss" scoped>
.dropzone,
.files {
  width: 100%;
  // max-width: 300px;
  height: 150px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  font-size: 12px;
  line-height: 1.5;
  overflow: auto;
}

.border {
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  transition: all 0.3s ease;
  background: #fff;
  cursor: pointer;

  &.isDragActive {
    border: 2px dashed #ffb300;
    background: rgb(255 167 18 / 20%);
  }
  p { font-size: 15px; }
}

.file-item {
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(255 167 18 / 20%);
  padding: 7px;
  padding-left: 15px;
  margin-top: 10px;
  color: #fff;

  &:first-child {
    margin-top: 0;
  }

  .delete-file {
    background: red;
    color: #fff;
    padding: 5px 10px;
    border-radius: 8px;
    cursor: pointer;
  }
}
</style>
