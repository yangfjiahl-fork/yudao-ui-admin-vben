<script lang="ts" setup>
import type { GiftSliderItemApi } from '#/api/gift/slideritem';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  createSliderItem,
  getSliderItem,
  updateSliderItem,
} from '#/api/gift/slideritem';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<GiftSliderItemApi.SliderItem>();
let imageSizeRequest = 0;
let imageSizeTask: Promise<void> | undefined;
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', ['轮播图'])
    : $t('ui.actionTitle.create', ['轮播图']);
});

/** 读取上传图片的原始尺寸 */
async function readImageSize(file: File) {
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(file, {
        imageOrientation: 'from-image',
      });
      try {
        return { height: bitmap.height, width: bitmap.width };
      } finally {
        bitmap.close();
      }
    } catch {
      // 部分格式或旧浏览器不支持 ImageBitmap，降级为浏览器图片解码。
    }
  }

  const objectUrl = URL.createObjectURL(file);
  return new Promise<{ height: number; width: number }>((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ height: image.naturalHeight, width: image.naturalWidth });
    });
    image.addEventListener('error', () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('图片尺寸读取失败'));
    });
    image.src = objectUrl;
  });
}

/** 上传图片后自动回填宽高 */
function handleImageFileSelect(file: File) {
  const request = ++imageSizeRequest;
  imageSizeTask = (async () => {
    try {
      const size = await readImageSize(file);
      if (request !== imageSizeRequest) {
        return;
      }
      await formApi.setValues({
        imageHeight: size.height,
        imageWidth: size.width,
      });
    } catch {
      if (request !== imageSizeRequest) {
        return;
      }
      await formApi.setValues({
        imageHeight: undefined,
        imageWidth: undefined,
      });
      message.warning('图片尺寸读取失败，请重新上传图片');
    }
  })();
}

/** 删除图片时同步清空宽高 */
async function handleImageDelete() {
  imageSizeRequest++;
  imageSizeTask = undefined;
  await formApi.setValues({
    imageHeight: undefined,
    imageWidth: undefined,
  });
}

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-2',
    labelWidth: 80,
  },
  layout: 'horizontal',
  schema: useFormSchema({
    onImageDelete: handleImageDelete,
    onImageFileSelect: handleImageFileSelect,
  }),
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    await imageSizeTask;
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    modalApi.lock();
    // 提交表单
    const data = (await formApi.getValues()) as GiftSliderItemApi.SliderItem;
    try {
      await (formData.value?.id
        ? updateSliderItem(data)
        : createSliderItem(data));
      // 关闭并提示
      await modalApi.close();
      emit('success');
      message.success($t('ui.actionMessage.operationSuccess'));
    } finally {
      modalApi.unlock();
    }
  },
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      imageSizeRequest++;
      imageSizeTask = undefined;
      formData.value = undefined;
      return;
    }
    // 加载数据
    const data = modalApi.getData<GiftSliderItemApi.SliderItem>();
    if (!data || !data.id) {
      return;
    }
    modalApi.lock();
    try {
      formData.value = await getSliderItem(data.id);
      // 设置到 values
      await formApi.setValues(formData.value);
    } finally {
      modalApi.unlock();
    }
  },
});
</script>

<template>
  <Modal :title="getTitle">
    <Form class="mx-4" />
  </Modal>
</template>
