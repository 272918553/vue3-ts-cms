import { ref } from 'vue'
import type pageContent from '@/components/page-content/page-content.vue'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof pageContent>>()
  function handleQueryClick(queryInfo: any) {
    contentRef.value?.fetchPageListData(queryInfo)
  }
  function handleResetClick() {
    contentRef.value?.fetchPageListData()
  }

  return {
    contentRef,
    handleResetClick,
    handleQueryClick
  }
}

export default usePageContent
