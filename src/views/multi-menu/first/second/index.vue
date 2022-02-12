<template>
  <div class="h-full">
    <n-card title="多级菜单 - 二级菜单<组件选择>" class="h-full shadow-sm rounded-16px">
				<n-form inline :label-width="100" ref="formRef">
				<n-grid x-gap="12" :cols="4">
					<n-gi>
						<n-form-item label="请选择组件(name)" width="150" :cols="4">
							<n-select v-model:value="value" v-model:label="label" :options="options"/>
						</n-form-item>
					</n-gi>
				</n-grid>
			</n-form>
				<p style="color:#d20000">path : {{ value || '无' }}</p>
		</n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NCard, NSelect, NForm, NFormItem, NGrid, NGi } from 'naive-ui';
import { viewsSelect } from '@/views';

const options = ref(viewsSelect)
const value = ref(null)
const label = ref(null)
</script>
<style scoped></style>
