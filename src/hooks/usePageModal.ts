import { ref } from 'vue'
import type pageModal from '@/components/page-modal/page-modal.vue'

type CallbackFnType = (data?: any) => void

function usePageModal(
  newCallback?: CallbackFnType,
  editCallback?: CallbackFnType
) {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  function handleNewClick() {
    modalRef.value?.setModalVisible()
    if (newCallback) newCallback()
  }
  function handleEditClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)
    if (editCallback) editCallback(itemData)
  }

  return {
    modalRef,
    handleNewClick,
    handleEditClick
  }
}

export default usePageModal
