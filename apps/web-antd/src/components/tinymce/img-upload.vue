<script lang="ts" setup>
import type {
  RcFile,
  UploadRequestOption,
} from 'ant-design-vue/lib/vc-upload/interface';

import { computed } from 'vue';

import { $t } from '@vben/locales';

import { Button, Upload } from 'ant-design-vue';

import { useUpload } from '#/components/upload/use-upload';

defineOptions({ name: 'TinymceImageUpload' });

const props = defineProps({
  checkDuplicate: {
    default: false,
    type: Boolean,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  fullscreen: {
    default: false,
    type: Boolean,
  }, // 图片上传，是否放到全屏的位置
});

const emit = defineEmits(['uploading', 'done', 'error']);

interface UploadBatch {
  completed: number;
  failed: boolean;
  files: Array<{ uid: string; url?: string }>;
  id: string;
}

interface PendingFile {
  file: RcFile;
  resolve: (value: boolean) => void;
}

const uploadBatches = new Map<string, UploadBatch>();
const fileBatchIds = new Map<string, string>();
const pendingFiles = new Map<string, PendingFile>();
let batchTimer: ReturnType<typeof setTimeout> | undefined;

const getButtonProps = computed(() => {
  const { disabled } = props;
  return {
    disabled,
  };
});

/** 记录同一次选择的图片，维持其原始顺序 */
function beforeUpload(file: RcFile) {
  return new Promise<boolean>((resolve) => {
    pendingFiles.set(file.uid, { file, resolve });
    if (batchTimer) {
      clearTimeout(batchTimer);
    }
    // antd 会逐个调用 beforeUpload，延后一轮确保收集到本次选择的所有文件
    batchTimer = setTimeout(createUploadBatch);
  });
}

function createUploadBatch() {
  const files = [...pendingFiles.values()];
  pendingFiles.clear();
  batchTimer = undefined;
  if (files.length === 0) {
    return;
  }

  const batchId = files.map(({ file }) => file.uid).join('-');
  uploadBatches.set(batchId, {
    completed: 0,
    failed: false,
    files: files.map(({ file }) => ({ uid: file.uid })),
    id: batchId,
  });
  emit('uploading', batchId);
  files.forEach(({ file, resolve }) => {
    fileBatchIds.set(file.uid, batchId);
    resolve(true);
  });
}

async function customRequest(info: UploadRequestOption<any>) {
  const file = info.file as RcFile;
  const batchId = fileBatchIds.get(file.uid);
  if (!batchId) {
    return;
  }
  const { httpRequest } = useUpload(undefined, props.checkDuplicate);
  try {
    const url = await httpRequest(file);
    finishUpload(batchId, file.uid, url);
  } catch {
    finishUpload(batchId, file.uid);
  }
}

/** 完成一个文件后，等待同批次全部上传结束再回显 */
function finishUpload(batchId: string, fileUid: string, url?: string) {
  const batch = uploadBatches.get(batchId);
  if (!batch) {
    return;
  }
  const file = batch.files.find((item) => item.uid === fileUid);
  if (url && file) {
    file.url = url;
  } else {
    batch.failed = true;
  }
  batch.completed++;
  if (batch.completed !== batch.files.length) {
    return;
  }

  const urls = batch.files.flatMap((item) => (item.url ? [item.url] : []));
  if (urls.length > 0) {
    emit('done', batch.id, urls);
  }
  if (batch.failed) {
    emit('error', batch.id);
  }
  batch.files.forEach((item) => fileBatchIds.delete(item.uid));
  uploadBatches.delete(batchId);
}
</script>
<template>
  <div :class="[{ fullscreen }]" class="tinymce-image-upload">
    <Upload
      :show-upload-list="false"
      accept=".jpg,.jpeg,.gif,.png,.webp"
      multiple
      :before-upload="beforeUpload"
      :custom-request="customRequest"
    >
      <Button type="primary" v-bind="{ ...getButtonProps }">
        {{ $t('ui.upload.imgUpload') }}
      </Button>
    </Upload>
  </div>
</template>

<style lang="scss" scoped>
.tinymce-image-upload {
  position: absolute;
  top: 4px;
  right: 10px;
  z-index: 20;

  &.fullscreen {
    position: fixed;
    z-index: 10000;
  }
}
</style>
